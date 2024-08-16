import { test, expect } from '@playwright/test'
import PomManager from '../pages/PomManager'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../Credentials.env') })

let pm
const invalidUsernameErrorMessage = 'Your username is invalid!'
const invalidPasswordErrorMessage = 'Your password is invalid!'
const successfulLogin = 'You logged into a secure area!'
const login = process.env.LOGIN
const password = process.env.PASSWORD
const invalidLogin = process.env.INVALID_USERNAME
const invalidPassword = process.env.INVALID_PASSWORD

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        pm = new PomManager(page)
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })

    test('Login with valid credentials', async ({  }) => {
       
       
        await pm.loginPage.navigate()
        await pm.loginPage.login(login, password)
        await pm.securePage.assertLoggedInMessage(successfulLogin)

        const message = await pm.securePage.getMessage()
        expect(message).toContain(successfulLogin)
    })

    test('Login with non existent user name', async () => {
        

        await pm.loginPage.navigate()
        await pm.loginPage.login(invalidLogin, password)
        await pm.loginPage.assertErrorMessage(invalidUsernameErrorMessage)

    })

    test('Login with valid username but invalid password', async () => {


        await pm.loginPage.navigate()
        await pm.loginPage.login(login, invalidPassword)
        await pm.loginPage.assertErrorMessage(invalidPasswordErrorMessage)
    })
})

test.describe('Checkbox verification', () => {
    test.beforeEach(async ({ page }) => {
        pm = new PomManager(page)
    })

    test.afterEach(async ({ page }) => {
        await page.close()
    })

    test('Check and uncheck checkboxes', async () => {
        await pm.checkboxesPage.navigate()
        await pm.checkboxesPage.checkCheckbox(1)
        await pm.checkboxesPage.assertCheckbox(1, true)

        await pm.checkboxesPage.navigate()
        await pm.checkboxesPage.checkCheckbox(2)
        await pm.checkboxesPage.assertCheckbox(2, false)
    })
})

test.describe('Redirection', () => {
    

    test.beforeEach(async ({ page }) => {
        pm = new PomManager(page)
    })
   

    test('Redirect to another page', async ({ page }) => {
        await pm.redirectPage.navigate()
        await page.click('text=here')
        await expect(page.url()).toBe('https://the-internet.herokuapp.com/status_codes')
    })
})






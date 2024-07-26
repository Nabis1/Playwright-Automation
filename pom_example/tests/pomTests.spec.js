import { test, expect } from '@playwright/test'
import LoginPage from '../pages/LoginPage'

let loginPage;

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
    })

    test('Login with valid credentials', async () =>{
        await loginPage.navigate()
        await loginPage.login('tomsmith', 'SuperSecretPassword!')
        
    })
})
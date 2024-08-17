import { test, expect, chromium } from '@playwright/test'


test.describe('Try to add product from e-shop to shopping cart', () => {

    test('Try to add a table to shopping cart', async ({  }) => {

        const browser = await chromium.launch({ headless: false })  
        const context = await browser.newContext()
        const page = await context.newPage()
        

        await page.goto('https://www.lidl.cz/')

        const acceptCookiesButton = page.locator('#onetrust-accept-btn-handler')
        await acceptCookiesButton.waitFor({ state: 'visible' })
        await acceptCookiesButton.click()

        await page.fill('#s-search-input-field', 'zahradni nabytek')
        await page.click('button[data-id="search-input-button"]')
        await page.click('span.s-advisor__text:text("Stoly")')


        const tableLink = page.locator('a[href*="/p/livarno-home-zahradni-stul-sevilla-140-x-80-cm/p100372236"]')
        await tableLink.nth(0).waitFor({ state: 'visible' })
        await tableLink.nth(0).click()

        await page.click('#addToCart')

        const popupMessage = page.locator('div.pca-alert__body:has-text("Skvělá volba! Výrobek byl přidán do nákupního košíku.")')
        await expect(popupMessage).toBeVisible()

    })
})
test.describe('Try to buy course from ENGETO', () => {

    test('Try to sign up and pay Python Academy course', async ({ }) => {

        const browser = await chromium.launch({ headless: false }) 
        const context = await browser.newContext();
        const page = await context.newPage()

        await page.goto('https://engeto.cz/')
        const acceptCookiesButton = page.locator('#cookiescript_accept')
        await acceptCookiesButton.waitFor({ state: 'visible' })
        await acceptCookiesButton.click()

        const button = page.locator('a.block-button.type-premium.size-l.orange-link.hide-mobile')
        await button.click()

        const detailTermLink = page.locator('a[href="https://engeto.cz/product/detail-terminu-python-akademie-20-11-2024-19-2-2025/"]')
        await detailTermLink.click();

        const joinButton = page.locator('a.block-button.size-l.mobile-size-xl.type-premium:has-text("Přihlas se na termín")')
        await joinButton.click()

        const proceedToCheckoutButton = page.locator('a[href="https://engeto.cz/checkout/"]')
        await proceedToCheckoutButton.click()
     

        const firstNameInput = page.locator('#billing_first_name')
        await firstNameInput.fill('Pavel')

        const lastNameInput = page.locator('#billing_last_name')
        await lastNameInput.fill('Novak')

        const phoneNumberInput = page.locator('#billing_phone')
        await phoneNumberInput.fill('777666555')

        const emailInput = page.locator('#billing_email')
        await emailInput.fill('pavel.novak@gmail.com')

        const addressInput = page.locator('#billing_address_1')
        await addressInput.fill('Hrdinova 1587')

        const cityInput = page.locator('#billing_city')
        await cityInput.fill('Stormwind')

        const postCodeInput = page.locator('#billing_postcode')
        await postCodeInput.fill('737 59')

        const termsCheckpoxInput = page.locator('#terms')
        await termsCheckpoxInput.click()
        
        const placeOrderInput =page.locator('#place_order')
        await placeOrderInput.click()
    })
})
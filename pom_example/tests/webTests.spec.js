import { test, expect, chromium } from '@playwright/test'


test.describe('Try to add product from e-shop to shopping cart', () => {

    async function setup() {
        const browser = await chromium.launch({ headless: false })  
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://www.lidl.cz/')
        return {browser,page,context }
    }

    async function acceptCookies(page) {
        const acceptCookiesButton = page.locator('#onetrust-accept-btn-handler');
        await acceptCookiesButton.waitFor({ state: 'visible' });
        await acceptCookiesButton.click();
    }

    async function searchProduct(page, productName){
        await page.fill('#s-search-input-field', productName)
        await page.click('button[data-id="search-input-button"]')
    }

    async function clickProductLink(page, productLink){
        const link = page.locator(`a[href*="${productLink}"]`)
        await link.nth(0).waitFor({ state: 'visible' })
        await link.nth(0).click()
    }

    async function verifySuccessMessage(page, messageText) {
        const popupMessage = page.locator(`div.pca-alert__body:has-text("${messageText}")`)
        await expect(popupMessage).toBeVisible()
    }

    test('Try to add a table to shopping cart', async ({  }) => {

         const { browser, page } = await setup()

         await page.goto('https://www.lidl.cz/')
        
         await acceptCookies(page)

         await searchProduct(page, 'zahradni nabytek')

         await page.click('span.s-advisor__text:text("Stoly")')

         await clickProductLink(page, '/p/livarno-home-zahradni-stul-sevilla-140-x-80-cm/p100372236')

         await page.click('#addToCart')

         await verifySuccessMessage(page,'Skvělá volba! Výrobek byl přidán do nákupního košíku.' ) 

         await browser.close()
    })
})
test.describe('Try to buy course from ENGETO', () => {

    async function setup() {
        const browser = await chromium.launch({ headless: false })
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://engeto.cz/')
        return { browser, page }
    }

    async function clickButton(page, locator) {
        const button = page.locator(locator)
        await button.waitFor({ state: 'visible' })
        await button.click()
    }

    async function fillInputField(page, locator, value) {
        const input = page.locator(locator)
        await input.fill(value)
    }

    test('Try to sign up and pay for Python Academy course', async () => {
        const { browser, page } = await setup()

        await clickButton(page, '#cookiescript_accept')

        await clickButton(page, 'a.block-button.type-premium.size-l.orange-link.hide-mobile')

        await clickButton(page, 'a[href="https://engeto.cz/product/detail-terminu-python-akademie-20-11-2024-19-2-2025/"]')

        await clickButton(page, 'a.block-button.size-l.mobile-size-xl.type-premium:has-text("Přihlas se na termín")')

        await clickButton(page, 'a[href="https://engeto.cz/checkout/"]')

        await fillInputField(page, '#billing_first_name', 'Pavel')
        await fillInputField(page, '#billing_last_name', 'Novak')
        await fillInputField(page, '#billing_phone', '777666555')
        await fillInputField(page, '#billing_email', 'pavel.novak@gmail.com')
        await fillInputField(page, '#billing_address_1', 'Hrdinova 1587')
        await fillInputField(page, '#billing_city', 'Stormwind')
        await fillInputField(page, '#billing_postcode', '737 59')

        await clickButton(page, '#terms')

        await clickButton(page, '#place_order')

        await browser.close()
    })
})

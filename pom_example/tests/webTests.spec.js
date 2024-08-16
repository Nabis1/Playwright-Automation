import { test, expect, chromium } from '@playwright/test'


test.describe('Try to add product from e-shop to shopping cart', () => {

    test('Try to add a table to shopping cart', async ({  }) => {

        const browser = await chromium.launch({ headless: false });  
        const context = await browser.newContext();
        const page = await context.newPage()
        

        await page.goto('https://www.lidl.cz/')

        const acceptCookiesButton = page.locator('#onetrust-accept-btn-handler');
        await acceptCookiesButton.waitFor({ state: 'visible' });
        await acceptCookiesButton.click();

        await page.fill('#s-search-input-field', 'zahradni nabytek')
        await page.click('button[data-id="search-input-button"]')
        await page.click('span.s-advisor__text:text("Stoly")')


        const tableLink = page.locator('a[href*="/p/livarno-home-zahradni-stul-sevilla-140-x-80-cm/p100372236"]');
        await tableLink.nth(0).waitFor({ state: 'visible' });
        await tableLink.nth(0).click();

        await page.click('#addToCart')

        const popupMessage = page.locator('div.pca-alert__body:has-text("Skvělá volba! Výrobek byl přidán do nákupního košíku.")');
        await expect(popupMessage).toBeVisible();



    })





})
import { test, expect } from "@playwright/test";
import exrates from "../test-data/exratesDailyCNB.json";

test.describe("CNB API verification", () => {

    test("Verify multiple records returned against stored static response", async ({ page }) => {
        const request = page.context().request
        const response = await request.get("https://api.cnb.cz/cnbapi/exrates/daily")

        const responseBody = await response.json()
        expect(response.status()).toBe(200)
        expect(responseBody).toEqual(exrates)
        //console.log(responseBody)
        
    })
})
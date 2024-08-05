import { expect } from "playwright/test";
import CommonActions from "../utils/CommonActions";

export default class SecurePage{
    constructor(page){
        this.page = page
        this.actions = new CommonActions(page)
    }

    async getMessage(){
        return await this.actions.getText('#flash')
    }

    async assertLoggedInMessage(expectedMessage){
        const message = await this.actions.getText('#flash');
        expect(message).toContain(expectedMessage)
    }
    

}
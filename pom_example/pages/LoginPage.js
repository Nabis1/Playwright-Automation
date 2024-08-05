import { expect } from "playwright/test"
import CommonActions from "../utils/CommonActions"

let testLink = ('https://the-internet.herokuapp.com/login')

export default class LoginPage{
    constructor(page){
        this.actions = new CommonActions(page)
        
    }

    async navigate(){
        await this.actions.navigate(testLink)
    }

    async login(username, password){
        await this.actions.fill('input[name="username"]', username)
        await this.actions.fill('input[name="password"]', password)
        await this.actions.click('button[type="submit"]')
    }

    async getErrorMessage(){
        return await this.actions.getText('#flash')
    }

    async assertErrorMessage(exppectedMessage){
        const actualMessage = await this.getErrorMessage()
        expect(actualMessage).toContain(exppectedMessage)
    }

    
}
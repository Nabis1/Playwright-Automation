import CommonActions from "../utils/CommonActions";

let redirectPage = 'https://the-internet.herokuapp.com/redirector'

export default class RedirectPage {
    constructor(page) {
        this.page = page;
        this.actions = new CommonActions(page);
    }

    async navigate() {
        await this.actions.navigate(redirectPage);
    }
}
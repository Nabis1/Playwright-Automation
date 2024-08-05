import LoginPage from "./LoginPage"
import SecurePage from "./SecurePage";
import CheckboxesPage from "./CheckboxesPage";
import RedirectPage from "./RedirectPage";

export default class PomManager {
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page)
        this.securePage = new SecurePage(page)
        this.checkboxesPage = new CheckboxesPage(page)
        this.redirectPage = new RedirectPage(page)
    }
}
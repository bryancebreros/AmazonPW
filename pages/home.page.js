import { expect } from "@playwright/test"
export class HomePage {
    constructor(page){
        this.page = page
        this.signinBtn = '.nav-action-signin-button'
        this.emailInput = '[name="email"]'
        this.emailSubmit = 'input#continue'
        this.passInput = '[name="password"]'
        this.passSubmit = '[id="signInSubmit"]'
        this.nameText = '#nav-link-accountList-nav-line-1'
        this.searchInput = '[id="twotabsearchtextbox"]'
        this.productLink = '.a-size-medium.a-color-base.a-text-normal'
        this.productName = '#productTitle'
        this.addToCartBtn = '#add-to-cart-button'
        this.cartBtn = '#nav-cart'
        this.accountList = '#nav-link-accountList'
        this.signoutBtn = '#nav-item-signout'

        this.carouselItem = 'li.feed-carousel-card > span > a'
        this.shoppingListPopup = '#ewc-content'
        this.addToCartBtn = 'input#add-to-cart-button.a-button-input[name="submit.add-to-cart"][type="submit"]'
        this.imageInList = 'img.sc-product-image'
    }

    async gotoHomePage(){
        await this.page.goto('https://www.amazon.in/')
    }

    async signIn(email, pass){
        await this.page.getByRole('link', { name: 'Sign in', exact: true }).click()
        await this.page.locator(this.emailInput).fill(email)
        await this.page.locator(this.emailSubmit).click()
        await this.page.locator(this.passInput).fill(pass)
        await this.page.locator(this.passSubmit).click()

    }

    async verifySignin(name){
        await expect(this.page.locator(this.nameText)).toContainText(name)
    }

    async search(searchItem){
        await this.page.locator(this.searchInput).type(searchItem)
        await this.page.keyboard.press("Enter")
        
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.locator(this.productLink).nth(0).click()
        ]);
        return newPage

       
    }
    async signout(){
        await this.page.locator(this.accountList).hover()
        await this.page.locator(this.signoutBtn).click()
    }

    async verifySignout(){
        await expect(this.page.locator(this.nameText)).toContainText('Hello, sign in')

    }

    async recommendedProduct(){
        await this.page.mouse.wheel(0,200)
        await this.page.locator(this.carouselItem).nth(0).click() 
        await expect(page).toHaveURL(new RegExp('^https://www.amazon.in/'));
        await this.page.locator(this.addToCartBtn).nth(1).click()
        await expect(this.page.locator(this.shoppingListPopup)).toBeVisible()
        
        await expect(this.page.locator(this.imageInList).nth(0)).toBeVisible()
    }
}
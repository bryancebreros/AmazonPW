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
        this.productLink = '[href="/Nintendo-Switch-OLED-model-Neon/dp/B098TNW7NM/ref=sr_1_1?crid=3H4F99POTI3MM&dib=eyJ2IjoiMSJ9.q8Q6eQ3PpOJ74z7jyWvIFOsKzRSQFZzd4KHSzqYcejNdVuJiTDus4SoZ4CfGYuqhTMR3PioGsf1f4kKMpqbv_oCv0QtfW1gkynHFug3zy9s9Y5XEWvGlQ6vl5NxBzZfnZ6DbrDempNn5zp8W4hBVWzAxoa8DgiizoAjfHVmk0reKxZJkyoDNGuAng20t_F08qfIkZkcBGpccIOpjbDMueEDsnDvF4CUZWvCB4O-prx0.FQgHvbr6SjF3DP59vKTBcLJcWzpx1gOrTABmYRLvh5E&dib_tag=se&keywords=nintendo+switch&qid=1712094327&sprefix=nin%2Caps%2C304&sr=8-1"]'
        this.productName = '#productTitle'
        this.addToCartBtn = '#add-to-cart-button'
        this.cartBtn = '#nav-cart'
        this.accountList = '#nav-link-accountList'
        this.signoutBtn = '#nav-item-signout'

        this.carouselItem = 'li.feed-carousel-card > span > a'
        this.shoppingListPopup = '#ewc-content'
        this.addToCartBtn = 'input#add-to-cart-button.a-button-input[name="submit.add-to-cart"][type="submit"]'

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
        await expect(this.page.locator(this.nameText)).toHaveText(`Hello, ${name}`)
    }

    async search(searchItem){
        await this.page.locator(this.searchInput).type(searchItem)
        await this.page.keyboard.press("Enter")
        
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.getByText('Nintendo Switch OLED model With Neon Red & Neon Blue Joy-Con').click()
        ]);
        return newPage

       
    }
    async signout(){
        await this.page.locator(this.accountList).hover()
        await this.page.locator(this.signoutBtn).click()
    }

    async verifySignout(){
        await expect(this.page.locator(this.nameText)).toHaveText('Hello, sign in')

    }

    async recommendedProduct(){
        await this.page.mouse.wheel(0,200)
        await this.page.locator(this.carouselItem).nth(0).click() 
        await this.page.locator(this.addToCartBtn).nth(1).click()
        await expect(this.page.locator(this.shoppingListPopup)).toBeVisible()
    }
}
import { expect } from "@playwright/test"
export class ProductPage {
    constructor(page ){
        this.page = page
        this.productName = '#productTitle'
        this.addToCartBtn = '[title="Add to Shopping Cart"]'
        this.cartBtn = '#nav-cart'
        this.cartItem = '.a-truncate-cut'
    }

    async addToCart(searchItem){
        
        await expect(this.page.locator(this.productName)).toContainText(searchItem)
        await this.page.locator(this.addToCartBtn).click()
    }
    async gotoCart(productName){
        await this.page.locator(this.cartBtn).click()
        expect(this.page.locator(this.cartItem).nth(0)).toContainText(productName)
    }
}
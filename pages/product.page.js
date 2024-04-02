import { expect } from "@playwright/test"
export class ProductPage {
    constructor(page ){
        this.page = page
        this.productName = '#productTitle'
        this.addToCartBtn = '[title="Add to Shopping Cart"]'
        this.cartBtn = '#nav-cart'
    }

    async addToCart(searchItem){
        
        // await expect(this.page.locator(this.productName)).toContain(searchItem)
        await this.page.locator(this.addToCartBtn).click()
        await this.page.locator(this.cartBtn).click()
    }
}
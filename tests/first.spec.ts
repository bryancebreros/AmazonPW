import { test } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';

//PLEASE ADD YOUR CREDENTIALS
const email = ''
const pass = ''
const name = ''
const searchItem = 'Nintendo Switch'


test('scenario 1', async ({ page })=> {
  const home = new HomePage(page )
  await home.gotoHomePage()
  await home.signIn(email, pass)
  await home.verifySignin(name)
  const newPage = await home.search(searchItem)
  const product = new ProductPage(newPage)
  await product.addToCart(searchItem)
  await product.gotoCart(searchItem)
  await home.signout()
  await home.gotoHomePage()
  await home.verifySignout()
})

test('scenario 2', async ({ page })=> {
  const home = new HomePage(page)
  await home.gotoHomePage()
  await home.signIn(email, pass)
  await home.recommendedProduct()
})
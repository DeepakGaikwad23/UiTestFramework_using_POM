import { existsSync } from 'fs';
import path from 'path';
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SignInPage } from '../pages/sign-in.page';
import { CheckoutPage } from '../pages/checkout.page';
import { ConfirmationPage } from '../pages/confirmation.page';
import { downloadDir } from '../playwright.config';
import testData from '../test-data/testData.json';

test.describe('Checkout', () => {
  test('places an order and downloads the receipt', async ({ page }) => {
    test.setTimeout(60_000);

    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);
    const { username, password } = testData.validUser;
    const productName = testData.checkoutProduct.name;

    await signInPage.goto();
    await signInPage.login(username, password);
    await expect(homePage.logoutLink).toBeVisible();

    await homePage.addProductToCart(productName);
    await expect(homePage.cartProduct(productName)).toBeVisible();
    await homePage.checkoutAction.click();

    await checkoutPage.fillShippingAddress(testData.shippingAddress);
    await checkoutPage.submitOrder();

    await expect(confirmationPage.downloadReceiptLink).toBeVisible();

    const download = await confirmationPage.downloadReceipt();
    const receiptPath = path.join(downloadDir, download.suggestedFilename());
    await download.saveAs(receiptPath);

    expect(existsSync(receiptPath)).toBe(true);
  });
});

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import testData from '../test-data/testData.json';

test.describe('Products', () => {
  test('filters the product list by vendor', async ({ page }) => {
    const homePage = new HomePage(page);
    const { vendor, expectedProductCount, visibleProduct, hiddenProduct } =
      testData.vendorFilter;

    await homePage.goto();
    await homePage.filterByVendor(vendor);

    await expect(homePage.productsFoundText(expectedProductCount)).toBeVisible();
    await expect(homePage.productCards).toHaveCount(expectedProductCount);
    await expect(page.getByText(visibleProduct, { exact: true })).toBeVisible();
    await expect(page.getByText(hiddenProduct, { exact: true })).toHaveCount(0);
  });

  test('adds a product to the cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productName = testData.product.name;

    await homePage.goto();
    await homePage.addProductToCart(productName);

    await expect(homePage.checkoutAction).toBeVisible();
    await expect(homePage.cartProduct(productName)).toBeVisible();
  });
});

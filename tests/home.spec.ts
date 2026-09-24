import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SignInPage } from '../pages/sign-in.page';
import testData from '../test-data/testData.json';

test.describe('Home page', () => {
  test('loads with the expected title, logo, and products', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();

    await expect(page).toHaveTitle(testData.expectedTitle);
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.productsFoundText(25)).toBeVisible();
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test('navigates to the Sign In page from the header', async ({ page }) => {
    const homePage = new HomePage(page);
    const signInPage = new SignInPage(page);

    await homePage.goto();
    await homePage.signInLink.click();

    await expect(page).toHaveURL(/\/signin/);
    await expect(signInPage.usernamePlaceholder).toBeVisible();
    await expect(signInPage.loginButton).toBeVisible();
  });
});

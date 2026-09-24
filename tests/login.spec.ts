import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SignInPage } from '../pages/sign-in.page';
import testData from '../test-data/testData.json';

test.describe('Login', () => {
  test('signs in with a valid demo user', async ({ page }) => {
    const signInPage = new SignInPage(page);
    const homePage = new HomePage(page);
    const { username, password } = testData.validUser;

    await signInPage.goto();
    await signInPage.login(username, password);

    await expect(homePage.loggedInUsername).toHaveText(username);
    await expect(homePage.logoutLink).toBeVisible();
  });
});

import { type Locator, type Page } from '@playwright/test';

export class SignInPage {
  readonly page: Page;
  readonly usernamePlaceholder: Locator;
  readonly passwordPlaceholder: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernamePlaceholder = page.getByText('Select Username');
    this.passwordPlaceholder = page.getByText('Select Password');
    this.loginButton = page.getByRole('button', { name: 'Log In' });
  }

  async goto() {
    await this.page.goto('/signin');
  }

  async login(username: string, password: string) {
    await this.usernamePlaceholder.click();
    await this.page.getByText(username, { exact: true }).click();
    await this.passwordPlaceholder.click();
    await this.page.getByText(password, { exact: true }).click();
    await this.loginButton.click();
  }
}

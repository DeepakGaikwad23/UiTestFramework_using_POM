import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly signInLink: Locator;
  readonly loggedInUsername: Locator;
  readonly logoutLink: Locator;
  readonly productCards: Locator;
  readonly cartPanel: Locator;
  readonly checkoutAction: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByAltText('logo');
    this.signInLink = page.getByRole('link', { name: 'Sign In' });
    this.loggedInUsername = page.locator('.username');
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.productCards = page.locator('.shelf-item');
    this.cartPanel = page.locator('.float-cart');
    this.checkoutAction = page.getByText('Checkout');
  }

  async goto() {
    await this.page.goto('/');
  }

  productsFoundText(count: number) {
    return this.page.getByText(`${count} Product(s) found.`);
  }

  async filterByVendor(vendor: string) {
    await this.page.getByText(vendor, { exact: true }).click();
  }

  async addProductToCart(productName: string) {
    await this.productCards
      .filter({ has: this.page.getByText(productName, { exact: true }) })
      .getByText('Add to cart')
      .click();
  }

  cartProduct(productName: string) {
    return this.cartPanel.getByText(productName, { exact: true });
  }
}

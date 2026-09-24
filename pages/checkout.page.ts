import { type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly stateInput: Locator;
  readonly postalCodeInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel('First Name');
    this.lastNameInput = page.getByLabel('Last Name');
    this.addressInput = page.getByLabel('Address');
    this.stateInput = page.getByLabel('State/Province');
    this.postalCodeInput = page.getByLabel('Postal Code');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async fillShippingAddress(details: {
    firstName: string;
    lastName: string;
    address: string;
    state: string;
    postalCode: string;
  }) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.addressInput.fill(details.address);
    await this.stateInput.fill(details.state);
    await this.postalCodeInput.fill(details.postalCode);
  }

  async submitOrder() {
    await this.submitButton.click();
  }
}

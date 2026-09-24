import { type Download, type Locator, type Page } from '@playwright/test';

export class ConfirmationPage {
  readonly page: Page;
  readonly downloadReceiptLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.downloadReceiptLink = page.getByText('Download order receipt');
  }

  async downloadReceipt(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.downloadReceiptLink.click();
    return downloadPromise;
  }
}

import { Selector } from 'testcafe';

class UrgentPage {
  constructor() {
    this.pageId = '#urgent-sesh';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const urgentPage = new UrgentPage();

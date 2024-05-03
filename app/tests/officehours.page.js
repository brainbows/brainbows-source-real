import { Selector } from 'testcafe';

class OfficeHoursPage {
  constructor() {
    this.pageId = '#office-hours';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const officeHoursPage = new OfficeHoursPage();

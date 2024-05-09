import { Selector } from 'testcafe';

class GoalsPage {
  constructor() {
    this.pageId = '#goals';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const goalsPage = new GoalsPage();

import { Selector } from 'testcafe';

class AddGoalsPage {
  constructor() {
    this.pageId = '#add-goals';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const addGoalsPage = new AddGoalsPage();

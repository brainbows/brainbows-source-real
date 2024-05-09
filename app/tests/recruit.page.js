import { Selector } from 'testcafe';

class RecruitPage {
  constructor() {
    this.pageId = '#recruit';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const recruitPage = new RecruitPage();

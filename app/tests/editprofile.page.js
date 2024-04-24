import { Selector } from 'testcafe';

class EditProfilePage {
  constructor() {
    this.pageId = '#edit-user-home';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const editProfilePage = new EditProfilePage();

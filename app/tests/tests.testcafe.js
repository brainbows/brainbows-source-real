import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { userHomePage } from './userhome.page';
import { leaderboardPage } from './leaderboard.page';
import { calendarPage } from './calendar.page';
import { officeHoursPage } from './officehours.page';
import { editProfilePage } from './editprofile.page';
import { matchPage } from './match.page';
import { notifPage } from './notification.page';
import { urgentPage } from './urgent.page';
import { recruitPage } from './recruit.page';
import { goalsPage } from './goals.page';
import { addGoalsPage } from './addgoals.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'john@foo.com', password: 'changeme' };

fixture('meteor-application-template-react localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that the user home page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserHomePage(testController);
  await userHomePage.isDisplayed(testController);
});
test('Test that the edit page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditProfilePage(testController);
  await editProfilePage.isDisplayed(testController);
});

test('Test that the match page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMatchPage(testController);
  await matchPage.isDisplayed(testController);
});

test('Test that the notification page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoNotificationPage(testController);
  await notifPage.isDisplayed(testController);
});

test('Test that the urgent sesh page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMatchPage(testController);
  await matchPage.gotoUrgentSeshPage(testController);
  await urgentPage.isDisplayed(testController);
});

test('Test that the recruit page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoMatchPage(testController);
  await matchPage.gotoRecruitPage(testController);
  await recruitPage.isDisplayed(testController);
});

test('Test that the calendar page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoCalendarPage(testController);
  await calendarPage.isDisplayed(testController);
});

test('Test that the office hours page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoOfficeHoursPage(testController);
  await officeHoursPage.isDisplayed(testController);
});

test('Test that the leaderboard page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoLeaderboardPage(testController);
  await leaderboardPage.isDisplayed(testController);
});

test('Test that the goals page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserHomePage(testController);
  await goalsPage.isDisplayed(testController);
});

test('Test that the add goals page shows up', async (testController) => {
  await navBar.gotoSignInPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoUserHomePage(testController);
  await addGoalsPage.isDisplayed(testController);
});

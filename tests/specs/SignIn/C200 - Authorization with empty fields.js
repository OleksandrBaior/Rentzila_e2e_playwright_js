import { test, expect } from '@playwright/test';
import { LoginPage, emptyFieldError } from '../../pages/loginPage';
import { BasePage } from '../../pages/basePage';
import { HeaderPage } from '../../pages/headerPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';


  test('C200 - Authorization with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);
    const headerPage = new HeaderPage(page);

    await basePage.navigateBaseURL();
    await headerPage.loginBtn.click();
    await expect(loginPage.authorizationPopUp).toBeVisible();
    await loginPage.expectErrorVisible(false, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.expectErrorVisible(false, loginPage.errorPasswordMsg, emptyFieldError);
    await loginPage.signInBtn.click();
    await loginPage.expectErrorVisible(true, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.expectErrorVisible(true, loginPage.errorPasswordMsg, emptyFieldError);
    await loginPage.emailOrPhoneField.fill(usersProfiles.validUser.email);
    await loginPage.signInBtn.click();
    await loginPage.expectErrorVisible(false, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.expectErrorVisible(true, loginPage.errorPasswordMsg, emptyFieldError);
    await loginPage.emailOrPhoneField.clear()
    await loginPage.expectErrorVisible(true, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.passwordField.fill(usersProfiles.validUser.password);
    await loginPage.expectErrorVisible(true, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.expectErrorVisible(false, loginPage.errorPasswordMsg, emptyFieldError);
  });

 

  
  
  


import { test } from '@playwright/test';
import { LoginPage, emptyFieldError } from '../../pages/loginPage';
import usersProfiles from '../../../resourcers/usersProfiles.json';

test('C200 - Authorization with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateLoginPopUp();
    await loginPage.expectErrorVisible(false, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.expectErrorVisible(false, loginPage.errorPasswordMsg, emptyFieldError);
    await loginPage.signInBtn.click();
    await loginPage.expectErrorVisible(true, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.expectErrorVisible(true, loginPage.errorPasswordMsg, emptyFieldError);
    await loginPage.inputValue(loginPage.emailOrPhoneField, usersProfiles.validUser.email);
    await loginPage.signInBtn.click();
    await loginPage.expectErrorVisible(false, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.expectErrorVisible(true, loginPage.errorPasswordMsg, emptyFieldError);
    await loginPage.emailOrPhoneField.clear()
    await loginPage.expectErrorVisible(true, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.inputValue(loginPage.passwordField, usersProfiles.validUser.password);
    await loginPage.expectErrorVisible(true, loginPage.errorEmailMsg, emptyFieldError);
    await loginPage.expectErrorVisible(false, loginPage.errorPasswordMsg, emptyFieldError);
});

 

  
  
  


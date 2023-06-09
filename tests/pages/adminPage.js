
export const adminURL = 'https://letkabackend.click/admin/';

export class AdminPage  {
  
    /**
    * @param {import('@playwright/test').Page} page
    */
     
     constructor(page) {
         this.page = page;
         this.adminPanel = page.locator('[class*= "AdminPanel_tabs_wrapper"]');
         this.users = page.locator('[href="/admin/users/"]');
         this.userTitle = page.locator('[class*="AdminLayout_title"]');
         this.searchUserField = page.getByTestId('input');
         this.firstRowUsersTable = page.locator('//table/tbody/tr/td[1]')
     }
     
    
 };

export class MapPage  {
  
    /**
    * @param {import('@playwright/test').Page} page
    */
     
     constructor(page) {
         this.page = page;

         /* The Map page */
         this.secectedFilter = page.locator('[checked] + label');
         this.firstUnit = page.locator('[data-testid="detailContainer"]').first();
     }
 };
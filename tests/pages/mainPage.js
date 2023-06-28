import { expect } from '@playwright/test';

export const serviceTabs = ['Популярні', 'Сільськогосподарські', 'Будівельні', 'Інші'];
export const servicesPopular = ['Комплекс робіт', 'Навантаження та розвантаження', 'Асфальтування', 'Орання землі', 'Дорожні роботи', 'Підйомні роботи', 'Перевезення матеріалів']
export const servicesAgricultural = ['Орання землі', 'Культивація', 'Посів технічних та зернових культур', 'Внесення добрив', 'Зберігання урожаю', 'Фрезеровка землі', 'Дискування землі']
export const serviceStructural = ['Комплекс робіт', 'Навантаження та розвантаження', 'Асфальтування', 'Дорожні роботи', 'Рихлення ґрунту','Монтажні роботи','Планування та розчищення території під будівельний майданчик'] 
export const servicesOther = ['Підйомні роботи', 'Перевезення матеріалів', 'Зберігальні ангари','Навантаження матеріалів','Асенізаторські послуги','Перевезення техніки','Послуги перевезення робітників']

export class MainPage  {
  
    /**
    * @param {import('@playwright/test').Page} page
    */
     
     constructor(page) {
         this.page = page;
         /* The "Послуги" section */
         this.servicesSection = page.locator("//*[contains(text(), 'Послуги')]");
         this.servicesCategories = page.locator('[class*="RentzilaProposes_categories_list"] div');
         this.services = page.locator('//section[1]/div[2]/div');   
     }

    async checkServiceTabColor(serviceTab) {
        if (serviceTab >= 1) {
            await expect(this.servicesCategories.nth(serviceTab-1)).not.toHaveCSS('background', RegExp(/rgb\(40, 49, 73\)/));
            await expect(this.servicesCategories.nth(serviceTab)).toHaveCSS('background', RegExp(/rgb\(40, 49, 73\)/));
        } else {
            await expect(this.servicesCategories.nth(serviceTab)).toHaveCSS('background', RegExp(/rgb\(40, 49, 73\)/));
        }
  }
 
  
 };
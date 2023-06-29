import { expect } from '@playwright/test';

export const popularServices = ['Комплекс робіт', 'Навантаження та розвантаження', 'Асфальтування', 'Орання землі', 'Дорожні роботи', 'Підйомні роботи', 'Перевезення матеріалів']
export const agriculturalServices = ['Орання землі', 'Культивація', 'Посів технічних та зернових культур', 'Внесення добрив', 'Зберігання урожаю', 'Фрезеровка землі', 'Дискування землі']
export const structuralService = ['Комплекс робіт', 'Навантаження та розвантаження', 'Асфальтування', 'Дорожні роботи', 'Рихлення ґрунту', 'Монтажні роботи', 'Планування та розчищення території під будівельний майданчик']
export const otherServices = ['Підйомні роботи', 'Перевезення матеріалів', 'Зберігальні ангари', 'Навантаження матеріалів', 'Асенізаторські послуги', 'Перевезення техніки', 'Послуги перевезення робітників']

export class MainPage {

    /**
    * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page;
        /* The "Послуги" section */
        this.servicesSection = page.locator("//h2[contains(text(), 'Послуги')]");
        this.services = page.locator('//section[1]/div[2]/div');
        this.popularServicesTab = page.getByText('Популярні');
        this.agricultureServiceTab = page.getByText('Сільськогосподарські');
        this.constructionServiceTab = page.getByText('Будівельні');
        this.otherServiceTab = page.getByText('Інші');
    }

    async checkServiceTabColor(previousTab, serviceTab) {
        if (previousTab != null) {
            await expect(previousTab).not.toHaveCSS('background', RegExp(/rgb\(40, 49, 73\)/));
            await expect(serviceTab).toHaveCSS('background', RegExp(/rgb\(40, 49, 73\)/));
        } else {
            await expect(serviceTab).toHaveCSS('background', RegExp(/rgb\(40, 49, 73\)/));
        }
    }


};
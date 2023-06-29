import { expect } from '@playwright/test';

export class UnitPage {

    /**
    * @param {import('@playwright/test').Page} page
    */

    constructor(page) {
        this.page = page;

    }

    async checkRelevantServicePresent(services, service) {
        await expect(this.page.locator(`//div[contains(@class, 'UnitCharacteristics_service')][contains(text(), '${services[service]}')]`)).toBeVisible()
    }

};
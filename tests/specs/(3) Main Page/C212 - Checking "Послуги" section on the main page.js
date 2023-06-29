import { expect, test } from '@playwright/test';
import { MainPage, popularServices, agriculturalServices, structuralService, otherServices } from '../../pages/mainPage'
import { BasePage } from '../../pages/basePage';
import { HeaderPage } from '../../pages/headerPage';
import { MapPage } from '../../pages/mapPage';
import { UnitPage } from '../../pages/unitPage';

test('C212 - Checking "Послуги" section on the main page ', async ({ page }) => {
    test.setTimeout(120000);
    const mainPage = new MainPage(page);
    const basePage = new BasePage(page);
    const headerPage = new HeaderPage(page);
    const mapPage = new MapPage(page);
    const unitPage = new UnitPage(page)
    await basePage.navigateBaseURL();

    async function checkServices(previousTab, serviceTab, services) {
        for (const service in services) {
            await mainPage.servicesSection.scrollIntoViewIfNeeded();
            await expect(mainPage.servicesSection).toBeVisible();

            await serviceTab.click();
            await expect(mainPage.services.nth(service)).toHaveText(services[service]);
            await mainPage.checkServiceTabColor(previousTab, serviceTab);
            await expect(mainPage.services.nth(service)).toHaveText(services[service]);

            await mainPage.services.nth(service).click();
            await page.waitForTimeout(200);
            await expect(mapPage.secectedFilter).toHaveText(RegExp(`${services[service]}`));

            await mapPage.firstUnit.click();
            await unitPage.checkRelevantServicePresent(services, service);
            
            await headerPage.logo.click();
            await expect(mainPage.servicesSection).toBeVisible();
        }
    }

    await checkServices(null, mainPage.popularServicesTab, popularServices);
    await checkServices(mainPage.popularServicesTab, mainPage.agricultureServiceTab, agriculturalServices);
    await checkServices(mainPage.agricultureServiceTab, mainPage.constructionServiceTab, structuralService);
    await checkServices(mainPage.constructionServiceTab, mainPage.otherServiceTab, otherServices);

});
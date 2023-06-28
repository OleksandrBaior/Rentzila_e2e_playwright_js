import { expect, test } from '@playwright/test';
import { MainPage, serviceTabs, servicesPopular, servicesAgricultural, serviceStructural, servicesOther} from '../../pages/mainPage'
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

    async function checkServices(serviceTab, services) {
        for (const service in services) {
            await mainPage.servicesSection.scrollIntoViewIfNeeded();
            await expect(mainPage.servicesSection).toBeVisible();

            await mainPage.servicesCategories.nth(serviceTab).click();
            await expect(mainPage.servicesCategories.nth(serviceTab)).toHaveText(serviceTabs[serviceTab]);
            await mainPage.checkServiceTabColor(serviceTab)
            await expect(mainPage.services.nth(service)).toHaveText(services[service]);
            
            await mainPage.services.nth(service).click();
            await expect(mapPage.secectedFilter).toHaveText(RegExp(`${services[service]}`));
            await page.waitForLoadState('networkidle');
           
            await mapPage.firstUnit.click(); 
            await unitPage.checkRelevantServicePresent(services, service)
           
            await headerPage.logo.click();
            await expect(mainPage.servicesSection).toBeVisible();
        }
    }

    for (const serviceTab of serviceTabs) {
        if (serviceTab == 'Популярні') {
            await checkServices(0, servicesPopular)
        }    
        if (serviceTab == 'Сільськогосподарські') {
            await checkServices(1, servicesAgricultural)
        }   
        if (serviceTab == 'Будівельні') {
            await checkServices(2, serviceStructural)
        }   
        if (serviceTab == 'Інші') {
            await checkServices(3, servicesOther)
        }
    }  
});
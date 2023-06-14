const axios = require('axios');
import { expect } from '@playwright/test';
import usersProfiles from '../../resourcers/usersProfiles.json';


export const adminURL = 'https://letkabackend.click/admin/';

export class AdminPage {
  
    /**
    * @param {import('@playwright/test').Page} page
    */
     
    constructor(page) {
        this.page = page;
        this.adminPanel = page.locator('[class*= "AdminPanel_tabs_wrapper"]');
        this.users = page.locator('[href="/admin/users/"]');
        this.userTitle = page.locator('[class*="AdminLayout_title"]');
        this.searchUserField = page.getByTestId('input');
        this.userEmailTable = page.locator('//table/tbody/tr/td[1]');
        this.userID = page.locator('#enhanced-table-checkbox-0');
        this.tableBody = page.locator('//*[@id="__next"]/div/div[2]/div[2]/div[2]/table/tbody')
    }
    
    async getAdminToken() {
        let bearerToken = null;
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://letkabackend.click/api/auth/jwt/create/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "email": usersProfiles.adminAccount.email,
                "password": usersProfiles.adminAccount.password
            })
        };
          
        await axios.request(config)
            .then(async (response) => {
                bearerToken = response.data.access;
            }
            )
            .catch((error) => {
                console.log(error);
            });
        return bearerToken;
    }

    async deleteUser(idUser) {
        const bearerToken = await this.getAdminToken();
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `https://letkabackend.click/api/crm/profiles/${idUser}/`,
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        };
        await axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async checkUserExist(boolean, email) {
        await this.searchUserField.fill(email);
        await this.page.waitForResponse(`https://letkabackend.click/api/crm/profiles/?page=1&size=10&id=asc&search=${email}&role=default`)
        .then(async response => {
            const data = await response.json();
            expect(data.count).toBe( boolean ? 1 : 0 );
        })
        if (boolean) {
            await expect(this.userEmailTable).toHaveText(email);
        }
        else {
            await expect(this.userEmailTable).not.toBeVisible();
        }
    }

    
}
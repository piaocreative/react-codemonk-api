const hs = require('@hubspot/api-client');
const hsClient = new hs.Client({ accessToken: process.env.HUBSPOT_KEY });

class Hubspot {

    static _prepareUserDetails (userDetails, autoAdd = {}) {
        const userProperties = autoAdd;

        if (!userDetails.email && userDetails.authority.email)
            userProperties.email = userDetails.authority.email;
        else
            userProperties.email = userDetails.email;
        if (userDetails.billing && userDetails.billing.companyDetails.name)
            userProperties.company = userDetails.billing.companyDetails.name;

        return userProperties;
    }

    static async createContact (userDetails, extraData = {}) {
        const contactObj = { properties: this._prepareUserDetails(userDetails, extraData) };

        try {
            return await hsClient.crm.contacts.basicApi.create(contactObj);
        } catch (e) {
            CONSOLE_LOGGER.info(e.message, 502);
            return e;
        }
    }

    static async updateContact (userDetails, extraData = {}) {
        const contactObj = { properties: this._prepareUserDetails(userDetails, extraData) };
        const clientHSId = await Hubspot.getIdByEmail(contactObj.properties.email);

        if (!clientHSId) return false;

        try {
            return await hsClient.crm.contacts.basicApi.update(clientHSId, contactObj);
        } catch (e) {
            CONSOLE_LOGGER.info(e.message, 502);
            return e.message;
        }
    }

    static async getIdByEmail (email) {
        const PublicObjectSearchRequest = {
            filterGroups: [{
                'filters': [{
                    'value': email,
                    'propertyName': 'email',
                    'operator': 'EQ'
                }]
            }], sorts: ['email'], properties: ['email', 'company'], limit: 2, after: 0
        };
        const allContacts = await hsClient.crm.contacts.searchApi.doSearch(PublicObjectSearchRequest);
        if (allContacts.results.length) {
            return allContacts.results[0].id;
        }
        return false;
    }
}

module.exports = Hubspot;

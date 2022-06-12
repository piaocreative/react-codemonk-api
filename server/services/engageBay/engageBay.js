const got = require('got');
const CONSTANTS = require('../../util/constants');
const utils = require('../../util/utilFunctions');

class EngageBay {
    static async getEngageBayContact (email) {
        const { body } = await got.get(`${CONSTANTS.ENGAGEBAY.GET_CONTACT_URL}?q=${email}&type=Subscriber`, {
            headers: {
                Authorization: process.env.ENGAGEBAY_KEY,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        });

        return body;
    }

    static async createEngageBayContact (user, tags) {

        const contact = {
            score: 10,
            properties: utils.getEngageBayContactProproperties(user),
            tags
        };

        await got.post(CONSTANTS.ENGAGEBAY.CONTACT_URL, {
            json: contact,
            headers: {
                Authorization: process.env.ENGAGEBAY_KEY,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        });
    }

    static async updateEngageBayContactTags (email, tags, properties) {
        const contact = await EngageBay.getEngageBayContact(email);
        if (contact && contact.length) {
            const id = contact[0].id;
            const systemTags = ['agency', 'talent', 'client', 'active', 'incomplete'];
            await EngageBay.deleteContactTags(id, contact[0].tags, systemTags);
            const updateContact = {
                id,
                tags
            };

            if (properties && properties.length) {
                updateContact.properties = properties;
            }

            await got.put(CONSTANTS.ENGAGEBAY.UPDATE_CONTACT_URL, {
                json: updateContact,
                headers: {
                    Authorization: process.env.ENGAGEBAY_KEY,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                responseType: 'json'
            });
        }
    }

    static async deleteContactTags (id, tags, systemTags) {
        const newTags = tags.filter(t => {
            return (systemTags.indexOf(t.tag) >= 0);
        });

        if (newTags.length) {
            await got.post(`${CONSTANTS.ENGAGEBAY.DELETE_CONTACT_TAG_URL}${id}`, {
                json: newTags,
                headers: {
                    Authorization: process.env.ENGAGEBAY_KEY,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                responseType: 'json'
            });
        }
    }
}

module.exports = EngageBay;

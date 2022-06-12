const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: env + '.env' });
global.CONSOLE_LOGGER = require('../../../util/logger');
global.MOMENT = require('moment');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const HubSpot = require('../hubSpot');

const client = { email: 'cilentcompany@yopmail.com' };

describe('Report Client actions', () => {
    try {
        it('Should be able to get existing client', async () => {
            const res = await HubSpot.getIdByEmail(client.email, {
                referred: false,
            });
            assert.notEqual(false);
            expect(res).to.be.eq('717651');
        })

        it('Should be able to determine contact already exists during create contact', async () => {
            const res = await HubSpot.createContact(client, { 'platform_status': 'Signed-Up' });
            expect(res.body.message).to.contain('Contact already exists');
            assert.equal(res.code, 0);
        });

        it('Should be able to send client posted, searched, interviewed and hired actions', async () => {
            const res = await HubSpot.updateContact(client, {
                posted: true,
                latest_job_brief_posted: 'Title and content',
                searched: true,
                last_search: 'Java',
                interviewed: true,
                hired: true
            });
            expect(res.properties).not.to.be.empty;
            assert.equal(res.properties.posted, 'true');
        });
    } catch (e) {
        CONSOLE_LOGGER.error(e);
    }
});

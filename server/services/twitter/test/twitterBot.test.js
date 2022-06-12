const chai = require('chai');
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');
const request = require('supertest');
const expect = chai.expect;
const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: env + '.env' });
global.CONSOLE_LOGGER = require('../../../util/logger');
chai.use(chaiHttp);

describe('Verify Twitter Client Authentication', () => {
    try {
        it('Authenticated twitter client should return CodeMonk twitter username', async () => {
            const verification = await request(process.env.BASE_URL)
                .get('/twitter/testAuth');
            expect(verification.body.data.username).to.exist;
            expect(verification.body.data.username).to.eq('CodeMonk_Tweets');
        });
    } catch (e) {
        CONSOLE_LOGGER.error(e);
    }
});

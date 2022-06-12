const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
describe('Website get feature jobs', () => {
    try {
        it('As a website, I can get feature jobs', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/job-post/feature');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


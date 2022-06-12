const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
describe('Website get feature talents', () => {
    try {
        it('As a website, I can get feature talents', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/feature');
            expect(res.body.status).to.be.status;
            expect(res.body.data.docs.length).to.be.lte(27);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


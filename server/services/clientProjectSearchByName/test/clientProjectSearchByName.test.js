const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// Client User
const clientUser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(clientUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Client get project list based on name search', () => {
    try {
        it('As a client, I can get project list based on query search params', async () => {
            const query = {
            };
            const res = await request(process.env.BASE_URL)
                .get('/client/project/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I can get project list based on query params', async () => {
            const query = {
                talentId: '5f083c352a7908662c334532',
                q: 'codemonk'
            };
            const res = await request(process.env.BASE_URL)
                .get('/client/project/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


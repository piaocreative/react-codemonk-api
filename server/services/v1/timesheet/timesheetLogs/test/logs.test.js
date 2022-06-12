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
// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const requestPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Admin get timesheet log list', () => {
    try {
        it('As a admin, I can get timesheet log', async () => {
            const query = {
                page: 1,
                limit: 20
            };
            const res = await request(process.env.BASE_URL)
                .get('/timesheet/62176b7c13f1e04658f81b97/logs')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


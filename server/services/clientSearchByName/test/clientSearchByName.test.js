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
describe('Admin get client list search by name', () => {
    it('As a admin, I can get clients list based on query params with search parameter', async () => {
        const query = {
            q: 'client'
        };
        const res = await request(process.env.BASE_URL)
            .get('/client/by-name')
            .set({ Authorization: requestPayload.token })
            .query(query);
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });
    it('As a admin, I can get clients list based on query params company name', async () => {
        const query = {
            companyName: 'Soft'
        };
        const res = await request(process.env.BASE_URL)
            .get('/client/by-name')
            .set({ Authorization: requestPayload.token })
            .query(query);
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });
});


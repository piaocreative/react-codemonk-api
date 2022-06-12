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
const adminPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Get agency details', () => {
    try {
        it('As a admin I can\'t get agency details that not exists', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/agency/ABC')
                .set({ Authorization: adminPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a admin I can\'t get agency details that not agency id', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/agency/5f083c352a7908662c334535')
                .set({ Authorization: adminPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a admin I should get error if agency id is not exists', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/agency/5f4e0e2ecf759d928bda1aaa')
                .set({ Authorization: adminPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


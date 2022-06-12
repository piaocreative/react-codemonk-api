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
describe('Get recruiter details', () => {
    try {
        it('As a admin I can\'t get recruiter details that not exists', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/ABC')
                .set({ Authorization: adminPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a admin I can\'t get recruiter details that not recruiter id', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/5f083c352a7908662c334535')
                .set({ Authorization: adminPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a admin I can get recruiter details that exists', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/recruiter/620b2fd550e116c3cbbd5aa1')
                .set({ Authorization: adminPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


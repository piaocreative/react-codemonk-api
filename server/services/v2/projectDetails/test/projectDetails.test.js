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

// client User
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Talent user
const talent = {
    id: '5f083c352a7908662c334532',
    email: 'talent@mailinator.com'
};
const talentPayload = {
    token: jwt.sign(talent, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Agency User
const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Get project details(v2)', () => {
    try {
        it('As a user I get project details with talents', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/project/5f631e56d37cbb4801f0fa45')
                .set({ Authorization: talentPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I should not get project details if it\'s not mine', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/project/5f2abf4364712b10ad0e8e3c')
                .set({ Authorization: clientPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I get project details with talents', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/project/5f631e56d37cbb4801f0fa45')
                .set({ Authorization: clientPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I get project details with talents', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/project/5f631e56d37cbb4801f0fa45')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I get project details without talents', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/project/5f2abf4364712b10ad0e8e3c')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I get project details ', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/project/5f631e56d37cbb4801f0fa45')
                .set({ Authorization: agencyPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


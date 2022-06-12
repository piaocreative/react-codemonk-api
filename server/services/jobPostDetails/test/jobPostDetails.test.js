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
// Talent user
const talent = {
    id: '5f083c352a7908662c334532',
    email: 'talent@mailinator.com'
};
const talentPayload = {
    token: jwt.sign(talent, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Agency Talent
const agencyTalent = {
    id: '5f523e4a7e416a76f64ea921',
    email: 'talent2@mailinator.com'
};
const agencyTalentPayload = {
    token: jwt.sign(agencyTalent, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

const client = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};

const clientRequestPayload = {
    token: jwt.sign(client, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Get job post details', () => {
    try {
        it('As a admin I can\'t get job post details that not exists', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/job-post/5f97c8f0a350e416d1a5ebad')
                .set({ Authorization: adminPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a talent I get job post details', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/job-post/5f97c8f0a350e416d1a5eba')
                .set({ Authorization: talentPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a talent I get job post details', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/job-post/5f97c8e2a350e416d1a5ebac')
                .set({ Authorization: talentPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency talent I get job post details', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/job-post/5f97c8f0a350e416d1a5ebae')
                .set({ Authorization: agencyTalentPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I get job post details', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/job-post/5f97c8f0a350e416d1a5ebae')
                .set({ Authorization: adminPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I should get job post details', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/job-post/5f97c8f0a350e416d1a5ebae')
                .set({ Authorization: clientRequestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


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


const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminPayload = {
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


describe('Talent (v2)', () => {
    describe('Verify Talent Profile', () => {
        it('As a Admin, I should able to verify talent profile to accept', async () => {
            const res = await request(process.env.BASE_URL)
                .patch('/v2/talent/61f9292ce72261c29294318f/verified-profile')
                .set({ Authorization: adminPayload.token })
                .send({ verifiedProfile: true });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });

        it('As a Admin, I should able to verify talent profile to rejected', async () => {
            const res = await request(process.env.BASE_URL)
                .patch('/v2/talent/61f9293704f4b80bc8e0ccb1/verified-profile')
                .set({ Authorization: adminPayload.token })
                .send({ verifiedProfile: false });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });

        it('As a Admin, I should not able to update talent profile status from approved to approved', async () => {
            const res = await request(process.env.BASE_URL)
                .patch('/v2/talent/61f9293fb9716e26fc54eff7/verified-profile')
                .set({ Authorization: adminPayload.token })
                .send({ verifiedProfile: true });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });
    });
});

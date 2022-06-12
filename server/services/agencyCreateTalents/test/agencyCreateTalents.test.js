const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAgencyCreateTalents');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};

// Agency without talents User
const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Agency without talents User
const agencyWithoutTalentUser = {
    id: '5f4e0dcbae932622307694d1',
    email: 'agencyuser@yopmail.com'
};
const agencyWithoutTalentPayload = {
    token: jwt.sign(agencyWithoutTalentUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Agency User
const agencyOnboardUser = {
    id: '5f4754eb3fc8842306a8220d',
    email: 'agencystart@mailinator.com'
};
const agencyOnBoardPayload = {
    token: jwt.sign(agencyOnboardUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Agency completes onboarding', () => {
    try {
        it('As a agency I completes my on boarding and send talent invites', async () => {
            const res = await request(process.env.BASE_URL)
                .post('/agency/talents-invite')
                .set({ Authorization: agencyPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I completes my on boarding and without talent invites', async () => {
            const res = await request(process.env.BASE_URL)
                .post('/agency/talents-invite')
                .set({ Authorization: agencyWithoutTalentPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});
describe('Agency create talent/s details', () => {
    try {
        TestCase.talents.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/agency/talent')
                    .set({ Authorization: agencyWithoutTalentPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a agency I can add and invite talent', async () => {
            const talents = {
                firstName: 'Talent One',
                lastName: 'Talent Last One',
                email: 'iamdiffrent@mailinator.com',
                currency: 'USD',
                rate: 40
            };
            const res = await request(process.env.BASE_URL)
                .post('/agency/talent')
                .send(talents)
                .set({ Authorization: agencyWithoutTalentPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can\'t add talent that already added', async () => {
            const talents = {
                firstName: 'Talent One',
                lastName: 'Talent Last one',
                email: 'agencyonboardtalent1@mailinator.com',
                currency: 'USD',
                rate: 400
            };
            const res = await request(process.env.BASE_URL)
                .post('/agency/talent')
                .send(talents)
                .set({ Authorization: agencyOnBoardPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can add talent', async () => {
            const talents = {
                firstName: 'Talent Two',
                lastName: 'Talent Last Two',
                email: 'agencyonboardtalent2@mailinator.com',
                currency: 'USD',
                rate: 400
            };
            const res = await request(process.env.BASE_URL)
                .post('/agency/talent')
                .send(talents)
                .set({ Authorization: agencyOnBoardPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

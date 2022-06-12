const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAgencyEditTalent');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};

// Agency User
const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Agency User
const agencyOnboardUser = {
    id: '5f4754eb3fc8842306a8220d',
    email: 'agencystart@mailinator.com'
};
const agencyOnBoardPayload = {
    token: jwt.sign(agencyOnboardUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Agency edit talent', () => {
    try {
        TestCase.editTalent.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/talent')
                    .set({ Authorization: agencyPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a agency I can edit my talent details', async () => {
            const talents = {
                talentId: '5f523e4a7e416a76f64ea920',
                email: 'talent1@mailinator.com',
                firstName: 'Test~',
                lastName: 'Tes\'me',
                currency: 'USD',
                rate: 400
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/talent')
                .send(talents)
                .set({ Authorization: agencyPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I can\'t edit my onboarded talent details with already existed email', async () => {
            const talents = {
                talentId: '5f523e4a7e416a76f64ea920',
                email: 'talent1@mailinator.com',
                firstName: 'Test~',
                lastName: 'Tes\'me',
                currency: 'USD',
                rate: 400
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/talent')
                .send(talents)
                .set({ Authorization: agencyOnBoardPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


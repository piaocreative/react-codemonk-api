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

// Agency User
const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Get quote details', () => {
    try {
        it('As a agency, I shouldn\' get quote details for invalid id', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/quote/5fa500eea79f873b8ef67b19')
                .set({ Authorization: agencyPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency, I get quote details', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/quote/5fa500eea79f873b8ef67b17')
                .set({ Authorization: agencyPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


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
const requestPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

const agencyUserNoTalents = {
    id: '5f4754eb3fc8842306a8220d',
    email: 'agencystart@mailinator.com'
};
const requestPayloadNoTalents = {
    token: jwt.sign(agencyUserNoTalents, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Agency get project talents count', () => {
    try {
        it('As a agency, I can get my project talent count', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/agency/project/talents/count')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I can get my project talent count', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/agency/project/talents/count')
                .set({ Authorization: requestPayloadNoTalents.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


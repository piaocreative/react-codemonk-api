const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const trueDataStatus = 1;

// client User
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Client news letter subscription', () => {
    try {
        it('As a client user I should able to add news later subscription', async () => {
            const projectDetails = {
                entity: 'timesheet'
            };

            const res = await request(process.env.BASE_URL)
                .post('/client/news-letter')
                .set({ Authorization: clientPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        }).timeout(0);
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});



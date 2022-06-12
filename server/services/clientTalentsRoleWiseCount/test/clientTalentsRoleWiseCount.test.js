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
// Client User
const clientUser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(clientUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Client get my projects team composition based on project role', () => {
    try {
        it('As a client, I can get my projects team composition based on project role', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/client/project/team/count')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


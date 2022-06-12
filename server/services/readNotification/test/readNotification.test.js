const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./readNotification');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// Client User
const clientuser = {
    id: '5f1e76e1035cad67d670f41f',
    email: 'clientemailchange@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('User can mark notification as read ', () => {
    try {
        TestCase.notification.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/notification/mark-read')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 200);
                        done();
                    });
            });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

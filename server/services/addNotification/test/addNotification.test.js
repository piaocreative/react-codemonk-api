const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./addNotification');
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

describe('Notification add test', () => {
    try {
        TestCase.add.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/notification')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 200);
                        done();
                    });
            });
        });
        TestCase.fail.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/notification')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});



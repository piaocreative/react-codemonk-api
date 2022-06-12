const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseproxyLogin');
chai.use(chaiHttp);
const trueDataStatus = 1;
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const requestPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('ProxyLogin Account', () => {
    try {
        TestCase.signinAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/admin/proxy-login')
                    .send(data.options)
                    .set({ Authorization: requestPayload.token })
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user I should validate if user is not active', (done) => {
            const loginUser = {
                'userId': '5f083c352a7908662c334535'
            };
            request(process.env.BASE_URL)
                .post('/admin/proxy-login')
                .set({ Authorization: requestPayload.token })
                .send(loginUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 0);
                    assert.equal(res.statusCode, 423);
                    done();
                });
        });

        it('As a client I should validate if user id is already registered and login but must not suspended', (done) => {
            const clientSuspendedUser = {
                userId: '5f30f3920997b6547a590f94'
            };
            request(process.env.BASE_URL)
                .post('/admin/proxy-login')
                .set({ Authorization: requestPayload.token })
                .send(clientSuspendedUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 423);
                    done();
                });
        });

        it(`As a user(talent) I should validate and login
            into talent account using new registration`, (done) => {
            const loginUser = {
                'userId': '5f083c352a7908662c334532'
            };
            request(process.env.BASE_URL)
                .post('/admin/proxy-login')
                .set({ Authorization: requestPayload.token })
                .send(loginUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    expect(res.body.data.talentToken).to.be.a('string');
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it(`As a user(client) I should validate and login
            into client account using new registration`, (done) => {
            const loginUser = {
                userId: '5f083c352a7908662c334533'
            };
            request(process.env.BASE_URL)
                .post('/admin/proxy-login')
                .set({ Authorization: requestPayload.token })
                .send(loginUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    expect(res.body.data.clientToken).to.be.a('string');
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it(`As a user(agency) I should validate and login
            into agency account using new registration`, (done) => {
            const loginUser = {
                userId: '5f475a9ef25e122eb21d68a8'
            };
            request(process.env.BASE_URL)
                .post('/admin/proxy-login')
                .set({ Authorization: requestPayload.token })
                .send(loginUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    expect(res.body.data.agencyToken).to.be.a('string');
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

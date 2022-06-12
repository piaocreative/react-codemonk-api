const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSignupRecruiter');
chai.use(chaiHttp);

describe('Signup Recruiter Account', () => {
    try {
        TestCase.registerAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/v2/auth/recruiter/signup')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user I should register as recruiter', (done) => {
            const registerUser = {
                email: 'brankostar@hotmail.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/v2/auth/recruiter/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data.role, CONSTANTS.ROLE.RECRUITER);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a recruiter I should validate if email is already registered and login', (done) => {
            const registerUser = {
                email: 'brankostar@hotmail.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/v2/auth/recruiter/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a agency I should validate if email is already registered and login', (done) => {
            const registerUser = {
                email: 'agency@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/v2/auth/recruiter/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a client I should validate if email is already registered and login but must not suspended', (done) => {
            const registerUser = {
                email: 'clientsuspend@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/v2/auth/recruiter/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 423);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


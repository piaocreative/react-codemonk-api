const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCases = require('./ambassadorSignupCases');
chai.use(chaiHttp);
const dotenv = require('dotenv');
dotenv.config({ path: process.env.PWD + '/local.env' });
const CONSTANTS = require('../../../../util/constants')

describe('Signup Ambassador Account', () => {
    try {
        TestCases.registerAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/ambassador/signup')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user I should register as an ambassador', (done) => {
            const registerUser = {
                "email": "vipivis306@robhung.com",
                "password": "d2e1e34b17b299288d927e636bb9d891aa2feff88d69148c81ad88cb75dd188b"
            };
            request(process.env.BASE_URL)
                .post('/auth/ambassador/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data.role, CONSTANTS.ROLE.AMBASSADOR);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As an ambassador I should validate if email is already registered and login', (done) => {
            const registerUser = {
                "email": "vipivis306@robhung.com",
                "password": "d2e1e34b17b299288d927e636bb9d891aa2feff88d69148c81ad88cb75dd188b"
            };
            request(process.env.BASE_URL)
                .post('/auth/ambassador/signup')
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
                .post('/auth/ambassador/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a client I should validate if email is already registered and login but must not be suspended', (done) => {
            const registerUser = {
                email: 'clientsuspend@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/auth/ambassador/signup')
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


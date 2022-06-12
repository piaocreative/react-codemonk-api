const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSignup');
chai.use(chaiHttp);
const trueDataStatus = 1;
let validRegistration;
let validRegistrationClient;

describe('Signup Account', () => {
    try {
        TestCase.registerAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/signup')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user I should register as talent', (done) => {
            const registerUser = {
                email: 'john@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                otp: 123456
            };
            validRegistration = registerUser;
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data.role, CONSTANTS.ROLE.TALENT);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a talent I should validate if email is already registered and login', (done) => {
            const registerUser = {
                email: 'john@mailinator.com',
                password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            request(process.env.BASE_URL)
                .post('/auth/signup')
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
                .post('/auth/signup')
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
                .post('/auth/signup')
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

describe('Signup Client Account', () => {
    try {
        TestCase.registerAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/client/signup')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user I should register as client', (done) => {
            const registerUser = {
                email: 'clienttest@mailinator.com',
                password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd7',
                otp: 123456
            };

            validRegistrationClient = registerUser;

            request(process.env.BASE_URL)
                .post('/auth/client/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data.role, CONSTANTS.ROLE.CLIENT);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a client I should validate if email is already registered login', (done) => {
            const registerUser = {
                email: 'clienttest@mailinator.com',
                password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd7' // Client@123
            };
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a client I should validate if email is already registered but invalid password', (done) => {
            const registerUser = {
                email: 'clienttest@mailinator.com',
                password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd6' // Client@123
            };
            request(process.env.BASE_URL)
                .post('/auth/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 422);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Signup get agency talent email', () => {
    try {
        TestCase.agencyTalentGetEmail.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .get('/auth/agency/talent/email')
                    .query(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user I should register get agency talent email', (done) => {
            const registerUser = {
                token: '5f523e4a7e416a76f64ea920'
            };

            request(process.env.BASE_URL)
                .get('/auth/agency/talent/email')
                .query(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data, 'talent1@mailinator.com');
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user I should register get agency talent email', (done) => {
            const registerUser = {
                token: '5f475a9ef25e122eb21d68a8'
            };

            request(process.env.BASE_URL)
                .get('/auth/agency/talent/email')
                .query(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data, '');
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Signup agency talent Account', () => {
    try {
        TestCase.agencyTalentAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/agency/talent/signup')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user I should register as agency talent', (done) => {
            const registerUser = {
                email: 'talent1@mailinator.com',
                token: '5f523e4a7e416a76f64ea920',
                password: 'ba6b9cf408a3bc5568cc18317077a3d5fc81849c1b84128180240ab9680d0dd7'
            };

            request(process.env.BASE_URL)
                .post('/auth/agency/talent/signup')
                .send(registerUser)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data.role, CONSTANTS.ROLE.TALENT);
                    assert.equal(res.body.data.signupStep, 0.1);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Verify Account', () => {
    try {
        TestCase.verifyAccount.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/verify-account')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should verify existing talent user', (done) => {
            request(process.env.BASE_URL)
                .post('/auth/verify-account')
                .send({ email: validRegistration.email, otp: validRegistration.otp })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user, I should verify existing client user', (done) => {
            request(process.env.BASE_URL)
                .post('/auth/verify-account')
                .send({ email: validRegistrationClient.email, otp: validRegistrationClient.otp })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Resend OTP', () => {
    try {
        TestCase.resendOTP.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/auth/resend-otp')
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should send resend OTP to talent', (done) => {
            request(process.env.BASE_URL)
                .post('/auth/resend-otp')
                .send({ email: validRegistration.email })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user, I should send resend OTP to client', (done) => {
            request(process.env.BASE_URL)
                .post('/auth/resend-otp')
                .send({ email: validRegistrationClient.email })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

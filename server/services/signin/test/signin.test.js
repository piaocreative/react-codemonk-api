const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSignin');
chai.use(chaiHttp);

describe('Signin Account', () => {
    TestCase.signinAccount.forEach((data) => {
        it(data.it, (done) => {
            request(process.env.BASE_URL)
                .post('/auth/signin')
                .send(data.options)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });
    });

    it('As a user I should validate if email is not registered', (done) => {
        const loginUser = {
            'email': 'john1@mailinator.com',
            'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d'
        };
        request(process.env.BASE_URL)
            .post('/auth/signin')
            .send(loginUser)
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, 0);
                assert.equal(res.statusCode, 401);
                done();
            });
    });

    it('As a user I should validate if invalid password', (done) => {
        const loginUser = {
            'email': 'talent@mailinator.com',
            'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d'
        };
        request(process.env.BASE_URL)
            .post('/auth/signin')
            .send(loginUser)
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, 0);
                assert.equal(res.statusCode, 401);
                done();
            });
    });

    it('As a user I should validate if valid password but user is not active', (done) => {
        const loginUser = {
            'email': 'inactive@mailinator.com',
            'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        };
        request(process.env.BASE_URL)
            .post('/auth/signin')
            .send(loginUser)
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, 0);
                assert.equal(res.statusCode, 207);
                done();
            });
    });

    it('As a client I should validate if email is already registered and login but must not suspended', (done) => {
        const clientSuspendedUser = {
            email: 'clientsuspend@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        };
        request(process.env.BASE_URL)
            .post('/auth/signin')
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
            'email': 'talent@mailinator.com',
            'password': '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        };
        request(process.env.BASE_URL)
            .post('/auth/signin')
            .send(loginUser)
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                expect(res.body.data.token).to.be.a('string');
                assert.equal(res.body.status, 1);
                assert.equal(res.statusCode, 200);
                done();
            });
    });

    it(`As a user(client) I should validate and login
        into client account using new registration`, (done) => {
        const loginUser = {
            email: 'client@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        };
        request(process.env.BASE_URL)
            .post('/auth/signin')
            .send(loginUser)
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                expect(res.body.data.token).to.be.a('string');
                assert.equal(res.body.status, 1);
                assert.equal(res.statusCode, 200);
                done();
            });
    });

    it(`As a user(agency) I should validate and login
        into agency account using new registration`, (done) => {
        const loginUser = {
            email: 'agency@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        };
        request(process.env.BASE_URL)
            .post('/auth/signin')
            .send(loginUser)
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                expect(res.body.data.token).to.be.a('string');
                assert.equal(res.body.status, 1);
                assert.equal(res.statusCode, 200);
                done();
            });
    });

    it(`As a user(admin) I should validate and login
        into agency account using new registration`, (done) => {
        const loginUser = {
            email: 'super@codemonk.ai',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        };
        request(process.env.BASE_URL)
            .post('/auth/signin')
            .send(loginUser)
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                expect(res.body.data.token).to.be.a('string');
                assert.equal(res.body.status, 1);
                assert.equal(res.statusCode, 200);
                done();
            });
    });


    it(`As a talent I should validate and login
        into talent account using new registration after reseting pass`, (done) => {
        const loginUser = {
            email: 'resetpasstalent@mailinator.com',
            password: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
        };
        request(process.env.BASE_URL)
            .post('/auth/signin')
            .send(loginUser)
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                expect(res.body.data.token).to.be.a('string');
                assert.equal(res.body.status, 1);
                assert.equal(res.statusCode, 200);
                done();
            });
    });

});

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./userProfile');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};

// Invalid Token
const invalidToken = {
    token: ''
};

// Invalid
const invaliduser = {
    id: '5f083c352a7908662c334531',
    email: 'talent@mailinator.com'
};
const requestPayloadInvalid = {
    token: jwt.sign(invaliduser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Inactive
const inactiveUser = {
    id: '5f083c352a7908662c334535',
    email: 'inactive@mailinator.com'
};
const requestPayloadInactive = {
    token: jwt.sign(inactiveUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Talent
const talent = {
    id: '5f083c352a7908662c334532',
    email: 'talent@mailinator.com'
};
const requestPayloadTalent = {
    token: jwt.sign(talent, process.env.JWT_SECRET, tokenOptionalInfo)
};

// client User
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const requestPayloadClient = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Suspended client User
const suspendedClientuser = {
    id: '5f30f3920997b6547a590f94',
    email: 'clientsuspend@mailinator.com'
};
const suspendedClientPayload = {
    token: jwt.sign(suspendedClientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyUserPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Talent Profile get', () => {
    try {
        it('Check invalid token ', (done) => {
            request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: invalidToken.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });
        it('Check invalid user', (done) => {
            request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: requestPayloadInvalid.token })
                .end((err, res) => {

                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 401);
                    done();
                });
        });

        it('Get inactive user details', (done) => {
            request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: requestPayloadInactive.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 423);
                    done();
                });
        });

        it('Get suspended user details', async () => {
            const query = {
                page: 3,
                limit: 20
            };
            const res = await request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: suspendedClientPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 423);

        });

        it('Get talent user details', (done) => {
            request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: requestPayloadTalent.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('Get client user details', (done) => {
            request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: requestPayloadClient.token })
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.data.role, 2);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a talent I try to access other url', async () => {
            const params = {
                clientId: '5f30f3920997b6547a590f94',
                status: 2
            };
            const res = await request(process.env.BASE_URL)
                .put('/client/status')
                .set({ Authorization: requestPayloadTalent.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 406);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent Profile Picture', () => {
    try {
        // Check all validation;
        TestCase.uploadProfilePicture.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/user/picture')
                    .set({ Authorization: requestPayloadTalent.token })
                    .attach('doc', data.options.doc)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });

        it('As a user, I should not be able to invalid profile picture', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/picture')
                .set({ Authorization: requestPayloadTalent.token })
                .attach('photo', 'test/mock-data/TEST.pdf');
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should not be upload valid file with less than 5 kb', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/picture')
                .set({ Authorization: requestPayloadTalent.token })
                .attach('photo', 'test/mock-data/3kb_file.png');
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should not be upload valid file with more than 5 mb', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/picture')
                .set({ Authorization: requestPayloadTalent.token })
                .attach('photo', 'test/mock-data/5_8mb_file.jpeg');
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should upload valid file for user profile', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/picture')
                .set({ Authorization: requestPayloadTalent.token })
                .attach('photo', 'test/mock-data/valid_profile_pic.jpg');
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should upload valid file for talent profile on behalf of talent', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/picture')
                .set({ Authorization: agencyUserPayload.token })
                .attach('photo', 'test/mock-data/valid_profile_pic.jpg')
                .field('talentId', '5f523e4a7e416a76f64ea921');
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to delete uploaded file', async () => {
            const res = await request(process.env.BASE_URL)
                .delete('/user/picture')
                .set({ Authorization: requestPayloadTalent.token });
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent Professional details check urls', () => {
    try {
        it('As a user I should check that url is not passed ', (done) => {
            const url = {};

            request(process.env.BASE_URL)
                .get('/user/checkurl')
                .set({ Authorization: requestPayloadTalent.token })
                .send(url)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    done();
                });
        }).timeout(0);

        it('As a user I should check that invalid github url', (done) => {
            const url = {
                url: 'https://github.com/dsfdsfdsfdsfdsfdsfdsfdsfdsfdsf'
            };

            request(process.env.BASE_URL)
                .get('/user/checkurl')
                .set({ Authorization: requestPayloadTalent.token })
                .query(url)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    done();
                });
        }).timeout(0);

        it('As a user I should check that valid github url', (done) => {
            const url = {
                url: 'https://github.com/emkay'
            };

            request(process.env.BASE_URL)
                .get('/user/checkurl')
                .set({ Authorization: requestPayloadTalent.token })
                .query(url)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        }).timeout(0);

        it('As a user I should check that invalid stackoverflow url', (done) => {
            const url = {
                url: 'https://stackoverflow.com/users/abc/jon-skeet'
            };

            request(process.env.BASE_URL)
                .get('/user/checkurl')
                .set({ Authorization: requestPayloadTalent.token })
                .query(url)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 400);
                    done();
                });
        }).timeout(0);

        it('As a user I should check that valid stackoverflow url', (done) => {
            const url = {
                url: 'https://stackoverflow.com/users/1427501/hitesh-parikh'
            };

            request(process.env.BASE_URL)
                .get('/user/checkurl')
                .set({ Authorization: requestPayloadTalent.token })
                .query(url)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent Profile password change', () => {
    try {
        // Check all validation;
        TestCase.changePassword.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/user/password')
                    .set({ Authorization: requestPayloadTalent.token })
                    .attach('doc', data.options.doc)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        done();
                    });
            });
        });
        it('Check invalid existing password', async () => {
            const data = {
                oldPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267d',
                newPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            const res = await request(process.env.BASE_URL)
                .put('/user/password')
                .set({ Authorization: requestPayloadTalent.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });
        it('Change user password', async () => {
            const data = {
                oldPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                newPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e'
            };
            const res = await request(process.env.BASE_URL)
                .put('/user/password')
                .set({ Authorization: requestPayloadTalent.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

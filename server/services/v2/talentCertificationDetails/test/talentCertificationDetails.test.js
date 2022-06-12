const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseCertificationDetails');
chai.use(chaiHttp);

const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const talent = {
    id: '5f083c352a7908662c334532',
    email: 'talent@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(talent, process.env.JWT_SECRET, tokenOptionalInfo)
};

const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyUserPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

let userDetails;

describe('Talent certificate add(v2)', () => {
    try {
        TestCase.addCertificate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/v2/talent/certificate')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should able to add certificate details', async () => {
            const data = {
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019',
                issuedBy: 'Amazon',
                certificateId: 'ABC123'
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/certificate')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to add certificate details on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                name: 'AWS Solution Architect',
                dateObtained: '30/08/2019',
                issuedBy: 'Amazon',
                certificateId: 'ABC123'
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/certificate')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent certificate edit(v2)', () => {
    try {
        TestCase.editCertificate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/v2/talent/certificate')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should able to edit certificate details using id', async () => {
            const data = {
                _id: userDetails.certificateDetails[0]._id,
                name: 'AWS Solution Architect 2',
                dateObtained: '30/08/2019',
                issuedBy: 'Amazon',
                certificateId: 'ABC123'
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/certificate')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to edit certificate details using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5fbcb0a43b00df2f745de965',
                name: 'AWS Solution Architect 2',
                dateObtained: '30/08/2019',
                issuedBy: 'Amazon',
                certificateId: 'ABC123'
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/certificate')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent certificate delete(v2)', () => {
    try {
        TestCase.deleteCertificate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/v2/talent/certificate')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I shouldn\'t able to delete certificate details using id', async () => {
            const data = {
                _id: 'ABC'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/certificate')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should able to delete certificate details using id', async () => {
            const data = {
                _id: userDetails.certificateDetails[0]._id
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/certificate')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to delete certificate details using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5fbcb0a43b00df2f745de965'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/certificate')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

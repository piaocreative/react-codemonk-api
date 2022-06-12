const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseEducationDetails');
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

describe('Talent education add(v2)', () => {
    try {
        TestCase.addEducation.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/v2/talent/education')
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

        it('As a user, I should able to add education details', async () => {
            const data = {
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/education')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to add education details on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/education')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent education edit(v2)', () => {
    try {
        TestCase.editEducation.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/v2/talent/education')
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

        it('As a user, I should able to edit education details using id', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: userDetails.educationDetails[0]._id,
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application & AI',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/education')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to edit education details using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5f8eee0bc4336d7911646114',
                degreeLevel: 'Master’s or Higher',
                degreeTitle: 'Master in Computer Application & AI',
                collegeName: 'IETE, New Delhi',
                country: 'India',
                startYear: 2019,
                endYear: 2020
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/education')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent education delete(v2)', () => {
    try {
        TestCase.deleteEducation.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/v2/talent/education')
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

        it('As a user, I shouldn\'t able to delete education details using id', async () => {
            const data = {
                _id: 'ABC'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/education')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should able to delete education details using id', async () => {
            const data = {
                _id: userDetails.educationDetails[0]._id
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/education')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to delete education details using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5f8eee0bc4336d7911646114'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/education')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


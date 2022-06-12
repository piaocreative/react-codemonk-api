const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseWorkExperienceDetails');
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

describe('Talent work experience add(v2)', () => {
    try {
        TestCase.addWorkExperience.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/v2/talent/work-experience')
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

        it('As a user, I should able to add work experience', async () => {
            const data = {
                jobTitle: 'Software Engineer',
                employmentType: 'Fulltime',
                employer: 'codemonk',
                country: 'India',
                startDate: '14/06/2019',
                endDate: '14/06/2020',
                shortDescription: 'I was software developer'
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/work-experience')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should able to add work experience without url', async () => {
            const data = {
                jobTitle: 'Software Engineer',
                employmentType: 'Fulltime',
                employer: 'Inno',
                country: 'India',
                startDate: '14/06/2019',
                endDate: '14/06/2020',
                shortDescription: 'I was software developer',
                isPresent: true
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/work-experience')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to add work experience without url on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                jobTitle: 'Software Engineer',
                employmentType: 'Fulltime',
                employer: 'Inno',
                country: 'India',
                startDate: '14/06/2019',
                endDate: '14/06/2020',
                shortDescription: 'I was software developer',
                isPresent: true
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/work-experience')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent work experience edit(v2)', () => {
    try {
        TestCase.editWorkExperience.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/v2/talent/work-experience')
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

        it('As a user, I should able to edit work experience using id with isPresent', async () => {
            const data = {
                _id: userDetails.workExperience[1]._id,
                jobTitle: 'Software Engineer',
                employmentType: 'Fulltime',
                employer: 'Inno',
                country: 'India',
                startDate: '14/06/2019',
                endDate: '14/06/2020',
                shortDescription: 'I was software developer',
                isPresent: false
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/work-experience')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should able to edit work experience using id', async () => {
            const data = {
                _id: userDetails.workExperience[0]._id,
                jobTitle: 'Software Engineer',
                employmentType: 'Fulltime',
                employer: 'codemonk',
                country: 'India',
                startDate: '14/06/2019',
                endDate: '14/06/2020',
                shortDescription: 'I was software developer'
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/work-experience')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to edit work experience using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5f8eedffc4336d7911646113',
                jobTitle: 'Software Engineer',
                employmentType: 'Fulltime',
                employer: 'codemonk',
                country: 'India',
                startDate: '14/06/2019',
                endDate: '14/06/2020',
                shortDescription: 'I was software developer'
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/work-experience')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent work experience delete(v2)', () => {
    try {
        TestCase.deleteWorkExperience.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/v2/talent/work-experience')
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

        it('As a user, I should not able to delete work experience using invalid id', async () => {
            const data = {
                _id: 'ABC'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/work-experience')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should able to delete work experience using id', async () => {
            const data = {
                _id: userDetails.workExperience[1]._id
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/work-experience')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to delete work experience using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5f8eedffc4336d7911646113'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/work-experience')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentEducationDetails');
chai.use(chaiHttp);
const trueDataStatus = 1;
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
describe('Talent education details', () => {
    try {
        TestCase.educationDetails.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/education-details')
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

        it('As a user, I should check education only save', async () => {
            const data = {
                educationDetails: [{
                    degreeLevel: 'Master’s or Higher',
                    degreeTitle: 'Master in Computer Application',
                    collegeName: 'IETE, New Delhi',
                    country: 'India',
                    startYear: 2019,
                    endYear: 2020
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/education-details')
                .set({ Authorization: requestPayload.token })
                .send(data);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should check education and certification data', async () => {
            const data = {
                educationDetails: [{
                    degreeLevel: 'Master’s or Higher',
                    degreeTitle: 'Master in Computer Application',
                    collegeName: 'IETE, New Delhi',
                    country: 'India',
                    startYear: 2019,
                    endYear: 2020
                }],
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon',
                    certificateId: 'ABC123'
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/education-details')
                .set({ Authorization: requestPayload.token })
                .send(data);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should check education and certification data multiple', async () => {
            const data = {
                educationDetails: [{
                    degreeLevel: 'Master’s or Higher',
                    degreeTitle: 'Master in Computer Application',
                    collegeName: 'IETE, New Delhi',
                    country: 'India',
                    startYear: 2019,
                    endYear: 2020
                },
                {
                    degreeLevel: 'Bachelor’s',
                    degreeTitle: 'Bachelor in Computer Science',
                    collegeName: 'IETE, New Delhi',
                    country: 'India',
                    startYear: 2019,
                    endYear: 2020
                }],
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon',
                    certificateId: 'ABC123'
                },
                {
                    name: 'MongoDB Certified DB Developer',
                    dateObtained: '30/12/2019',
                    issuedBy: 'Mongo Universiry',
                    certificateId: 'MONGO123'
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/education-details')
                .set({ Authorization: requestPayload.token })
                .send(data);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });



    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


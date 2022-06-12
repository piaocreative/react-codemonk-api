const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentWorkExperience');
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
describe('Talent Work Experience details', () => {
    try {

        TestCase.workExperienceDetails.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/workexperience-details')
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

        it('As a user I can save my work experience details with multiple',
            (done) => {
                const workExperienceDetails = {
                    workExperience: [{
                        'jobTitle': 'Software Engineer',
                        'employmentType': 'Fulltime',
                        'employer': 'codemonk',
                        'country': 'India',
                        'startDate': '14/06/2018',
                        'endDate': '14/06/2019',
                        'shortDescription': 'I was software developer',
                        isPresent: true
                    }, {
                        'jobTitle': 'Software Engineer intern',
                        'employmentType': 'Fulltime',
                        'employer': 'codemonk',
                        'country': 'India',
                        'startDate': '15/06/2019',
                        'endDate': '14/06/2020',
                        'shortDescription': 'I was software developer intern',
                        isPresent: false
                    }]
                };

                request(process.env.BASE_URL)
                    .put('/talent/workexperience-details')
                    .set({ Authorization: requestPayload.token })
                    .send(workExperienceDetails)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 200);
                        done();
                    });
            });

        it('As a user I can save my work experience details',
            (done) => {
                const workExperienceDetails = {
                    workExperience: [{
                        'jobTitle': 'Software Engineer',
                        'employmentType': 'Fulltime',
                        'employer': 'codemonk',
                        'country': 'India',
                        'startDate': '14/06/2019',
                        'endDate': '14/06/2020',
                        'shortDescription': 'I was software developer',
                        isPresent: false
                    }]
                };

                request(process.env.BASE_URL)
                    .put('/talent/workexperience-details')
                    .set({ Authorization: requestPayload.token })
                    .send(workExperienceDetails)
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


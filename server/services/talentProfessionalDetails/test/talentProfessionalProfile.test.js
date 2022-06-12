const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentProfessionalProfile');
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
describe('Talent Professional Profile', () => {
    try {

        TestCase.professionalProfile.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/professional-details')
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




        it('As a user I can save my professional details', (done) => {
            const professionalDetails = {

                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs'
            };

            request(process.env.BASE_URL)
                .put('/talent/professional-details')
                .set({ Authorization: requestPayload.token })
                .send(professionalDetails)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });


        it('As a user I can save my professional details without linkedInUrl', (done) => {
            const professionalDetails = {
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs'
            };

            request(process.env.BASE_URL)
                .put('/talent/professional-details')
                .set({ Authorization: requestPayload.token })
                .send(professionalDetails)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
        it('As a user I can save my professional details without github url', (done) => {
            const professionalDetails = {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs'
            };

            request(process.env.BASE_URL)
                .put('/talent/professional-details')
                .set({ Authorization: requestPayload.token })
                .send(professionalDetails)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user I can save my professional details without stackOverFlowUrl', (done) => {
            const professionalDetails = {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs'
            };

            request(process.env.BASE_URL)
                .put('/talent/professional-details')
                .set({ Authorization: requestPayload.token })
                .send(professionalDetails)
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

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseCertificateDetails');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// client User
const agencyUser = {
    id: '5f5335172317791e189ac32d',
    email: 'agencybefore@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Agency update certificate and credentials', () => {
    try {
        TestCase.certificate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/certificate-details')
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

        it('As a agency I can skip saving certificate and credentials details', async () => {
            const certificateDetails = {
                certificateDetails: []
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificate-details')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save saving certificate and credentials details', async () => {
            const certificateDetails = {
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificate-details')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save update certificate and credentials of linkedIn url', async () => {
            const certificateDetails = {
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificate-details')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save update certificate and credentials of github url', async () => {
            const certificateDetails = {
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                gitHubUrl: 'https://github.com/bill-gates'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificate-details')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save update certificate and credentials of dribble url', async () => {
            const certificateDetails = {
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                dribbbleUrl: 'https://dribbble.com/KendrickKidd'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificate-details')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save update certificate and credentials of clutch url', async () => {
            const certificateDetails = {
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                clutchUrl: 'https://clutch.co/profile/hyperlink-infosystem'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificate-details')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save update certificate and credentials of good firms url', async () => {
            const certificateDetails = {
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                goodfirmsUrl: 'https://www.goodfirms.co/software/crest-erp'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificate-details')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save update certificate and credentials of other Url', async () => {
            const certificateDetails = {
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                otherWebsiteUrl: 'https://innovify.com/'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/certificate-details')
                .send(certificateDetails)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


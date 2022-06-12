const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAgencySaveLater');
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
describe('Agency save-later profile details', () => {
    try {
        it('As a agency I can\'t save my profile with invalid file', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .field('step', -1);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });
        TestCase.profile.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 200);
                        done();
                    });
            });
        });

        it('As a agency I can\'t save my trading logo with invalid file', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .attach('tradingLogo', 'test/mock-data/proper_pdf.pdf')
                .field('step', 1);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can save my trading logo', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .attach('tradingLogo', 'test/mock-data/valid_profile_pic.jpg')
                .field('step', 1);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Agency save-later talent details', () => {
    try {
        it('As a agency I can save empty talents', async () => {
            const talents = {
                step: 2,
                talents: []
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(talents);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save my talent details', async () => {
            const talents = {
                step: 2,
                talents: [{
                    firstName: 'Talent One',
                    lastName: 'Talent Last One',
                    email: 'talent1@mailinator.com',
                    currency: 'USD',
                    rate: 40
                },
                {
                    firstName: 'Talent Two',
                    lastName: 'Talent Last Two',
                    email: 'talent2@mailinator.com',
                    currency: 'GBP',
                    rate: 25
                },
                {
                    firstName: 'Talent Three',
                    lastName: 'Talent Last Three',
                    email: 'talent3@mailinator.com',
                    currency: 'EUR',
                    rate: 50
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(talents);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Agency save-later certificate and credentials details', () => {
    try {
        it('As a agency I can save certificate and credentials empty details', async () => {
            const details = {
                step: 3
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(details);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save certificate details', async () => {
            const details = {
                step: 3,
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(details);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save certificate details with linkedInUrl', async () => {
            const details = {
                step: 3,
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(details);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save certificate details linkedInUrl, githubUrl', async () => {
            const details = {
                step: 3,
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(details);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save certificate details linkedInUrl, githubUrl, dribbleUrl', async () => {
            const details = {
                step: 3,
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                dribbbleUrl: 'https://dribbble.com/KendrickKidd'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(details);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save certificate details linkedInUrl, githubUrl, dribbleUrl, clutchUrl', async () => {
            const details = {
                step: 3,
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                dribbbleUrl: 'https://dribbble.com/KendrickKidd',
                clutchUrl: 'https://clutch.co/profile/hyperlink-infosystem'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(details);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save certificate details without otherWebsiteUrl', async () => {
            const details = {
                step: 3,
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                dribbbleUrl: 'https://dribbble.com/KendrickKidd',
                clutchUrl: 'https://clutch.co/profile/hyperlink-infosystem',
                goodfirmsUrl: 'https://www.goodfirms.co/software/crest-erp'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(details);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save certificate details and credentials urls', async () => {
            const details = {
                step: 3,
                certificateDetails: [{
                    name: 'AWS Solution Architect',
                    dateObtained: '30/08/2019',
                    issuedBy: 'Amazon'
                }],
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                dribbbleUrl: 'https://dribbble.com/KendrickKidd',
                clutchUrl: 'https://clutch.co/profile/hyperlink-infosystem',
                goodfirmsUrl: 'https://www.goodfirms.co/software/crest-erp',
                otherWebsiteUrl: 'https://innovify.com/'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(details);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Agency save-later payment details', () => {
    try {
        it('As a agency I can save payment empty details', async () => {
            const talents = {
                step: 4
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(talents);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save payment details with bankName', async () => {
            const talents = {
                step: 4,
                bankName: 'Kotak'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(talents);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save payment details with bank account number', async () => {
            const talents = {
                step: 4,
                bankAccountNumber: 'ABC123'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(talents);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save payment details with bank code', async () => {
            const talents = {
                step: 4,
                bankCode: 'KT12345'
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(talents);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Agency save-later director details', () => {
    try {
        it('As a agency I can save director empty details', async () => {
            const data = {
                step: 5,
                director: []
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save director details with all the details', async () => {
            const data = {
                step: 5,
                directors: [{
                    firstName: 'Director one',
                    lastName: 'Director oneLast',
                    dob: '01/12/2000',
                    postcode: '380013',
                    addressLineOne: 'Some House, Some Buildding',
                    addressLineTwo: 'Some Road, Somewhere',
                    city: 'Ahmedabad',
                    country: 'India',
                    isDirector: true
                },
                {
                    firstName: 'Director two',
                    lastName: 'Director twoLast',
                    dob: '01/11/2000',
                    postcode: '380013',
                    addressLineOne: 'Some House, Some Buildding',
                    addressLineTwo: 'Some Road, Somewhere',
                    city: 'Ahmedabad',
                    country: 'India',
                    isDirector: true
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

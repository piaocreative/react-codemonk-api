const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseSaveLater');
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

describe('Talent Profile save later(V2)', () => {
    try {
        // Check all validation;
        TestCase.saveLater.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/v2/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .attach('doc', data.options.doc)
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should be able to save step 1 with valid personal data without gender',
            async () => {
                const data = {
                    step: 1,
                    firstName: 'Talent',
                    lastName: 'Last',
                    countryCode: '91',
                    phoneNumber: '9925061220',
                    dob: '31/08/1986',
                    postcode: '380015',
                    addressLineOne: 'Some House, Some Buildding',
                    addressLineTwo: 'Some Road, Somewhere',
                    city: 'Ahmedabad',
                    country: 'India',
                    language: [{
                        name: 'en', rate: 8
                    }],
                    timeZone: 'Asia/Kolkata'
                };
                const res = await request(process.env.BASE_URL)
                    .put('/v2/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 1 with valid personal data',
            async () => {
                const data = {
                    step: 1,
                    firstName: 'Talent',
                    lastName: 'Last',
                    countryCode: '91',
                    phoneNumber: '9925061220',
                    dob: '31/08/1986',
                    gender: 'Male',
                    postcode: '380015',
                    addressLineOne: 'Some House, Some Buildding',
                    addressLineTwo: 'Some Road, Somewhere',
                    city: 'Ahmedabad',
                    country: 'India',
                    language: [{
                        name: 'en', rate: 8
                    }],
                    timeZone: 'Asia/Kolkata'
                };
                const res = await request(process.env.BASE_URL)
                    .put('/v2/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 1 without years of experience',
            async () => {
                const data = {
                    step: 1,
                    linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                    gitHubUrl: 'https://github.com/bill-gates',
                    stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                    primaryRole: 'Developer'
                };
                const res = await request(process.env.BASE_URL)
                    .put('/v2/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 1 without url valid professional data',
            async () => {
                const data = {
                    step: 1,
                    primaryRole: 'Developer',
                    yearsOfExperience: 'Beginner - 0 - 2 yrs'
                };
                const res = await request(process.env.BASE_URL)
                    .put('/v2/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 1 with valid professional data', async () => {
            const data = {
                step: 1,
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs'
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a user, I should be able to save step 5 with only work preference details',
            async () => {
                const data = {
                    step: 5,
                    'workPreference': ['fulltime']
                };
                const res = await request(process.env.BASE_URL)
                    .put('/v2/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 5 without teamPreference details',
            async () => {
                const data = {
                    step: 5,
                    'assignments': [
                        'occational-site-visit'
                    ],
                    'workPreference': ['fulltime'],
                };
                const res = await request(process.env.BASE_URL)
                    .put('/v2/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 5 with valid preference details', async () => {
            const data = {
                step: 5,
                'teamPreference': [
                    'individuals'
                ],
                'assignments': [
                    'occational-site-visit'
                ],
                'workPreference': ['fulltime'],
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 6 with valid pay curreny', async () => {
            const data = {
                step: 6,
                currency: 'USD'
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 6 with valid pay rate per hour', async () => {
            const data = {
                step: 6,
                ratePerHour: 40
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 6 with valid pay billing type', async () => {
            const data = {
                step: 6,
                billingType: 'freelancer'
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 6 with valid pay billing type company',
            async () => {
                const data = {
                    step: 6,
                    billingType: 'company',
                    companyName: 'Soft Silicon',
                    companyregisteredNumber: 'ABC',
                    companyPincode: '380015',
                    companyCity: 'Ahmedabad',
                    companyCountry: 'India',
                    companyAddressLineOne: 'Some Building',
                    currencyCompanyProfessionInsuranceValue: 'USD',
                    companyProfessionInsuranceValue: 1000000,
                    currencyCompanyPublicInsurancesValue: 'USD',
                    companyPublicInsurancesValue: 5000000,
                    currencyCompanyEmployerInsuranceValue: 'USD',
                    companyEmployerInsuranceValue: 10000000
                };
                const res = await request(process.env.BASE_URL)
                    .put('/v2/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });


    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});



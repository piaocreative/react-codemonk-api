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

describe('Talent Profile save later', () => {
    try {
        // Check all validation;
        TestCase.saveLater.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .attach('doc', data.options.doc)
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
                    .put('/talent/save-later')
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
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 2 without years of experience',
            async () => {
                const data = {
                    step: 2,
                    professionalSummary: `Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled
                     it to make a type specimen book. It has survived not only
                     five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                       popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently
                         with desktop publishing software like Aldus PageMaker
                          including versions of Lorem Ipsum.`,
                    linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                    gitHubUrl: 'https://github.com/bill-gates',
                    stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                    primaryRole: 'Developer',
                    skills: [{
                        name: 'Node',
                        rate: 7
                    },
                    {
                        name: 'NoSQL',
                        rate: 7
                    }]
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 2 without url valid professional data',
            async () => {
                const data = {
                    step: 2,
                    professionalSummary: `Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled
                     it to make a type specimen book. It has survived not only
                     five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                       popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently
                         with desktop publishing software like Aldus PageMaker
                          including versions of Lorem Ipsum.`,
                    primaryRole: 'Developer',
                    yearsOfExperience: 'Beginner - 0 - 2 yrs',
                    skills: [{
                        name: 'Node',
                        rate: 7
                    },
                    {
                        name: 'NoSQL',
                        rate: 7
                    }]
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 2 with valid professional data', async () => {
            const data = {
                step: 2,
                professionalSummary: `Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been
                the industry's standard dummy text ever since the 1500s,
                 when an unknown printer took a galley of type and scrambled
                 it to make a type specimen book. It has survived not only
                 five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged. It was
                   popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently
                     with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum.`,
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
                skills: [{
                    name: 'Node',
                    rate: 7
                },
                {
                    name: 'NoSQL',
                    rate: 7
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 3 without url details',
            async () => {
                const data = {
                    step: 3,
                    'projectDetails': [
                        {
                            'name': 'CodeMonk',
                            'description': `Lorem Ipsum is simply dummy text of the
                            printing and typesetting industry. Lorem Ipsum has been
                            the industry's standard dummy text ever since the 1500s,
                             when an unknown printer took a galley of type and scrambled
                             it to make a type specimen book. It has survived not only
                             five centuries, but also the leap into electronic
                              typesetting, remaining essentially unchanged. It was
                               popularised in the 1960s with the release of Letraset
                                sheets containing Lorem Ipsum passages, and more recently
                                 with desktop publishing software like Aldus PageMaker
                                  including versions of Lorem Ipsum.`,
                            'role': 'Developer',
                            'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time',
                            employer: 'Codemonk',
                            industry: 'Apparel & Fashion',
                            skills: [{ name: 'Android', rate: 9 }]
                        }
                    ]
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 3 with valid project details', async () => {
            const data = {
                step: 3,
                'projectDetails': [
                    {
                        'name': 'CodeMonk',
                        'url': 'https://www.codemonk.ai',
                        'description': `Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s,
                         when an unknown printer took a galley of type and scrambled
                         it to make a type specimen book. It has survived not only
                         five centuries, but also the leap into electronic
                          typesetting, remaining essentially unchanged. It was
                           popularised in the 1960s with the release of Letraset
                            sheets containing Lorem Ipsum passages, and more recently
                             with desktop publishing software like Aldus PageMaker
                              including versions of Lorem Ipsum.`,
                        'role': 'Developer',
                        'keyAchievements': 'I delivered the sprint 1 and sprint 2 on time',
                        employer: 'Codemonk',
                        industry: 'Apparel & Fashion',
                        skills: [{ name: 'Android', rate: 9 }]
                    }
                ]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 4 with valid work details', async () => {
            const data = {
                step: 4,
                workExperience: [{
                    'jobTitle': 'Software Engineer',
                    'employmentType': 'Fulltime',
                    'employer': 'codemonk',
                    'country': 'India',
                    'startDate': '14/06/2019',
                    'endDate': '14/06/2020',
                    'shortDescription': 'I was software developer'
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be not able to save step 5 with education details as empty',
            async () => {
                const data = {
                    step: 5,
                    educationDetails: []
                };

                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be not able to save step 5 with certificate details as empty',
            async () => {
                const data = {
                    step: 5,
                    certificateDetails: []
                };

                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);

            });

        it('As a user, I should be able to save step 5 with only education details',
            async () => {
                const data = {
                    step: 5,
                    educationDetails: [{
                        'degreeLevel': 'Master’s or Higher',
                        'degreeTitle': 'Master in Computer Application',
                        'collegeName': 'IETE, New Delhi',
                        'country': 'India',
                        startYear: 2019,
                        endYear: 2020
                    },
                    {
                        'degreeLevel': 'Bachelor’s',
                        'degreeTitle': 'Bachelor in Computer Science',
                        'collegeName': 'IETE, New Delhi',
                        'country': 'India',
                        startYear: 2019,
                        endYear: 2020
                    }],
                    certificateDetails: []
                };

                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);

            });

        it('As a user, I should be able to save step 5 with only certificate Details',
            async () => {
                const data = {
                    step: 5,
                    educationDetails: [],
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
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);

            });

        it('As a user, I should be able to save step 6 with only work preference details',
            async () => {
                const data = {
                    step: 6,
                    'workPreference': ['fulltime']
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 6 without teamPreference details',
            async () => {
                const data = {
                    step: 6,
                    'assignments': [
                        'occational-site-visit'
                    ],
                    'workPreference': ['fulltime'],
                    'availability': true,
                    'unavailability': [
                        {
                            'date': '2020-04-06T05:16:08.717Z',
                            'key': 'full'
                        },
                        {
                            'date': '2020-04-07T05:16:08.717Z',
                            'key': 'first'
                        },
                        {
                            'date': '2020-04-08T05:16:08.717Z',
                            'key': 'second'
                        }
                    ]
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 6 with valid preference details', async () => {
            const data = {
                step: 6,
                'teamPreference': [
                    'individuals'
                ],
                'assignments': [
                    'occational-site-visit'
                ],
                'workPreference': ['fulltime'],
                'availability': true,
                'unavailability': [
                    {
                        'date': '2020-04-06T05:16:08.717Z',
                        'key': 'full'
                    },
                    {
                        'date': '2020-04-07T05:16:08.717Z',
                        'key': 'first'
                    },
                    {
                        'date': '2020-04-08T05:16:08.717Z',
                        'key': 'second'
                    }
                ]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 7 with valid pay curreny', async () => {
            const data = {
                step: 7,
                currency: 'USD'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 7 with valid pay rate per hour', async () => {
            const data = {
                step: 7,
                ratePerHour: 40
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 7 with valid pay billing type', async () => {
            const data = {
                step: 7,
                billingType: 'freelancer'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/save-later')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to save step 7 with valid pay billing type company',
            async () => {
                const data = {
                    step: 7,
                    billingType: 'company',
                    companyName: 'Soft Silicon',
                    companyregisteredNumber: 'ABC',
                    companyPincode: '380015',
                    companyCity: 'Ahmedabad',
                    companyCountry: 'India',
                    companyAddressLineOne: 'Some Building',
                    companyProfessionInsuranceValue: 1000000,
                    companyPublicInsurancesValue: 5000000,
                    companyEmployerInsuranceValue: 10000000
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 7 with valid pay type paypal',
            async () => {
                const data = {
                    step: 7,
                    payType: 'paypal',
                    payPalEmail: 'hitesh@paypal.com'
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

        it('As a user, I should be able to save step 7 with valid pay type paypal',
            async () => {
                const data = {
                    step: 7,
                    payType: 'bank',
                    bankName: 'Kotak',
                    bankAccountNumber: 'ABC',
                    bankCode: 'KT1234'
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/save-later')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});



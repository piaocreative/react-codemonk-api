const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseEditDetails');
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

const talentSkippedWithoutRate = {
    id: '5f155e494a4f44532bcdef69',
    email: 'skippedwithoutrate@mailinator.com'
};
const requestSkippedRatePayload = {
    token: jwt.sign(talentSkippedWithoutRate, process.env.JWT_SECRET, tokenOptionalInfo)
};

const talentSkippedProof = {
    id: '5f06d38bdc117a399f7c295e',
    email: 'skippedwitoutproof@mailinator.com'
};
const requestSkippedProofPayload = {
    token: jwt.sign(talentSkippedProof, process.env.JWT_SECRET, tokenOptionalInfo)
};

const talentSkippedPay = {
    id: '5f8ee575c4336d791164610e',
    email: 'skippedwithoutpay@mailinator.com'
};
const requestSkippedPayPayload = {
    token: jwt.sign(talentSkippedPay, process.env.JWT_SECRET, tokenOptionalInfo)
};

const talentSkippedBilling = {
    id: '5f57356134ed4c3769525b2c',
    email: 'skippedwithoutbilling@mailinator.com'
};
const requestSkippedBillingPayload = {
    token: jwt.sign(talentSkippedBilling, process.env.JWT_SECRET, tokenOptionalInfo)
};

const talentSkippedFull = {
    id: '5fb610d69a7dce1aaf7b419d',
    email: 'fullto@mailinator.com'
};
const requestSkippedFullPayload = {
    token: jwt.sign(talentSkippedFull, process.env.JWT_SECRET, tokenOptionalInfo)
};

const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyUserPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

let userDetails;

describe('Talent Profile', () => {
    try {
        // Check all validation;
        TestCase.editDetails.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/profile')
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

        it('As a user, I should be able to edit valid personal data without addressLineTwo', async () => {
            const data = {
                firstName: 'Talent',
                lastName: 'Last',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                countryCode: '91',
                phoneNumber: '9925061220',
                dob: '31/08/1986',
                gender: 'Male',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/profile')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit valid personal data', async () => {
            const data = {
                firstName: 'Talent',
                lastName: 'Last',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                countryCode: '91',
                phoneNumber: '9925061220',
                dob: '31/08/1986',
                gender: 'Male',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/profile')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I shouldn\'t be able to edit valid personal data of other talent', async () => {
            const data = {
                talentId: '5f083c352a7908662c334531',
                firstName: 'Talent',
                lastName: 'Last',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                countryCode: '91',
                phoneNumber: '9925061220',
                dob: '31/08/1986',
                gender: 'Male',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/profile')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency, I shouldn\'t be able to edit valid personal data of other talent', async () => {
            const data = {
                talentId: '5f083c352a7908662c334532',
                firstName: 'Talent',
                lastName: 'Last',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                countryCode: '91',
                phoneNumber: '9925061220',
                dob: '31/08/1986',
                gender: 'Male',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/profile')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency, I should be able to edit valid personal data of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                firstName: 'Talent',
                lastName: 'Last',
                primaryRole: 'Developer',
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                countryCode: '91',
                phoneNumber: '9925061220',
                dob: '31/08/1986',
                gender: 'Male',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/profile')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent professional summary', () => {
    try {
        TestCase.summary.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/summary')
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

        it('As a user, I should be able to edit professional summary', async () => {
            const data = {
                professionalSummary: `<p>Lorem ipsum dolor sit amet, nonumes voluptatum mel ea,
                    cu case ceteros cum. Novum commodo malorum vix ut. Dolores consequuntur in ius,
                    sale electram dissentiunt quo te. Cu duo omnes invidunt, eos eu mucius fabellas.
                     Stet facilis ius te, quando voluptatibus eos in. Ad vix mundi alterum,
                     integre urbanitas intellegam vix in.</p>`
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/summary')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should be able to edit professional summary on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                professionalSummary: `<p>Lorem ipsum dolor sit amet, nonumes voluptatum mel ea,
                    cu case ceteros cum. Novum commodo malorum vix ut. Dolores consequuntur in ius,
                    sale electram dissentiunt quo te. Cu duo omnes invidunt, eos eu mucius fabellas.
                     Stet facilis ius te, quando voluptatibus eos in. Ad vix mundi alterum,
                     integre urbanitas intellegam vix in.</p>`
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/summary')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent rate', () => {
    try {

        // Check all validation;
        TestCase.rate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/rate')
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

        it('As a user, I should be able to edit valid curreny and rate per hour', async () => {
            const data = {
                currency: 'USD',
                ratePerHour: 40
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/rate')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit valid curreny and rate per hour for skipped user', async () => {
            const data = {
                currency: 'USD',
                ratePerHour: 40
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/rate')
                .set({ Authorization: requestSkippedProofPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit valid curreny and rate per hour for skipped user', async () => {
            const data = {
                currency: 'USD',
                ratePerHour: 40
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/rate')
                .set({ Authorization: requestSkippedPayPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should be able to edit valid curreny and rate per hour on behalf of talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                currency: 'USD',
                ratePerHour: 40
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/rate')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent skills', () => {
    try {
        TestCase.skills.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/skills')
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

        it('As a user, I should be able to edit valid skill data', async () => {
            const data = {
                skills: [{
                    name: 'Node',
                    rate: 7
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/skills')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit valid multiple skills', async () => {
            const data = {
                skills: [{
                    name: 'Node',
                    rate: 7
                }, {
                    name: 'NoSQL',
                    rate: 8
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/skills')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should be able to edit valid skills on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                skills: [{
                    name: 'Node',
                    rate: 7
                }, {
                    name: 'NoSQL',
                    rate: 8
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/skills')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent professional url', () => {
    try {
        TestCase.professionalURL.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/professional-url')
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

        it('As a user, I should able to edit linkedInUrl', async () => {
            const data = {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/professional-url')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should able to edit gitHubUrl', async () => {
            const data = {
                gitHubUrl: 'https://github.com/bill-gates'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/professional-url')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should able to edit stackOverFlowUrl', async () => {
            const data = {
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/professional-url')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should able to edit Professional Url', async () => {
            const data = {
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/professional-url')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should able to edit Professional Url on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                linkedInUrl: 'https://www.linkedin.com/in/williamhgates',
                gitHubUrl: 'https://github.com/bill-gates',
                stackOverFlowUrl: 'https://stackoverflow.com/users/22656/jon-skeet'
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/professional-url')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent preference profile', () => {
    try {
        TestCase.preferences.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/preferences')
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

        it('As a user, I should be able to edit only teamPreference', async () => {
            const data = {
                workPreference: ['fulltime'],
                teamPreference: ['individuals', 'small-team'],
                companyCultures: ["Trust"],
                companyType: ["start-up"],
                industries: ["Business Supplies and Equipment"],
                preferredProjectDuration: ["short-term"]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/preferences')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit only assignments', async () => {
            const data = {
                workPreference: ['fulltime'],
                assignments: ['occational-site-visit', 'remote-only'],
                companyCultures: ["Trust"],
                companyType: ["start-up"],
                industries: ["Business Supplies and Equipment"],
                preferredProjectDuration: ["short-term"]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/preferences')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit only workPreference', async () => {
            const data = {
                workPreference: ['fulltime'],
                companyCultures: ["Trust"],
                companyType: ["start-up"],
                industries: ["Business Supplies and Equipment"],
                preferredProjectDuration: ["short-term"]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/preferences')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit valid Preference', async () => {
            const data = {
                teamPreference: ['individuals', 'small-team'],
                assignments: ['occational-site-visit', 'remote-only'],
                workPreference: ['fulltime'],
                companyCultures: ["Trust"],
                companyType: ["start-up"],
                industries: ["Business Supplies and Equipment"],
                preferredProjectDuration: ["short-term"]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/preferences')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agnecy, I should be able to edit valid Preference on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                teamPreference: ['individuals', 'small-team'],
                assignments: ['occational-site-visit', 'remote-only'],
                workPreference: ['fulltime'],
                companyCultures: ["Trust"],
                companyType: ["start-up"],
                industries: ["Business Supplies and Equipment"],
                preferredProjectDuration: ["short-term"]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/preferences')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent availability profile', () => {
    try {
        TestCase.availability.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/availability')
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

        it('As a user, I should be able to edit valid availability', async () => {
            const data = {
                availability: true,
                unavailability: [{
                    date: '2020-04-06T05:16:08.717Z',
                    key: 'full'
                }, {
                    date: '2020-04-07T05:16:08.717Z',
                    key: 'first'
                }, {
                    date: '2020-04-06T05:16:08.717Z',
                    key: 'second'
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/availability')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit valid availability', async () => {
            const data = {
                availability: true,
                unavailability: []
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/availability')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit valid availability', async () => {
            const data = {
                availability: false
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/availability')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should be able to edit valid availability on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                availability: false
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/availability')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent project add', () => {
    try {
        TestCase.addProject.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/talent/project')
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

        it('As a user, I should able to add project details', async () => {
            const data = {
                name: 'CodeMonk',
                url: 'http://www.codemonk.ai',
                description: `Lorem Ipsum is simply dummy text of the
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
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                skills: [{ name: "Amazon Kinesis", rate: 5 }]
            };
            const res = await request(process.env.BASE_URL)
                .post('/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should able to add project details without url', async () => {
            const data = {
                name: 'CodeMonk',
                url: '',
                description: `Lorem Ipsum is simply dummy text of the
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
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                skills: [{ name: "Amazon Kinesis", rate: 5 }]
            };
            const res = await request(process.env.BASE_URL)
                .post('/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to add project details without url on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                name: 'CodeMonk',
                url: '',
                description: `Lorem Ipsum is simply dummy text of the
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
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                skills: [{ name: "Amazon Kinesis", rate: 5 }]
            };
            const res = await request(process.env.BASE_URL)
                .post('/talent/project')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent project edit', () => {
    try {
        TestCase.editProject.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/project')
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

        it('As a user, I should able to edit project details using id', async () => {
            const data = {
                _id: userDetails.projectDetails[0]._id,
                name: 'New CodeMonk',
                url: 'http://www.newcodemonk.ai',
                description: `Lorem Ipsum is simply dummy text of the
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
                role: 'Product Manager',
                keyAchievements: 'I delivered edit project as well',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                skills: [{ name: "Amazon Kinesis", rate: 5 }]
            };

            const res = await request(process.env.BASE_URL)
                .put('/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should able to edit project details using id', async () => {
            const data = {
                _id: userDetails.projectDetails[0]._id,
                name: 'New CodeMonk',
                description: `Lorem Ipsum is simply dummy text of the
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
                role: 'Product Manager',
                keyAchievements: 'I delivered edit project as well',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                skills: [{ name: "Amazon Kinesis", rate: 5 }]
            };

            const res = await request(process.env.BASE_URL)
                .put('/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to edit project details using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5f8eedf1c4336d7911646112',
                name: 'New CodeMonk',
                description: `Lorem Ipsum is simply dummy text of the
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
                role: 'Product Manager',
                keyAchievements: 'I delivered edit project as well',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                skills: [{ name: "Amazon Kinesis", rate: 5 }]
            };

            const res = await request(process.env.BASE_URL)
                .put('/talent/project')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent project delete', () => {
    try {
        TestCase.deleteProject.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/talent/project')
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

        it('As a user, I should not be able to delete project details using  wrong id', async () => {
            const data = {
                _id: 'ABC'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should able to delete project details using id', async () => {
            const data = {
                _id: userDetails.projectDetails[1]._id
            };

            const res = await request(process.env.BASE_URL)
                .delete('/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to delete project details using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5f8eedf1c4336d7911646112'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/talent/project')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent work experience add', () => {
    try {
        TestCase.addWorkExperience.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/talent/work-experience')
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
                .post('/talent/work-experience')
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
                .post('/talent/work-experience')
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
                .post('/talent/work-experience')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent work experience edit', () => {
    try {
        TestCase.editWorkExperience.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/work-experience')
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
                .put('/talent/work-experience')
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
                .put('/talent/work-experience')
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
                .put('/talent/work-experience')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent work experience delete', () => {
    try {
        TestCase.deleteWorkExperience.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/talent/work-experience')
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
                .delete('/talent/work-experience')
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
                .delete('/talent/work-experience')
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
                .delete('/talent/work-experience')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent education add', () => {
    try {
        TestCase.addEducation.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/talent/education')
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
                .post('/talent/education')
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
                .post('/talent/education')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent education edit', () => {
    try {
        TestCase.editEducation.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/education')
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
                .put('/talent/education')
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
                .put('/talent/education')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent education delete', () => {
    try {
        TestCase.deleteEducation.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/talent/education')
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
                .delete('/talent/education')
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
                .delete('/talent/education')
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
                .delete('/talent/education')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent certificate add', () => {
    try {
        TestCase.addCertificate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/talent/certificate')
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
                .post('/talent/certificate')
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
                .post('/talent/certificate')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent certificate edit', () => {
    try {
        TestCase.editCertificate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/certificate')
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
                .put('/talent/certificate')
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
                .put('/talent/certificate')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent certificate delete', () => {
    try {
        TestCase.deleteCertificate.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/talent/certificate')
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
                .delete('/talent/certificate')
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
                .delete('/talent/certificate')
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
                .delete('/talent/certificate')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent billing details', () => {
    try {
        TestCase.billing.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/billing')
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

        it('As a user, I should be able to edit valid billing freelancer',
            async () => {
                const data = {
                    billingType: 'freelancer'
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/billing')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
                userDetails = res.body.data;
            });

        it('As a user, I should be able to change my id proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/talent/billing')
                .set({ Authorization: requestPayload.token })
                .attach('idProof', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'freelancer');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/talent/billing')
                .set({ Authorization: requestPayload.token })
                .attach('addressProof', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'freelancer');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to edit valid billing company',
            async () => {
                const data = {
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
                    .put('/talent/billing')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
                userDetails = res.body.data;
            });

        it('As a user, I should be able to edit valid billing company with optional fields',
            async () => {
                const data = {
                    billingType: 'company',
                    companyName: 'Soft Silicon',
                    companyregisteredNumber: 'ABC',
                    companyPincode: '380015',
                    companyCity: 'Ahmedabad',
                    companyCountry: 'India',
                    companyAddressLineOne: 'Some Building',
                    companyAddressLineTwo: 'Some Street',
                    website: 'http://www.codemonk.ai',
                    vatNumber: 'ABC'
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/billing')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
                userDetails = res.body.data;
            });

        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/talent/billing')
                .set({ Authorization: requestPayload.token })
                .attach('companyIncorporationCertificateUrl', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'company')
                .field('companyName', 'Soft Silicon')
                .field('companyregisteredNumber', 'ABC')
                .field('companyPincode', '380015')
                .field('companyCity', 'Ahmedabad')
                .field('companyCountry', 'India')
                .field('companyAddressLineOne', 'Some Building')
                .field('companyProfessionInsuranceValue', 1000000)
                .field('companyPublicInsurancesValue', 2000000)
                .field('companyEmployerInsuranceValue', 5000000)
                .field('companyAddressLineTwo', 'Some Street')
                .field('website', 'http://www.codemonk.ai')
                .field('vatNumber', 'ABC');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/talent/billing')
                .set({ Authorization: requestPayload.token })
                .attach('companyVatRegistrationCertificateUrl', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'company')
                .field('companyName', 'Soft Silicon')
                .field('companyregisteredNumber', 'ABC')
                .field('companyPincode', '380015')
                .field('companyCity', 'Ahmedabad')
                .field('companyCountry', 'India')
                .field('companyAddressLineOne', 'Some Building')
                .field('companyProfessionInsuranceValue', 1000000)
                .field('companyPublicInsurancesValue', 2000000)
                .field('companyEmployerInsuranceValue', 5000000)
                .field('companyAddressLineTwo', 'Some Street')
                .field('website', 'http://www.codemonk.ai')
                .field('vatNumber', 'ABC');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/talent/billing')
                .set({ Authorization: requestPayload.token })
                .attach('companyInsuranceDocumentUrl', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'company')
                .field('companyName', 'Soft Silicon')
                .field('companyregisteredNumber', 'ABC')
                .field('companyPincode', '380015')
                .field('companyCity', 'Ahmedabad')
                .field('companyCountry', 'India')
                .field('companyAddressLineOne', 'Some Building')
                .field('companyProfessionInsuranceValue', 1000000)
                .field('companyPublicInsurancesValue', 2000000)
                .field('companyEmployerInsuranceValue', 5000000)
                .field('companyAddressLineTwo', 'Some Street')
                .field('website', 'http://www.codemonk.ai')
                .field('vatNumber', 'ABC');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/talent/billing')
                .set({ Authorization: requestSkippedFullPayload.token })
                .attach('companyVatRegistrationCertificateUrl', 'test/mock-data/proper_pdf.pdf')
                .attach('companyInsuranceDocumentUrl', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'company')
                .field('companyName', 'Soft Silicon')
                .field('companyregisteredNumber', 'ABC')
                .field('companyPincode', '380015')
                .field('companyCity', 'Ahmedabad')
                .field('companyCountry', 'India')
                .field('companyAddressLineOne', 'Some Building')
                .field('companyProfessionInsuranceValue', 1000000)
                .field('companyPublicInsurancesValue', 2000000)
                .field('companyEmployerInsuranceValue', 5000000)
                .field('companyAddressLineTwo', 'Some Street')
                .field('website', 'http://www.codemonk.ai')
                .field('vatNumber', 'ABC');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change skipped billing type as freelancer', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/talent/billing')
                .set({ Authorization: requestSkippedFullPayload.token })
                .field('billingType', 'freelancer');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change skipped billing type as freelancer', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/talent/billing')
                .set({ Authorization: requestSkippedRatePayload.token })
                .field('billingType', 'freelancer');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent payment Profile', () => {
    try {
        TestCase.payment.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/payment')
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

        it('As a user, I should be able to edit valid payment paypal',
            async () => {
                const data = {
                    payType: 'paypal',
                    payPalEmail: 'hitesh@paypal.com',
                    oldPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/payment')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
                userDetails = res.body.data;
            });

        it('As a user, I should be able to edit valid payment bank',
            async () => {
                const data = {
                    payType: 'bank',
                    bankName: 'Kotak',
                    bankAccountNumber: 'ABC',
                    bankCode: 'KT1234',
                    oldPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
                };
                const res = await request(process.env.BASE_URL)
                    .put('/talent/payment')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
                userDetails = res.body.data;
            });

        it('As a user, I should be able to edit valid payment paypal', async () => {
            const data = {
                payType: 'paypal',
                payPalEmail: 'example@example.com',
                oldPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/payment')
                .set({ Authorization: requestSkippedBillingPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to edit valid payment bank', async () => {
            const data = {
                payType: 'bank',
                bankName: 'Kotak',
                bankAccountNumber: 'ABC',
                bankCode: 'KT1234',
                oldPassword: '8776f108e247ab1e2b323042c049c266407c81fbad41bde1e8dfc1bb66fd267e',
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/payment')
                .set({ Authorization: requestSkippedBillingPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent languages', () => {
    try {
        TestCase.languages.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/languages')
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

        it('As a user, I should be able to edit valid skill data', async () => {
            const data = {
                languages: [
                    {
                        name: 'fr',
                        rate: 7
                    }
                ]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/languages')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should be able to edit valid multiple languages', async () => {
            const data = {
                languages: [{
                    name: 'en',
                    rate: 7
                }, {
                    name: 'fr',
                    rate: 8
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/languages')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should be able to edit valid multiple languages on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                languages: [{
                    name: 'en',
                    rate: 7
                }, {
                    name: 'fr',
                    rate: 8
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/talent/languages')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

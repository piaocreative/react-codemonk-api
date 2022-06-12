/* eslint-disable quotes */
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./clientSignUp');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// client User
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Client Basic Profile : about-you', () => {
    try {
        TestCase.aboutYou.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/client/about-you')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a client I can save my personal details', (done) => {
            const personalDetails = {
                firstName: 'Client first',
                lastName: 'Client last',
                countryCode: '91',
                phoneNumber: '9925061220',
                jobTitle: 'CTO',
                jobRole: 'hiring-manager'
            };

            request(process.env.BASE_URL)
                .put('/client/about-you')
                .set({ Authorization: clientPayload.token })
                .send(personalDetails)
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


describe('Client Company Detail', () => {
    try {
        TestCase.aboutCompany.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/client/about-company')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a client I can save my company detail without logo, without websites', (done) => {
            const aboutCompany = {
                name: "CodeMonk",
                brand: "job portal",
                registeredNumber: "123456",
                vatNumber: "5557575",
                industry: "Accounting",
                teamPreference: "individuals",
                cultures: "Quality,Trust",
                companyType:'start-up'
            };

            request(process.env.BASE_URL)
                .put('/client/about-company')
                .set({ Authorization: clientPayload.token })
                .send(aboutCompany)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a client I can save my company detail without logo, with websites', (done) => {
            const aboutCompany = {
                name: "CodeMonk",
                brand: "job portal",
                registeredNumber: "123456",
                vatNumber: "5557575",
                industry: "Accounting",
                teamPreference: "individuals",
                cultures: "Quality,Trust",
                companyType:'start-up',
                portfolioUrl: "https://codemonk.ai",
                linkedInUrl: "https://www.linkedin.com/in/codemonk/",
                gitHubUrl: "https://github.com/ghgie",
                stackOverFlowUrl: "https://stackoverflow.com/users/13700877/gggg",
                behanceUrl: "https://www.behance.net/gallery",
                dribbbleUrl: "https://dribbble.com/shots/17074273-ZeroWaste-Web-Design-for-Recycling-Company"
            };

            request(process.env.BASE_URL)
                .put('/client/about-company')
                .set({ Authorization: clientPayload.token })
                .send(aboutCompany)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a client I can save my company detail with invalid filetype logo, with websites', (done) => {
            const aboutCompany = {
                name: "CodeMonk",
                brand: "job portal",
                registeredNumber: "123456",
                vatNumber: "5557575",
                industry: "Accounting",
                companyType:'start-up',
                teamPreference: "individuals",
                cultures: "Quality,Trust",
                portfolioUrl: "https://codemonk.ai",
                linkedInUrl: "https://www.linkedin.com/in/codemonk/",
                gitHubUrl: "https://github.com/ghgie",
                stackOverFlowUrl: "https://stackoverflow.com/users/13700877/gggg",
                behanceUrl: "https://www.behance.net/gallery",
                dribbbleUrl: "https://dribbble.com/shots/17074273-ZeroWaste-Web-Design-for-Recycling-Company"
            };

            request(process.env.BASE_URL)
                .put('/client/about-company')
                .set({ Authorization: clientPayload.token })
                .attach('logo', 'test/mock-data/proper_pdf.pdf')
                .field(aboutCompany)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 0);
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });

        it('As a client I can save my company detail with lesser than minimum filesize logo, with websites', (done) => {
            const aboutCompany = {
                name: "CodeMonk",
                brand: "job portal",
                registeredNumber: "123456",
                vatNumber: "5557575",
                industry: "Accounting",
                companyType:'start-up',
                teamPreference: "individuals",
                cultures: "Quality,Trust",
                portfolioUrl: "https://codemonk.ai",
                linkedInUrl: "https://www.linkedin.com/in/codemonk/",
                gitHubUrl: "https://github.com/ghgie",
                stackOverFlowUrl: "https://stackoverflow.com/users/13700877/gggg",
                behanceUrl: "https://www.behance.net/gallery",
                dribbbleUrl: "https://dribbble.com/shots/17074273-ZeroWaste-Web-Design-for-Recycling-Company"
            };

            request(process.env.BASE_URL)
                .put('/client/about-company')
                .set({ Authorization: clientPayload.token })
                .attach('logo', 'test/mock-data/3kb_file.png')
                .field(aboutCompany)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 0);
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });

        it('As a client I can save my company detail with greater than maximun filesize logo, with websites', (done) => {
            const aboutCompany = {
                name: "CodeMonk",
                brand: "job portal",
                registeredNumber: "123456",
                vatNumber: "5557575",
                industry: "Accounting",
                companyType:'start-up',
                teamPreference: "individuals",
                cultures: "Quality,Trust",
                portfolioUrl: "https://codemonk.ai",
                linkedInUrl: "https://www.linkedin.com/in/codemonk/",
                gitHubUrl: "https://github.com/ghgie",
                stackOverFlowUrl: "https://stackoverflow.com/users/13700877/gggg",
                behanceUrl: "https://www.behance.net/gallery",
                dribbbleUrl: "https://dribbble.com/shots/17074273-ZeroWaste-Web-Design-for-Recycling-Company"
            };

            request(process.env.BASE_URL)
                .put('/client/about-company')
                .set({ Authorization: clientPayload.token })
                .attach('logo', 'test/mock-data/5_8mb_file.jpeg')
                .field(aboutCompany)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 0);
                    assert.equal(res.statusCode, 400);
                    done();
                });
        });

        it('As a client I can save my company detail with valid logo, with websites', (done) => {
            const aboutCompany = {
                name: "CodeMonk",
                brand: "job portal",
                registeredNumber: "123456",
                vatNumber: "5557575",
                industry: "Accounting",
                companyType:'start-up',
                teamPreference: "individuals",
                cultures: "Quality,Trust",
                portfolioUrl: "https://codemonk.ai",
                linkedInUrl: "https://www.linkedin.com/in/codemonk/",
                gitHubUrl: "https://github.com/ghgie",
                stackOverFlowUrl: "https://stackoverflow.com/users/13700877/gggg",
                behanceUrl: "https://www.behance.net/gallery",
                dribbbleUrl: "https://dribbble.com/shots/17074273-ZeroWaste-Web-Design-for-Recycling-Company"
            };

            request(process.env.BASE_URL)
                .put('/client/about-company')
                .set({ Authorization: clientPayload.token })
                .attach('logo', 'test/mock-data/valid_profile_pic.jpg')
                .field(aboutCompany)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, 1);
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Client company location', () => {
    try {
        TestCase.companyLocation.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/client/company-location')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a client I can save my company location without addressline2', (done) => {
            const companyLocation = {
                locationName: "Subsidary",
                postcode: "380015",
                country: "India",
                addressLineOne: "Some House, Some Buildding",
                city: "Ahmedabad",
                state: "Gujarat",
                timezone: "Asia/Kolkata"
            };

            request(process.env.BASE_URL)
                .post('/client/company-location')
                .set({ Authorization: clientPayload.token })
                .send(companyLocation)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a client I can save my company location with addressline2', (done) => {
            const companyLocation = {
                locationName: "Subsidary",
                postcode: "380015",
                country: "India",
                addressLineOne: "Some House, Some Buildding",
                addressLineTwo: "Some Road, Somewhere",
                city: "Ahmedabad",
                state: "Gujarat",
                timezone: "Asia/Kolkata"
            };

            request(process.env.BASE_URL)
                .post('/client/company-location')
                .set({ Authorization: clientPayload.token })
                .send(companyLocation)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a client I can save my company location without state', (done) => {
            const companyLocation = {
                locationName: "Subsidary",
                postcode: "380015",
                country: "India",
                addressLineOne: "Some House, Some Buildding",
                addressLineTwo: "Some Road, Somewhere",
                city: "Ahmedabad",
                timezone: "Asia/Kolkata"
            };

            request(process.env.BASE_URL)
                .post('/client/company-location')
                .set({ Authorization: clientPayload.token })
                .send(companyLocation)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a client I can save my company location with state', (done) => {
            const companyLocation = {
                locationName: "Subsidary",
                postcode: "380015",
                country: "India",
                addressLineOne: "Some House, Some Buildding",
                addressLineTwo: "Some Road, Somewhere",
                city: "Ahmedabad",
                state: "Gujarat",
                timezone: "Asia/Kolkata"
            };

            request(process.env.BASE_URL)
                .post('/client/company-location')
                .set({ Authorization: clientPayload.token })
                .send(companyLocation)
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


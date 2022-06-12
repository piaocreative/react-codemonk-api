const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAgencyProfile');
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
const agencyUserInvalid = {
    id: '5f4754eb3fc8842306a8220d',
    email: 'agencystart@mailinator.com'
};
const requestPayloadAgencyInvalid = {
    token: jwt.sign(agencyUserInvalid, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Agency without talents User
const agencyWithoutTalentUser = {
    id: '5f4e0dcbae932622307694d1',
    email: 'agencyuser@yopmail.com'
};
const agencyWithoutTalentPayload = {
    token: jwt.sign(agencyWithoutTalentUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Agency profile details', () => {
    try {
        TestCase.profile.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/profile')
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

        it('As a agency I can\'t save my profile with invalid file', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: requestPayload.token })
                .attach('tradingLogo', 'test/mock-data/proper_pdf.pdf')
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CTO')
                .field('countryCode', '91')
                .field('phoneNumber', '9925461330')
                .field('agencyName', 'Dream')
                .field('registeredNumber', 'ABC')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', 'Adddress two')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                    consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can\'t save my profile with invalid less than 5 kb file', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: requestPayload.token })
                .attach('tradingLogo', 'test/mock-data/3kb_file.png')
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CEO')
                .field('countryCode', '91')
                .field('phoneNumber', '9925461330')
                .field('agencyName', 'Dream')
                .field('registeredNumber', 'ABC')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', 'Adddress two')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                    consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a user I can\'t save my profile with invalid more than 5 mb file', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: requestPayload.token })
                .attach('tradingLogo', 'test/mock-data/5_8mb_file.jpeg')
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CEO')
                .field('countryCode', '91')
                .field('phoneNumber', '9925461330')
                .field('agencyName', 'Dream')
                .field('registeredNumber', 'ABC')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', 'Adddress two')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                    consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can\'t edit my profile with company name that exists with other agency', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: requestPayload.token })
                .attach('tradingLogo', 'test/mock-data/valid_profile_pic.jpg')
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CEO')
                .field('agencyName', 'my agency')
                .field('registeredNumber', 'ABC')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', 'Adddress two')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                    consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingAddressLineTwo', 'trading address two')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can\'t edit my profile with company register number that exists with other agency', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: requestPayload.token })
                .attach('tradingLogo', 'test/mock-data/valid_profile_pic.jpg')
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CEO')
                .field('agencyName', 'Some new name')
                .field('registeredNumber', 'ABCC')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', 'Adddress two')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                    consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingAddressLineTwo', 'trading address two')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can\'t save my profile without file that previously saved', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: requestPayloadAgencyInvalid.token })
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CEO')
                .field('countryCode', '91')
                .field('phoneNumber', '9925461330')
                .field('agencyName', 'New name that')
                .field('registeredNumber', 'ABCDE')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', 'Adddress two')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                    consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingAddressLineTwo', 'trading address two')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can\'t save my profile with already existing agency', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: requestPayload.token })
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CEO')
                .field('countryCode', '91')
                .field('phoneNumber', '9925461330')
                .field('agencyName', 'Dream11')
                .field('registeredNumber', 'ABCC')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', 'Adddress two')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                        consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingAddressLineTwo', 'trading address two')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);

        });

        it('As a agency I can edit my profile without file that previously saved', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: agencyWithoutTalentPayload.token })
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CEO')
                .field('agencyName', 'Dream11')
                .field('registeredNumber', 'DR11')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', 'Adddress two')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                    consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingAddressLineTwo', 'trading address two')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can edit my profile with valid', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: agencyWithoutTalentPayload.token })
                .attach('tradingLogo', 'test/mock-data/valid_profile_pic.jpg')
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CEO')
                .field('agencyName', 'Dream11')
                .field('registeredNumber', 'DR11')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', 'Adddress two')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                    consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingAddressLineTwo', 'trading address two')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can save my profile', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/profile')
                .set({ Authorization: requestPayload.token })
                .attach('tradingLogo', 'test/mock-data/valid_profile_pic.jpg')
                .field('firstName', 'Test~')
                .field('lastName', 'Tes\'me')
                .field('designation', 'CEO')
                .field('countryCode', '91')
                .field('phoneNumber', '9925461330')
                .field('agencyName', 'Dream1')
                .field('registeredNumber', 'ABCEF')
                .field('agencyPostCode', '380011')
                .field('agencyAddressLineOne', 'Adddress one')
                .field('agencyAddressLineTwo', '')
                .field('agencyCity', 'Ahmedabad')
                .field('agencyCountry', 'India')
                .field('duns', 'Some number')
                .field('agencyVatNumber', 'CS22')
                .field('tradingName', 'Trade')
                .field('tradingWebsite', 'http://google.com')
                .field('tradingSummary', `Lorem ipsum dolor sit amet,
                    consectetur adipiscingLorem ipsum dolor sit amet, consectetur adipiscing`)
                .field('tradingPostCode', '380091')
                .field('tradingAddressLineOne', 'trading address one')
                .field('tradingCity', 'Ahmedabad')
                .field('tradingCountry', 'India');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./clientProfile');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const trueDataStatus = 1;
const falseDataStatus = 0;
// client User
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// client User
const client1user = {
    id: '5f083c352a7908662c334534',
    email: 'clientonboard@mailinator.com'
};
const client1Payload = {
    token: jwt.sign(client1user, process.env.JWT_SECRET, tokenOptionalInfo)
};

// client 2 User
const client2user = {
    id: '5f2d3e4eba0dae43224ae38d',
    email: 'clientcompanyprofile@mailinator.com'
};

const client2Payload = {
    token: jwt.sign(client2user, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Client Save Phone number and send OTP', () => {
    try {
        TestCase.phoneNumber.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/client/phone-number')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a client user I can save my phone number', async () => {
            const phoneDetails = {
                countryCode: '91',
                phoneNumber: '9925461330'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/phone-number')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I can request to change my phone number', async () => {
            const phoneDetails = {
                countryCode: '91',
                phoneNumber: '9925461330'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/phone-number')
                .set({ Authorization: client2Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });


    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Client verify phone number OTP', () => {
    try {
        TestCase.verifyPhoneNumber.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/client/verify-phone-number')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a client user I can verify my phone number', async () => {
            const phoneDetails = {
                otp: 123456
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/verify-phone-number')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I can verify to change my phone number', async () => {
            const phoneDetails = {
                otp: 123456
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/verify-phone-number')
                .set({ Authorization: client2Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Client profile individual save-later for step2 profile', () => {
    try {
        it('As a client user I shouldn\'t any date with only step number', async () => {
            const phoneDetails = {
                step: 2
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I shouldn\'t save invalid type', async () => {
            const phoneDetails = {
                step: 2,
                type: 'invalid'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, falseDataStatus);
            assert.equal(res.statusCode, 400);
        });

        it('As a client user I should save individual type', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual first name', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual',
                firstName: 'Client\'sChange'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual last name', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual',
                firstName: 'Client\'sChange',
                lastName: 'Client\'s Last'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual job title', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual',
                firstName: 'Client\'sChange',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual post code', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual',
                firstName: 'Client\'sChange',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual timezone', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual',
                firstName: 'Client\'sChange',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual address line one', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual',
                firstName: 'Client\'sChange',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual address line two', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual',
                firstName: 'Client\'sChange',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual city', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual',
                firstName: 'Client\'sChange',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                city: 'San Francisco'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual country', async () => {
            const phoneDetails = {
                step: 2,
                type: 'individual',
                firstName: 'Client\'sChange',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                city: 'Ahmedabad',
                country: 'India'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company as empty', async () => {
            const phoneDetails = {
                step: 2,
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company name', async () => {
            const phoneDetails = {
                step: 2,
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company register number', async () => {
            const phoneDetails = {
                step: 2,
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company postcode', async () => {
            const phoneDetails = {
                step: 2,
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company city', async () => {
            const phoneDetails = {
                step: 2,
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company country', async () => {
            const phoneDetails = {
                step: 2,
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company address line one', async () => {
            const phoneDetails = {
                step: 2,
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company address line two', async () => {
            const phoneDetails = {
                step: 2,
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Street'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company country', async () => {
            const phoneDetails = {
                step: 2,
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: '380015',
                authorityTimeZone: 'Asia/Kolkata',
                authorityAddressLineOne: 'Some House, Some Buildding',
                authorityAddressLineTwo: 'Some Road, Somewhere',
                authorityCity: 'Ahmedabad',
                authorityCountry: 'India'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Client profile individual before and after onboarding', () => {
    try {
        TestCase.profile.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/client/profile')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a client user I should save individual details', async () => {
            const phoneDetails = {
                type: 'individual',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: '',
                city: 'Ahmedabad',
                country: 'India'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user I should update client profile company authority address line one', async () => {
            const phoneDetails = {
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                type: 'company',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: '380015',
                authorityTimeZone: 'Asia/Kolkata',
                authorityAddressLineOne: ''
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user I should update client profile company authority post code', async () => {
            const phoneDetails = {
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                type: 'company',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: ''
            };
            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user I should update client profile company authority time zone as blank', async () => {
            const phoneDetails = {
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                type: 'company',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: '380015',
                authorityTimeZone: ''
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user I should update client profile company authority city', async () => {
            const phoneDetails = {
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                type: 'company',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: '380015',
                authorityTimeZone: 'Asia/Kolkata',
                authorityAddressLineOne: 'Some House, Some Buildding',
                authorityAddressLineTwo: 'Some Road, Somewhere',
                authorityCity: ''
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user I should update client profile without address and authority address', async () => {
            const phoneDetails = {
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                type: 'company',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user I should validate client profile company authority country as blank', async () => {
            const phoneDetails = {
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                type: 'company',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: '380015',
                authorityTimeZone: 'Asia/Kolkata',
                authorityAddressLineOne: 'Some House, Some Buildding',
                authorityAddressLineTwo: 'Some Road, Somewhere',
                authorityCity: 'Ahmedabad',
                authorityCountry: ''
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user I should validate client profile company authority country as blank', async () => {
            const phoneDetails = {
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                addressLineOne: 'Some House, Some Buildding',
                city: 'Ahmedabad',
                country: 'India',
                timeZone: 'Asia/Kolkata',
                type: 'company',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: '380015',
                authorityTimeZone: 'Asia/Kolkata',
                authorityAddressLineOne: 'Some House, Some Buildding',
                authorityAddressLineTwo: 'Some Road, Somewhere',
                authorityCity: 'Ahmedabad',
                authorityCountry: ''
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });




        it('As a client user I should save individual details after signup back and again save', async () => {
            const phoneDetails = {
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: '380015',
                authorityTimeZone: 'Asia/Kolkata',
                authorityAddressLineOne: 'Some House, Some Buildding',
                authorityAddressLineTwo: 'Some Road, Somewhere',
                authorityCity: 'Ahmedabad',
                authorityCountry: 'India'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: client1Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual details after signup back and again save for client2', async () => {
            const phoneDetails = {
                type: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: '',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: '380015',
                authorityTimeZone: 'Asia/Kolkata',
                authorityAddressLineOne: 'Some House, Some Buildding',
                authorityAddressLineTwo: '',
                authorityCity: 'Ahmedabad',
                authorityCountry: 'India'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/profile')
                .set({ Authorization: client2Payload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Client billing details save later for step3', () => {
    try {
        it('As a client user I should save billing partial details payType as bank', async () => {
            const billingDetails = {
                step: 3,
                payType: 'bank'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save billing partial details payType as bank and it\'s name', async () => {
            const billingDetails = {
                step: 3,
                payType: 'bank',
                bankName: 'Kotak'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save billing partial details payType as bank, bank name and acc number', async () => {
            const billingDetails = {
                step: 3,
                payType: 'bank',
                bankName: 'Kotak',
                bankAccountNumber: 'ABC'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save billing partial details payType as bank complete', async () => {
            const billingDetails = {
                step: 3,
                payType: 'bank',
                bankName: 'Kotak',
                bankAccountNumber: 'ABC',
                bankCode: 'KT11234'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save billing partial details paytype as paypal', async () => {
            const billingDetails = {
                step: 3,
                payType: 'paypal'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save billing partial details paytype complete object', async () => {
            const billingDetails = {
                step: 3,
                payType: 'paypal',
                payPalEmail: 'hitesh@paypal.com'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save individual billing type', async () => {
            const phoneDetails = {
                step: 3,
                billingType: 'individual'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save billing partial details type as company', async () => {
            const billingDetails = {
                step: 3,
                billingType: 'company'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save company details as save compnay details with insureance values', async () => {
            const phoneDetails = {
                step: 3,
                billingType: 'company',
                firstName: 'Client\'sFirst',
                lastName: 'Client\'s Last',
                jobTitle: 'CTO',
                postcode: '380015',
                timeZone: 'Asia/Kolkata',
                addressLineOne: 'Some House, Some Buildding',
                addressLineTwo: 'Some Road, Somewhere',
                city: 'Ahmedabad',
                country: 'India',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                companyAddressLineTwo: 'Some Stree',
                companyProfessionInsuranceValue: 1000000,
                companyPublicInsurancesValue: 5000000,
                companyEmployerInsuranceValue: 2000000,
                website: 'http://www.codemonk.ai',
                vatNumber: 'ABC',
                authorityFirstName: 'Authority\'sFirst',
                authorityLastName: 'authority\'s Last',
                authorityEmail: 'authrity@example.com',
                authorityCountryCode: '91',
                authorityPhoneNumber: '9925061220',
                authorityJobTitle: 'CEO',
                authorityPostcode: '380015',
                authorityTimeZone: 'Asia/Kolkata',
                authorityAddressLineOne: 'Some House, Some Buildding',
                authorityAddressLineTwo: 'Some Road, Somewhere',
                authorityCity: 'Ahmedabad',
                authorityCountry: 'India'
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: clientPayload.token })
                .send(phoneDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save billing partial details type as company companyProfessionInsuranceValue', async () => {
            const billingDetails = {
                step: 3,
                billingType: 'company',
                companyProfessionInsuranceValue: 1000000
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save billing partial details type as company companyPublicInsurancesValue', async () => {
            const billingDetails = {
                step: 3,
                billingType: 'company',
                companyPublicInsurancesValue: 5000000
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should save billing partial details type as company companyEmployerInsuranceValue', async () => {
            const billingDetails = {
                step: 3,
                billingType: 'company',
                companyEmployerInsuranceValue: 2000000
            };

            const res = await request(process.env.BASE_URL)
                .put('/client/save-later')
                .set({ Authorization: client1Payload.token })
                .send(billingDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

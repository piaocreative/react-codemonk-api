const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentBasicProfile');
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

describe('Talent Basic Profile', () => {
    try {
        TestCase.basicProfile.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/personal-details')
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

        it('As a user I can save my personal details with new create language name', (done) => {
            const personalDetails = {
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
                    name: 'demo',
                    rate: 8
                }],
                timeZone: 'Asia/Kolkata'
            };

            request(process.env.BASE_URL)
                .put('/talent/personal-details')
                .set({ Authorization: requestPayload.token })
                .send(personalDetails)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user I can save my personal details', (done) => {
            const personalDetails = {
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
                    name: 'en',
                    rate: 8
                }, {
                    name: 'fr',
                    rate: 7
                }],
                timeZone: 'Asia/Kolkata'
            };

            request(process.env.BASE_URL)
                .put('/talent/personal-details')
                .set({ Authorization: requestPayload.token })
                .send(personalDetails)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a user I can save my personal details', (done) => {
            const personalDetails = {
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
                    name: 'en',
                    rate: 8
                }],
                timeZone: 'Asia/Kolkata'
            };

            request(process.env.BASE_URL)
                .put('/talent/personal-details')
                .set({ Authorization: requestPayload.token })
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

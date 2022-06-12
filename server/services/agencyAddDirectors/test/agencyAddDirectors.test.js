const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAddDirectors');
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
describe('Agency update directors / shareholders ', () => {
    try {
        TestCase.directors.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/directors')
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

        it('As a agency I can saving certificate and credentials details with one Director', async () => {
            const directors = {
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
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/directors')
                .send(directors)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can saving certificate and credentials details with two Director', async () => {
            const directors = {
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
                .put('/agency/directors')
                .send(directors)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can saving certificate and credentials details with a Director and a share holder', async () => {
            const directors = {
                directors: [{
                    firstName: 'Director one',
                    lastName: 'Director oneLast',
                    dob: '01/12/2000',
                    postcode: '380013',
                    addressLineOne: 'Some House, Some Buildding',
                    addressLineTwo: 'Some Road, Somewhere',
                    city: 'Ahmedabad',
                    country: 'India',
                    isDirector: true,
                    isShareHolder: false
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
                    isShareHolder: true,
                    holdingPercent: 25
                }]
            };
            const res = await request(process.env.BASE_URL)
                .put('/agency/directors')
                .send(directors)
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


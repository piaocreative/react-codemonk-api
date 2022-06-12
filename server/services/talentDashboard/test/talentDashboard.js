const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentDashboard');
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

describe('Talent dashbaord', () => {
    try {
        TestCase.inviteEmail.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/talent/invite')
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

        it('As a talent, I should invite my unique friend that are not on platform',
            async () => {
                const data = {
                    emails: [{
                        name: 'My Friend',
                        email: 'test@yopmail.com'
                    },
                    {
                        email: 'test@yopmail.com'
                    },
                    {
                        email:  'talent@mailinator.com'
                    }]
                };
                const res = await request(process.env.BASE_URL)
                    .post('/talent/invite')
                    .set({ Authorization: requestPayload.token })
                    .send(data);
                expect(res.body.status).to.be.status;
                assert.equal(res.statusCode, 200);
            });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


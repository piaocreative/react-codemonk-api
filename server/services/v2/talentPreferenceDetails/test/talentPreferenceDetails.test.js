const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentPreferenceProfile');
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

// Agency Talent
const agencyTalent = {
    id: '5f523e4a7e416a76f64ea921',
    email: 'talent2@mailinator.com'
};
const agencyTalentPayload = {
    token: jwt.sign(agencyTalent, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Talent Preference Details (V2)', () => {
    try {
        TestCase.preferenceDetails.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/v2/talent/preference-details')
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

        it('As a freelancer talent, I can save my preference details with team preference and assignments', (done) => {
            const preferenceDetails = {
                teamPreference: ['individuals', 'small-team'],
                assignments: ['occational-site-visit', 'remote-only'],
                workPreference: ['fulltime'],
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term']
            };

            request(process.env.BASE_URL)
                .put('/v2/talent/preference-details')
                .set({ Authorization: requestPayload.token })
                .send(preferenceDetails)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a freelancer talent, I can save my preference details without team preference and assignments', (done) => {
            const preferenceDetails = {
                workPreference: ['fulltime'],
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term']
            };

            request(process.env.BASE_URL)
                .put('/v2/talent/preference-details')
                .set({ Authorization: requestPayload.token })
                .send(preferenceDetails)
                .end((err, res) => {
                    expect(res.body.status).to.be.status;
                    assert.equal(res.statusCode, 200);
                    done();
                });
        });

        it('As a agency talent, I can save my preference details', (done) => {
            const preferenceDetails = {
                workPreference: ['fulltime'],
                'industries': ['Accounting'],
                'companyCultures': ['Quality', 'Trust'],
                'companyType': ['start-up'],
                'preferredProjectDuration': ['short-term']
            };

            request(process.env.BASE_URL)
                .put('/v2/talent/preference-details')
                .set({ Authorization: agencyTalentPayload.token })
                .send(preferenceDetails)
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

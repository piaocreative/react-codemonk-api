const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./jobPostapply');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// Talent user
const talent = {
    id: '5f083c352a7908662c334532',
    email: 'talent@mailinator.com'
};
const talentPayload = {
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

describe('Talent apply job post(v2)', () => {
    try {
        TestCase.applyJobPost.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/v2/job-post/apply')
                    .set({ Authorization: talentPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a agency talent, I cann\'t apply a job post because I already applied', async () => {
            const data = {
                jobPostId: '5f97c8f0a350e416d1a5ebae',
                notesOfMotivation: 'The eligible candidate for the job brief.',
                availableJoiningDate:  '01/12/2021'
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/job-post/apply')
                .send(data)
                .set({ Authorization: agencyTalentPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a talent, I can apply a job post', async () => {
            const data = {
                jobPostId: '61aa0cffaad5a25c272753ef',
                notesOfMotivation: 'The eligible candidate for the job brief.',
                availableJoiningDate:  '01/12/2021'
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/job-post/apply')
                .send(data)
                .set({ Authorization: talentPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentUploadCV');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
// Talent User
const talentUser = {
    id: '5f171359677e5734addddcab',
    email: 'uploadcv@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(talentUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Talent upload CV', () => {
    try {
        TestCase.talentUploadCV.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/cv')
                    .set({ Authorization: requestPayload.token })
                    .attach(data.options.fileName, data.options.filePath)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a talent I can upload my cv', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/talent/cv')
                .attach('talentCV', 'test/mock-data/resume.pdf')
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


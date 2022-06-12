const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');

chai.use(chaiHttp);
describe('Certifications', () => {
    it('As an admin I can get list of certifications', (done) => {
        request(process.env.BASE_URL)
            .get('/talent/certifications')
            .query({
                q: 'a'
            })
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, 1);
                done();
            });
    });
});

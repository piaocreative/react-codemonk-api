const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const { addSkill } = require('../companyCulturesServices');

chai.use(chaiHttp);
describe('Company Cultures', () => {
    it('As an Admin I can get list of company cultures', (done) => {
        request(process.env.BASE_URL)
            .get('/talent/companycultures')
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

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const { addSkill } = require('../skillServices');

chai.use(chaiHttp);
describe('Skills', () => {
    it('As an Admin I can get list of skills', (done) => {
        request(process.env.BASE_URL)
            .get('/talent/skills')
            .query({
                q: 'a'
            })
            .end((err, res) => {
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, 1);
                done();
            });
    });

    it('As an Admin/Talent I can create skill', async function () {
        const skills = await addSkill(['Create Node'])
        expect(skills).to.be.an('array');
        expect(skills.map(a => a.name)).to.have.deep.members(['Create Node']);
    });
});

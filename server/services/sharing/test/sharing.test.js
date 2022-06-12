const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);

describe('Talent details', () => {
    it('As a unauthorised user I can get error when access using wrong short URL.', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/c/123456');
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 404);
    });
    it('As a unauthorised user I can access short URL', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/c/abc123');
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });
});


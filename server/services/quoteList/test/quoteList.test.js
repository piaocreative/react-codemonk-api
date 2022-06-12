const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};

// Agency User
const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};


describe('Agency get quote list', () => {
    it('As a agency, I should get true newQuotes tag when I have not visited list of quotes', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/user/details')
            .set({ Authorization: agencyPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });

    it('As a agency, I can my get quote list based on query params', async () => {
        const query = {
            limit: 10,
            page: 2
        };
        const res = await request(process.env.BASE_URL)
            .get('/quote/list')
            .set({ Authorization: agencyPayload.token })
            .query(query);
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });

    it('As a agency, I should get false newQuotes tag when I have not visited list of quotes', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/user/details')
            .set({ Authorization: agencyPayload.token });
        expect(res.body.status).to.be.status;
        expect(res.body.newQuote).to.false;
        assert.equal(res.statusCode, 200);
    });

    it('As a agency, I can my get quote list with default options', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/quote/list')
            .set({ Authorization: agencyPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });

    it('As an Admin, I can my get quote list with default options', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/quote/list')
            .set({ Authorization: adminPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });

    it('As an Admin, I can my get quote list with search and filter all new quotes', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/quote/list')
            .query({
                q: 'a',
                status: 1
            })
            .set({ Authorization: adminPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });

    it('As an Admin, I can my get quote list with filter reponse recieved', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/quote/list')
            .query({
                status: 2
            })
            .set({ Authorization: adminPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });

    it('As an Admin, I can my get quote list with filter which project is allocated', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/quote/list')
            .query({
                status: 3
            })
            .set({ Authorization: adminPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });

    it('As an Admin, I can my get quote list which status is rejected', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/quote/list')
            .query({
                status: 4
            })
            .set({ Authorization: adminPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });
});


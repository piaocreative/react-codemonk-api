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
// Client User
// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const requestPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Admin Dashboard', () => {
    it('As an Admin, I can get list of Dashboard KPIs', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/admin/kpis')
            .set({ Authorization: requestPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });
    it('As an Admin, I can get list of Dashboard KPIs with time all filter', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/admin/kpis')
            .query({
                time: 'all'
            })
            .set({ Authorization: requestPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });
    it('As an Admin, I can get list of Dashboard KPIs with time today filter', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/admin/kpis')
            .query({
                time: 'today'
            })
            .set({ Authorization: requestPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });
    it('As an Admin, I can get list of Dashboard KPIs with time this week filter', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/admin/kpis')
            .query({
                time: 'week'
            })
            .set({ Authorization: requestPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });
    it('As an Admin, I can get list of Dashboard KPIs with time month filter', async () => {
        const res = await request(process.env.BASE_URL)
            .get('/admin/kpis')
            .query({
                time: 'month'
            })
            .set({ Authorization: requestPayload.token });
        expect(res.body.status).to.be.status;
        assert.equal(res.statusCode, 200);
    });
});


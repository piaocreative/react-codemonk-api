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
// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const requestPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// client User
const agencyUser = {
    id: '5f5335172317791e189ac32d',
    email: 'agencybefore@mailinator.com'
};
const agencyPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Admin get talent list search by name', () => {
    try {
        it('As a admin, I can get talent list based on query params', async () => {
            const query = {
                q: ''
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/by-name')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a admin, I can get talent list based on query params', async () => {
            const query = {
                q: 'talent'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/by-name')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As an agency, I can get talent list based on query params', async () => {
            const query = {
                q: 'talent'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/by-name')
                .set({ Authorization: agencyPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


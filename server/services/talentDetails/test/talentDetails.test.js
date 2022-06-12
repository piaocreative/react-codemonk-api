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
// client User
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminRequestPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyRequestPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Talent details', () => {
    try {
        it('As a client I get talents details not existing', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/details/5f083c352a7908662c334531')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a client I get talents details', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/details/5f083c352a7908662c334532')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I get talents details not existing', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/details/5f523e4a7e416a76f64ea920')
                .set({ Authorization: adminRequestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a agency I get talents details not existing', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/details/5f083e2f069b6c6a7de3a950')
                .set({ Authorization: agencyRequestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I get talents details not existing', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/details/5f083c352a7908662c334532')
                .set({ Authorization: agencyRequestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

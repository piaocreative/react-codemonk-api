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
// Talent User
const talentUser = {
    id: '62139448f1245be0da3a7360',
    email: 'downloaddocument@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(talentUser, process.env.JWT_SECRET, tokenOptionalInfo)
};


describe('Talent Download details', () => {
    try {
        it('As a talent, I should be downloaded the id proof', async () => {
            const query = {
                type: 'idProof'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/talent/download/document')
                .query(query)
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a talent, I should be downloaded the address proof', async () => {
            const query = {
                type: 'addressProof'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/talent/download/document')
                .query(query)
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a talent, I should be downloaded the company certification', async () => {
            const query = {
                type: 'companyIncorporationCertificateUrl'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/talent/download/document')
                .query(query)
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a talent, I should be downloaded the vat registration certification', async () => {
            const query = {
                type: 'companyVatRegistrationCertificateUrl'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/talent/download/document')
                .query(query)
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a talent, I should be downloaded the company insurance certification', async () => {
            const query = {
                type: 'companyInsuranceDocumentUrl'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/talent/download/document')
                .query(query)
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a talent, I should not be downloaded which are not supported type', async () => {
            const query = {
                type: 'unknown'
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/talent/download/document')
                .query(query)
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a talent, I need to send the type', async () => {
            const query = {
                type: ''
            };
            const res = await request(process.env.BASE_URL)
                .get('/v2/talent/download/document')
                .query(query)
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

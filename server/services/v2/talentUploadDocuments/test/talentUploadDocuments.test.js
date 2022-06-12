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
const talent = {
    id: '5f083c352a7908662c334532',
    email: 'talent@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(talent, process.env.JWT_SECRET, tokenOptionalInfo)
};

const talentSkippedFull = {
    id: '5fb610d69a7dce1aaf7b419d',
    email: 'fullto@mailinator.com'
};
const requestSkippedFullPayload = {
    token: jwt.sign(talentSkippedFull, process.env.JWT_SECRET, tokenOptionalInfo)
};


let userDetails;

describe('Talent billing details(v2)', () => {
    try {
        it('As a user, I should be able to change my id proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/upload-documents')
                .set({ Authorization: requestPayload.token })
                .attach('idProof', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'freelancer');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/upload-documents')
                .set({ Authorization: requestPayload.token })
                .attach('addressProof', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'freelancer');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

       
        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/upload-documents')
                .set({ Authorization: requestPayload.token })
                .attach('companyIncorporationCertificateUrl', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'company');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/upload-documents')
                .set({ Authorization: requestPayload.token })
                .attach('companyVatRegistrationCertificateUrl', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'company');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/upload-documents')
                .set({ Authorization: requestPayload.token })
                .attach('companyInsuranceDocumentUrl', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'company');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a user, I should be able to change my address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/upload-documents')
                .set({ Authorization: requestSkippedFullPayload.token })
                .attach('companyVatRegistrationCertificateUrl', 'test/mock-data/proper_pdf.pdf')
                .attach('companyInsuranceDocumentUrl', 'test/mock-data/proper_pdf.pdf')
                .field('billingType', 'company');
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

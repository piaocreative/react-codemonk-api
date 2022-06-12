const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./agencyDocuments');
chai.use(chaiHttp);
const trueDataStatus = 1;
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};

// client agency
const agencyagency = {
    id: '5f5335172317791e189ac32d',
    email: 'agencybefore@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(agencyagency, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Agency upload agency documents', () => {
    try {
        TestCase.documentUpload.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/documents')
                    .set({ Authorization: requestPayload.token })
                    .attach(data.options.fileName, data.options.filePath)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a agency, I should upload valid id proof zero', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .attach('idProof0', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should upload valid address proof zero', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .attach('addressProof0', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should upload valid id proof one', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .attach('idProof1', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should upload valid address proof one', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .attach('addressProof1', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should upload valid company incorporation certificate proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .attach('companyIncorporationCertificateUrl', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should upload valid company tax registration certificate', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .attach('companyTaxRegistrationCertificateUrl', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should upload valid company utility proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .attach('utilityBillDocumentUrl', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Agency delete agency documents', () => {
    try {
        TestCase.documentDelete.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/agency/documents')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a agency, I should delete agency id proof zero', async () => {
            const formData = {
                document: 'idProof0'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .send(formData);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should delete agency id proof one', async () => {
            const formData = {
                document: 'idProof1'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .send(formData);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should delete valid address proof zero', async () => {
            const formData = {
                document: 'addressProof0'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .send(formData);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should delete valid address proof one', async () => {
            const formData = {
                document: 'addressProof1'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .send(formData);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should delete company incorporation certificate proof', async () => {
            const formData = {
                document: 'companyIncorporationCertificateUrl'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .send(formData);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should delete company tax registration proof', async () => {
            const formData = {
                document: 'companyTaxRegistrationCertificateUrl'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .send(formData);
            assert.equal(res.statusCode, 200);
        });

        it('As a agency, I should delete  company insurance document proof', async () => {
            const formData = {
                document: 'utilityBillDocumentUrl'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/agency/documents')
                .set({ Authorization: requestPayload.token })
                .send(formData);
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

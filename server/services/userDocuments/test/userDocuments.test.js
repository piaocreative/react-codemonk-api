const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./userDocuments');
chai.use(chaiHttp);
const trueDataStatus = 1;
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};

// Talent
const talent = {
    id: '5f083c352a7908662c334532',
    email: 'talent@mailinator.com'
};
const requestPayloadTalent = {
    token: jwt.sign(talent, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Client
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const requestPayloadClient = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};


describe('Talent upload user documents', () => {
    try {
        TestCase.documentUpload.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/user/documents')
                    .set({ Authorization: requestPayloadTalent.token })
                    .attach(data.options.fileName, data.options.filePath)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should upload valid id proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .attach('idProof', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should upload valid address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .attach('addressProof', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should upload valid company incorporation certificate proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .attach('companyIncorporationCertificateUrl', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should upload valid company vat registration certificate', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .attach('companyVatRegistrationCertificateUrl', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should upload valid company insurance document proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .attach('companyInsuranceDocumentUrl', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent delete user documents', () => {
    try {
        TestCase.documentDelete.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/user/documents')
                    .set({ Authorization: requestPayloadTalent.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should delete user id proof', async () => {
            const formData = {
                document: 'idProof'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should delete valid address proof', async () => {
            const formData = {
                document: 'addressProof'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should delete company incorporation certificate proof', async () => {
            const formData = {
                document: 'companyIncorporationCertificateUrl'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should delete company vat registration proof', async () => {
            const formData = {
                document: 'companyVatRegistrationCertificateUrl'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should delete  company insurance document proof', async () => {
            const formData = {
                document: 'companyInsuranceDocumentUrl'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadTalent.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Client upload user documents', () => {
    try {
        TestCase.documentUpload.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/user/documents')
                    .set({ Authorization: requestPayloadClient.token })
                    .attach(data.options.fileName, data.options.filePath)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should upload valid id proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .attach('idProof', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should upload valid address proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .attach('addressProof', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should upload valid company incorporation certificate proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .attach('companyIncorporationCertificateUrl', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should upload valid company vat registration certificate', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .attach('companyVatRegistrationCertificateUrl', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should upload valid company insurance document proof', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .attach('companyInsuranceDocumentUrl', 'test/mock-data/proper_pdf.pdf');
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Client delete user documents', () => {
    try {
        TestCase.documentDelete.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/user/documents')
                    .set({ Authorization: requestPayloadClient.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should delete user id proof', async () => {
            const formData = {
                document: 'idProof'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should delete valid address proof', async () => {
            const formData = {
                document: 'addressProof'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should delete company incorporation certificate proof', async () => {
            const formData = {
                document: 'companyIncorporationCertificateUrl'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should delete company vat registration proof', async () => {
            const formData = {
                document: 'companyVatRegistrationCertificateUrl'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should delete  company insurance document proof', async () => {
            const formData = {
                document: 'companyInsuranceDocumentUrl'
            };
            const res = await request(process.env.BASE_URL)
                .delete('/user/documents')
                .set({ Authorization: requestPayloadClient.token })
                .send(formData);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

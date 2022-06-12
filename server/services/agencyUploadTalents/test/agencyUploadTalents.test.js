const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseAgencyUploadTalents');
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
const requestPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Agency User
const agencyOnboardUser = {
    id: '5f4754eb3fc8842306a8220d',
    email: 'agencystart@mailinator.com'
};
const agencyOnBoardPayload = {
    token: jwt.sign(agencyOnboardUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Agency upload talents', () => {
    try {
        TestCase.talentsUpload.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/agency/talents')
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

        it('As a agency I can upload talents using csv but no data', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/talents')
                .attach('agency-talents', 'test/mock-data/talents.csv')
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can\'t upload talents using csv but no data', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/talents')
                .attach('agency-talents', 'test/mock-data/talents_empty.csv')
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can\'t upload talents using csv but invalid data', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/talents')
                .attach('agency-talents', 'test/mock-data/talents_invalid_name.csv')
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a agency I can upload talents using xls', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/talents')
                .attach('agency-talents', 'test/mock-data/talents.xls')
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can upload talents using xlsx', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/talents')
                .attach('agency-talents', 'test/mock-data/talents.xlsx')
                .set({ Authorization: requestPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a agency I can upload talents using xlsx', async () => {
            const res = await request(process.env.BASE_URL)
                .put('/agency/talents')
                .attach('agency-talents', 'test/mock-data/talents_onboard.csv')
                .set({ Authorization: agencyOnBoardPayload.token });

            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


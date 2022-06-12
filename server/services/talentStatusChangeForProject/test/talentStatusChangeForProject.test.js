const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const TestCase = require('./talentStatusChangeForProject');
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
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Project status change', () => {
    try {
        TestCase.changeStatus.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/project/talent/status')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a admin I can change talent project status', async () => {
            const params = {
                projectId: '5f631e56d37cbb4801f0fa45',
                talentId: '5f523e4a7e416a76f64ea920',
                status: 1,
                startDate: '01/02/2020',
                endDate: '01/02/2020'
            };
            const res = await request(process.env.BASE_URL)
                .put('/project/talent/status')
                .set({ Authorization: requestPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status', async () => {
            const params = {
                projectId: '5f631e56d37cbb4801f0fa45',
                talentId: '5f523e4a7e416a76f64ea920',
                status: 1,
                startDate: '01/02/2020',
                endDate: '01/02/2020'
            };
            const res = await request(process.env.BASE_URL)
                .put('/project/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


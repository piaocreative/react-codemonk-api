const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const TestCase = require('./talentStatusChange');
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

describe('Job brief status change', () => {
    try {
        TestCase.changeStatus.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/v2/job-post/talent/status')
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
                jobPostId: '620e5aea12e4011366db2e22',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 4
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: requestPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status', async () => {
            const params = {
                jobPostId: '62136faa8fa779d61a4ba40e',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 4
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to interview from applied', async () => {
            const params = {
                jobPostId: '62137624a1cdd9261d08020c',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 2
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to shortlisted from applied', async () => {
            const params = {
                jobPostId: '621376a0ee1499e321261e4a',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 3
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to hired from applied', async () => {
            const params = {
                jobPostId: '6213773ac7bf345da8c511da',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 4
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to reject from applied', async () => {
            const params = {
                jobPostId: '621377882d492bfb3b437f0b',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 5
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a client I can change talent project status to shortlist from interview', async () => {
            const params = {
                jobPostId: '62137903a2221ae3d0504f3a',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 3
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to hire from interview', async () => {
            const params = {
                jobPostId: '62137927fb4521cf3a36cad3',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 4
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to reject from interview', async () => {
            const params = {
                jobPostId: '6213793b7d0525d9c5b4543a',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 5
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to hire from the shortlisted', async () => {
            const params = {
                jobPostId: '6213798ee97caacfbe4aa582',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 4
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to reject from the shortlisted', async () => {
            const params = {
                jobPostId: '621379e465505c173d25486f',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 5
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to hire from the hired', async () => {
            const params = {
                jobPostId: '62137abc2f0465c43b4c7389',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 4
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to reject from the hired', async () => {
            const params = {
                jobPostId: '62137af041e47a00ae23c12f',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 5
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a client I can change talent project status to interview from the rejected', async () => {
            const params = {
                jobPostId: '62137b555e740ea3ae1ad9cc',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 2
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I can change talent project status to shortlist from the rejected', async () => {
            const params = {
                jobPostId: '62137b6dc0ae36ce396a9347',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 3
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a client I can change talent project status to hire from the rejected', async () => {
            const params = {
                jobPostId: '62137b84a98b8092634034e9',
                talentId: '5f523e4a7e416a76f64ea921',
                status: 4
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/job-post/talent/status')
                .set({ Authorization: clientPayload.token })
                .send(params);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


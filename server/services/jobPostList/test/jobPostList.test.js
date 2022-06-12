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

const client = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};

const clientRequestPayload = {
    token: jwt.sign(client, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Talent get job post list', () => {
    try {


        it('As a Talent, I should get true newBriefs tag when I have not visited any of latest briefs', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            expect(res.body.newBrief).to.true;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get job post list based on query params', async () => {
            const query = {
                status: -1,
                limit: 10,
                page: 2
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get job post list based on query params', async () => {
            const query = {
                limit: 10,
                page: 2
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get job post list based on query params', async () => {
            const query = {
                status: 1
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get job post list based on query params', async () => {
            const query = {
                limit: 10,
                page: 2,
                sort: 'recommend'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        }).timeout(10000);;

        it('As a Talent, I can my get job post list based on workPreference filter', async () => {
            const query = {
                workPreference: 'fulltime,parttime-weekdays-am'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get job post list based on teamPreference filter', async () => {
            const query = {
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get job post list based on assignments filter', async () => {
            const query = {
                assignments: 'remote-only,occational-site-visit',
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get job post list based on assignments filter', async () => {
            const query = {
                datePosted: 'Last 7 days',
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get job post list based on assignments filter', async () => {
            const query = {
                datePosted: 'Last 24 hours',
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a Talent, I can my get job post list based on assignments filter', async () => {
            const query = {
                datePosted: 'Last 14 days',
                applied: 'Applied'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a Talent, I can my get job post list based on assignments filter', async () => {
            const query = {
                datePosted: 'Last 30 days',
                applied: 'Not Applied'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a Talent, I should get false newBriefs tag after visit brief list', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/user/details')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            expect(res.body.newBrief).to.false;
            assert.equal(res.statusCode, 200);
        });

        it('As a Client, I able to get list of briefs created by me', async () => {
            const query = {
                status: 1,
                expertise: 'Beginner - 0 - 2 yrs'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: clientRequestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Client, I able to search by project name', async () => {
            const query = {
                status: 1,
                expertise: 'Beginner - 0 - 2 yrs',
                q: 'a'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: clientRequestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Admin, I able to search jobpost by client email', async () => {
            const query = {
                q: '@mailinator.com'
            };
            const res = await request(process.env.BASE_URL)
                .get('/job-post/list')
                .set({ Authorization: adminPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


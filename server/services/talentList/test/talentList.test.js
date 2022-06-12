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
describe('Admin get talent list', () => {
    try {
        it('As a admin, I can get talents list based on query params', async () => {
            const query = {
                page: 1,
                limit: 20
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I can get talents list based on query params', async () => {
            const query = {
                status: 1
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I can get talents list of unregister with name search', async () => {
            const query = {
                status: 0,
                q: 'talent'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I can filter using multiple user status', async () => {
            const query = {
                status: '0,1,2'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I fetch talents with primary role', async () => {
            const query = {
                status: 3,
                role: 'Product Manager'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I fetch talents with year of experience', async () => {
            const query = {
                yearsOfExperience: 'Junior - 2 - 5 yrs'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I fetch talents with team preference', async () => {
            const query = {
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I fetch talents with work preference', async () => {
            const query = {
                workPreference: ['fulltime']
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I fetch talents with assignment type', async () => {
            const query = {
                assignment: 'remote-only'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I fetch talents with availability as no', async () => {
            const query = {
                availability: 'invalid'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I fetch talents with availability as no', async () => {
            const query = {
                availability: 'no'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });
        it('As a admin I fetch talents with availability', async () => {
            const query = {
                availability: 'yes'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I fetch talents with location country', async () => {
            const query = {
                location: 'India,United Kingdom'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I fetch talents with degree level', async () => {
            const query = {
                degreeLevel: 'Bachelor’s'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a admin I fetch talents with language', async () => {
            const query = {
                language: 'en,fr'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I fetch talents with search using skills', async () => {
            const query = {
                q: 'Developer'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


        it('As a admin I fetch talents using skills filter', async () => {
            const query = {
                skills: 'Developer,Android',
                sort: JSON.stringify({ email: -1 })
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I fetch talents using day rate', async () => {
            const query = {
                dayRate: '0,100'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I fetch talents using currency', async () => {
            const query = {
                currency: 'GBP'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I fetch talents using industry', async () => {
            const query = {
                industry: 'Accounting'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I fetch talents using DISC profile', async () => {
            const query = {
                discProfile: 'D - Style'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I fetch talents using team working', async () => {
            const query = {
                teamWorking: 'Team Player'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I fetch talents using company culture', async () => {
            const query = {
                companyCultures: 'Accountability'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin I fetch talents using certification', async () => {
            const query = {
                certification: 'ADOBE CERTIFIED ASSOCIATE (ACA)'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Admin get talent log history', () => {
    try {
        it('As a admin I fetch talents log history', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/log/61f96ee2d9c606b9675500df')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }

});


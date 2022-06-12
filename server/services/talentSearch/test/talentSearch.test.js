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
describe('Talent Project details', () => {
    try {
        it('As a user I fetch all talents', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch all talents', async () => {
            const query = {
                page: 3,
                limit: 20
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with primary role', async () => {
            const query = {
                role: 'Product Manager'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with year of experience', async () => {
            const query = {
                yearsOfExperience: 'Junior - 2 - 5 yrs'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with team preference', async () => {
            const query = {
                teamPreference: 'individuals'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with work preference', async () => {
            const query = {
                workPreference: ['fulltime']
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with assignment type', async () => {
            const query = {
                assignment: 'remote-only'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with availability as no', async () => {
            const query = {
                availability: 'invalid'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with availability as no', async () => {
            const query = {
                availability: 'no'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });
        it('As a user I fetch talents with availability', async () => {
            const query = {
                availability: 'yes'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with location country', async () => {
            const query = {
                location: 'India,United Kingdom'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with degree level', async () => {
            const query = {
                degreeLevel: 'Bachelor’s'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);

        });

        it('As a user I fetch talents with language', async () => {
            const query = {
                language: 'en,fr'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user I fetch talents with search using skills', async () => {
            const query = {
                q: 'Developer'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user I fetch talents with skills filter', async () => {
            const query = {
                skills: 'Developer,Android',
                sort: JSON.stringify({ email: -1 })
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a client I fetch recommended talents with skills filter sorted by recommended rank from python', async () => {
            const query = {
                skills: 'Developer,Android',
                sort: JSON.stringify({ recommend: 1 }),
                jobId: '60d0aa5c9bd946556f56c10e'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


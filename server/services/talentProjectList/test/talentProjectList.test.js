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


// client User
const agencyUser = {
    id: '5f5335172317791e189ac32d',
    email: 'agencybefore@mailinator.com'
};
const agencyPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Talent get project list', () => {
    try {
        it('As a Talent, I can my get project list based on query params', async () => {
            const query = {
                status: -1,
                limit: 10,
                page: 2
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/project/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get project list based on query params', async () => {
            const query = {
                limit: 10,
                page: 2
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/project/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get project list based on query params', async () => {
            const query = {
                status: 1
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/project/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get list of project names based on search', async () => {
            const query = {
                q: 'a'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/project/list')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });



        it('As a Talent, I can my get list of project names without search', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/project/list')
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});



describe('Talent project names', () => {
    try {
        it('As a Talent, I can get project names', async () => {
            const query = {
                q: 'a'
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/project/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get project list based on query params', async () => {
            const query = {
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/project/search')
                .set({ Authorization: requestPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get list of project names based on search', async () => {
            const query = {
                talentId: talent.id
            };
            const res = await request(process.env.BASE_URL)
                .get('/talent/project/search')
                .set({ Authorization: agencyPayload.token })
                .query(query);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a Talent, I can my get list of project names without search', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/talent/project/search')
                .set({ Authorization: agencyPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


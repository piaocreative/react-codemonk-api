const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./editJobPost');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const trueDataStatus = 1;

// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

const client = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};

const clientRequestPayload = {
    token: jwt.sign(client, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Edit job post', () => {
    try {
        TestCase.edit.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/job-post')
                    .set({ Authorization: adminPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a admin, I should able to edit job post', async () => {
            const JobPostDetails = {
                id: '5f97c8e2a350e416d1a5ebac',
                projectId: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk first brief',
                description: `<p>Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature, discovered the undoubtable source.
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p>
                <p>This book is a treatise on the theory of ethics, very popular during the Renaissance.
                The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"</b>`,
                role: 'Solution Architect',
                skills: ['AWS', 'AWS Lambda'],
                workPreference: ['fulltime'],
                teamPreference: ['individuals'],
                assignments: ['remote-only', 'occational-site-visit'],
                expertise: CONSTANTS.YEAR_OF_EXPERIENCE[0],
                duration: 3
            };

            const res = await request(process.env.BASE_URL)
                .put('/job-post')
                .set({ Authorization: adminPayload.token })
                .send(JobPostDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I should able to edit job post with empty teamPreference and assignment', async () => {
            const JobPostDetails = {
                id: '5f97c8e2a350e416d1a5ebac',
                projectId: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk second brief',
                description: `<p>Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature, discovered the undoubtable source.
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p>
                <p>This book is a treatise on the theory of ethics, very popular during the Renaissance.
                The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"</b>`,
                role: 'Solution Architect',
                skills: ['AWS', 'AWS Lambda'],
                workPreference: ['fulltime'],
                teamPreference: [],
                assignments: [],
                expertise: CONSTANTS.YEAR_OF_EXPERIENCE[0],
                duration: 3
            };

            const res = await request(process.env.BASE_URL)
                .put('/job-post')
                .set({ Authorization: adminPayload.token })
                .send(JobPostDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I should able to edit job post without empty teamPreference and assignment', async () => {
            const JobPostDetails = {
                id: '5f97c8e2a350e416d1a5ebac',
                projectId: '5f631e56d37cbb4801f0fa45',
                name: 'Codemonk second brief',
                description: `<p>Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
                looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
                and going through the cites of the word in classical literature, discovered the undoubtable source.
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
                (The Extremes of Good and Evil) by Cicero, written in 45 BC.</p>
                <p>This book is a treatise on the theory of ethics, very popular during the Renaissance.
                The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"</b>`,
                role: 'Solution Architect',
                skills: ['AWS', 'AWS Lambda'],
                workPreference: ['fulltime'],
                expertise: CONSTANTS.YEAR_OF_EXPERIENCE[0],
                duration: 3
            };

            const res = await request(process.env.BASE_URL)
                .put('/job-post')
                .set({ Authorization: adminPayload.token })
                .send(JobPostDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


describe('Jobpost Archive', () => {
    try {
        it('As a client, I should able to archive job post', async () => {
            const res = await request(process.env.BASE_URL)
                .patch('/job-post/archive/5f97c8e2a350e416d1a5ebac')
                .set({ Authorization: clientRequestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

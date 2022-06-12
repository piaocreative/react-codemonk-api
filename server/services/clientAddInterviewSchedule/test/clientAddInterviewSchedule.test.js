const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./clientAddInterviewSchedule');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const trueDataStatus = 1;

// Client User
const clientUser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const requestPayload = {
    token: jwt.sign(clientUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Client add interview for project', () => {
    try {
        TestCase.addInterview.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/client/interview')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a clinet I should able to add project and it\'s interview for talent', async () => {
            const projectDetails = {
                talentId: '5f083c352a7908662c334532',
                name: 'My new project',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                timeSlots: [MOMENT().add(1, 'days'), MOMENT().add(2, 'days'), MOMENT().add(3, 'days')]
            };

            const res = await request(process.env.BASE_URL)
                .post('/client/interview')
                .set({ Authorization: requestPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a clinet I should able to add interview for talent', async () => {
            const projectDetails = {
                talentId: '5f083c352a7908662c334532',
                name: 'CodeMonk',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                timeSlots: [MOMENT().add(1, 'days'), MOMENT().add(2, 'days'), MOMENT().add(3, 'days')]
            };

            const res = await request(process.env.BASE_URL)
                .post('/client/interview')
                .set({ Authorization: requestPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a clinet I should able to add interview for talent', async () => {
            const projectDetails = {
                talentId: '5f083c352a7908662c334532',
                projectId: '5f2abf4364712b10ad0e8e3c',
                name: 'CodeMonk',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                timeSlots: [MOMENT().add(1, 'days'), MOMENT().add(2, 'days'), MOMENT().add(3, 'days')]
            };

            const res = await request(process.env.BASE_URL)
                .post('/client/interview')
                .set({ Authorization: requestPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});



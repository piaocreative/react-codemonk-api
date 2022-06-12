const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./editProject');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const trueDataStatus = 1;

// client User
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Client edit project', () => {
    try {

        it('As a admin, I should able to edit project name and description of any client', async () => {
            const projectDetails = {
                projectId: '5f2abf4364712b10ad0e8e3c',
                clientId: '5f083c352a7908662c334533',
                name: 'CodeMonk new by Admin',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
            };

            const res = await request(process.env.BASE_URL)
                .put('/project')
                .set({ Authorization: adminPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });


        it('As a admin, I should able to edit project start date and end date', async () => {
            const projectDetails = {
                projectId: '5f2abf4364712b10ad0e8e3c',
                clientId: '5f083c352a7908662c334533',
                name: 'CodeMonk new by Admin',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                startDate: '01/01/2021',
                endDate: '05/01/2021'
            };

            const res = await request(process.env.BASE_URL)
                .put('/project')
                .set({ Authorization: adminPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        TestCase.editProject.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/project')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a client, I should able to edit my project name and description', async () => {
            const projectDetails = {
                projectId: '5f2abf4364712b10ad0e8e3c',
                name: 'CodeMonk edit by client',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`
            };

            const res = await request(process.env.BASE_URL)
                .put('/project')
                .set({ Authorization: clientPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });


    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});



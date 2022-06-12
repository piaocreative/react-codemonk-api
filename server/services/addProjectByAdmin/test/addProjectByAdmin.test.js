const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./addProjectByAdmin');
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
const requestPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Admin add project', () => {
    try {
        TestCase.addProject.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/project/admin')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a admin I should able to add project on behalf of client', async () => {
            const projectDetails = {
                clientId: '5f083c352a7908662c334533',
                name: 'CodeMonk Phase2',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                        their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                startDate: '31/12/2020',
                endDate: '12/06/2021',
                status: 1
            };

            const res = await request(process.env.BASE_URL)
                .post('/project/admin')
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



const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./addProject');
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

describe('Client start project', () => {
    try {
        TestCase.add.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/project')
                    .set({ Authorization: clientPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a client user I should able to add project with looking for design options', async () => {
            const projectDetails = {
                name: 'CodeMonk new',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                buildStatus: 'live',
                projectUrl: 'https://github.com',
                lookingForDesign: ['branding'],
                budget: '<$50K',
                messageToPreSales: 'Do contant me',
                speed: 'super-duper-fast',
                teamManageType: 'project-manager'
            };

            const res = await request(process.env.BASE_URL)
                .post('/project')
                .set({ Authorization: clientPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should able to add project with looking for other options', async () => {
            const projectDetails = {
                name: 'CodeMonk with looking for other',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                buildStatus: 'live',
                projectUrl: 'https://github.com',
                lookingForOther: 'This is something that is not in your options',
                budget: '$50k-$150k',
                messageToPreSales: 'Do contant me',
                speed: 'super-duper-fast',
                teamManageType: 'project-manager'
            };

            const res = await request(process.env.BASE_URL)
                .post('/project')
                .set({ Authorization: clientPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should able to add project so I can start my project', async () => {
            const projectDetails = {
                name: 'CodeMonk with looking for',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                buildStatus: 'inception',
                lookingForDesign: ['branding'],
                lookingForSoftwareDevelopment: ['project-management'],
                lookingForDevelopmentTeam: ['front-end'],
                lookingForDataAiMl: ['development'],
                lookingForGrowthHacking: true,
                lookingForAgileCoach: false,
                lookingForOther: 'Need a delivery manager as well',
                budget: '$150k-$500k',
                messageToPreSales: 'Do contant me',
                speed: 'super-duper-fast',
                teamManageType: 'project-manager'
            };

            const res = await request(process.env.BASE_URL)
                .post('/project')
                .set({ Authorization: clientPayload.token })
                .send(projectDetails);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a client user I should able to add project with agile code so I can start my project', async () => {
            const projectDetails = {
                name: 'CodeMonk with agile coach',
                description: `The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
                    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
                buildStatus: 'inception',
                lookingForDesign: ['branding'],
                lookingForSoftwareDevelopment: ['project-management'],
                lookingForDevelopmentTeam: ['front-end'],
                lookingForDataAiMl: ['development'],
                lookingForGrowthHacking: false,
                lookingForAgileCoach: true,
                lookingForOther: 'Need a delivery manager as well',
                budget: '$500k+',
                messageToPreSales: 'Do contant me',
                speed: 'super-duper-fast',
                teamManageType: 'project-manager'
            };

            const res = await request(process.env.BASE_URL)
                .post('/project')
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



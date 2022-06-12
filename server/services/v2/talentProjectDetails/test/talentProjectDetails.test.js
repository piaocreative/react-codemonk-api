const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseProjectDetails');
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

const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyUserPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

let userDetails;

describe('Talent project add(v2)', () => {
    try {
        TestCase.addProject.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/v2/talent/project')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should able to add project details', async () => {
            const data = {
                name: 'CodeMonk',
                url: 'http://www.codemonk.ai',
                description: `Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled
                     it to make a type specimen book. It has survived not only
                     five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                       popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently
                         with desktop publishing software like Aldus PageMaker
                          including versions of Lorem Ipsum.`,
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                employmentType: 'Fulltime',
                skills: JSON.stringify([{ name: "Amazon Kinesis", rate: 5 }])
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should able to add project details without url', async () => {
            const data = {
                name: 'CodeMonk',
                url: '',
                description: `Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled
                     it to make a type specimen book. It has survived not only
                     five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                       popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently
                         with desktop publishing software like Aldus PageMaker
                          including versions of Lorem Ipsum.`,
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                employmentType: 'Fulltime',
                skills: JSON.stringify([{ name: "Amazon Kinesis", rate: 5 }])
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to add project details without url on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                name: 'CodeMonk',
                url: '',
                description: `Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled
                     it to make a type specimen book. It has survived not only
                     five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                       popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently
                         with desktop publishing software like Aldus PageMaker
                          including versions of Lorem Ipsum.`,
                role: 'Developer',
                keyAchievements: 'I delivered the sprint 1 and sprint 2 on time',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                employmentType: 'Fulltime',
                skills: JSON.stringify([{ name: "Amazon Kinesis", rate: 5 }])
            };
            const res = await request(process.env.BASE_URL)
                .post('/v2/talent/project')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent project edit(v2)', () => {
    try {
        TestCase.editProject.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/v2/talent/project')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should able to edit project details using id', async () => {
            const data = {
                _id: userDetails.projectDetails[0]._id,
                name: 'New CodeMonk',
                url: 'http://www.newcodemonk.ai',
                description: `Lorem Ipsum is simply dummy text of the
                     printing and typesetting industry. Lorem Ipsum has been
                     the industry's standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and scrambled
                      it to make a type specimen book. It has survived not only
                      five centuries, but also the leap into electronic
                       typesetting, remaining essentially unchanged. It was
                        popularised in the 1960s with the release of Letraset
                         sheets containing Lorem Ipsum passages, and more recently
                          with desktop publishing software like Aldus PageMaker
                           including versions of Lorem Ipsum.`,
                role: 'Product Manager',
                keyAchievements: 'I delivered edit project as well',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                employmentType: 'Fulltime',
                skills: JSON.stringify([{ name: "Amazon Kinesis", rate: 5 }])
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should able to edit project details using id', async () => {
            const data = {
                _id: userDetails.projectDetails[0]._id,
                name: 'New CodeMonk',
                description: `Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled
                     it to make a type specimen book. It has survived not only
                     five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                       popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently
                         with desktop publishing software like Aldus PageMaker
                          including versions of Lorem Ipsum.`,
                role: 'Product Manager',
                keyAchievements: 'I delivered edit project as well',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                employmentType: 'Fulltime',
                skills: JSON.stringify([{ name: "Amazon Kinesis", rate: 5 }])
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to edit project details using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5f8eedf1c4336d7911646112',
                name: 'New CodeMonk',
                description: `Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s,
                     when an unknown printer took a galley of type and scrambled
                     it to make a type specimen book. It has survived not only
                     five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                       popularised in the 1960s with the release of Letraset
                        sheets containing Lorem Ipsum passages, and more recently
                         with desktop publishing software like Aldus PageMaker
                          including versions of Lorem Ipsum.`,
                role: 'Product Manager',
                keyAchievements: 'I delivered edit project as well',
                employer: 'SLPM SELF CARE',
                industry: 'Accounting',
                employmentType: 'Fulltime',
                skills: JSON.stringify([{ name: "Amazon Kinesis", rate: 5 }])
            };

            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/project')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

describe('Talent project delete(v2)', () => {
    try {
        TestCase.deleteProject.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .delete('/v2/talent/project')
                    .set({ Authorization: requestPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.body.status, data.status);
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a user, I should not be able to delete project details using  wrong id', async () => {
            const data = {
                _id: 'ABC'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 400);
        });

        it('As a user, I should able to delete project details using id', async () => {
            const data = {
                _id: userDetails.projectDetails[1]._id
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/project')
                .set({ Authorization: requestPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
            userDetails = res.body.data;
        });

        it('As a agency, I should able to delete project details using id on behalf of my talent', async () => {
            const data = {
                talentId: '5f523e4a7e416a76f64ea921',
                _id: '5f8eedf1c4336d7911646112'
            };

            const res = await request(process.env.BASE_URL)
                .delete('/v2/talent/project')
                .set({ Authorization: agencyUserPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });


    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


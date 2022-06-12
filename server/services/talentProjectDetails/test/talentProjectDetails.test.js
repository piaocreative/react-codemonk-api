const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentProjectDetails');
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
describe('Talent Project details', () => {
    try {
        TestCase.projectDetails.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/talent/project-details')
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

        it('As a user I can save my project details without url',
            (done) => {
                const projectDetails = {
                    projectDetails: [{
                        name: 'CodeMonk',
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
                        employer: 'Codemonk',
                        industry: 'Apparel & Fashion',
                        skills: [{ name: 'Android', rate: 9 }]
                    }]
                };

                request(process.env.BASE_URL)
                    .put('/talent/project-details')
                    .set({ Authorization: requestPayload.token })
                    .send(projectDetails)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 200);
                        done();
                    });
            });

        it('As a user I can save my project details',
            (done) => {
                const projectDetails = {
                    projectDetails: [{
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
                        employer: 'Codemonk',
                        industry: 'Apparel & Fashion',
                        skills: [{ name: 'Android', rate: 9 }]
                    }]
                };

                request(process.env.BASE_URL)
                    .put('/talent/project-details')
                    .set({ Authorization: requestPayload.token })
                    .send(projectDetails)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 200);
                        done();
                    });
            });


        it('As a user I can save my project details with html description ',
            (done) => {
                const projectDetails = {
                    projectDetails: [{
                        name: 'CodeMonk',
                        url: 'http://www.codemonk.ai',
                        description: `<h2>Welcome To The Best Online HTML Web
                        Editor!</h2> <h3>Welcome To The Best Online HTML Web Editor
                        !</h3> <h4>Welcome To The Best Online HTML Web Editor!</h4>
                         <p style="font-size: 1.5em;">You can
                         <strong style="background-color: #317399; padding: 0 5px; color: #fff;">
                         type your text</strong> directly in the editor or paste it from
                          a Word Doc, PDF, Excel etc.</p> <p style="font-size: 1.5em;">
                             <img src="https://html5-editor.net/images/smiley.png" alt="smiley" />
                             </p> <table class="editorDemoTable"> <tbody> <tr>
                                 </tr> <tr> <td>John</td> <td>Chicago</td>
                                 <td>22</td> </tr> </tbody> </table>
                                <td>23</td> </tr> <tr> <td>Lucy</td>
                               </tr> <tr> <td>Amanda</td> <td>Madison</td>
                                <td>22</td> </tr> </tbody> </table>
                                     <p>This is a table you can experiment with.</p>`,
                        role: 'Developer',
                        keyAchievements: `<h2>Welcome To The Best Online HTML Web
                        Editor!</h2> <h3>Welcome To The Best Online HTML Web Editor
                        !</h3> <h4>Welcome To The Best Online HTML Web Editor!</h4>
                         <p style="font-size: 1.5em;">You can
                                <td>22</td> </tr> </tbody> </table>
                                     <p>This is a table you can experiment with.</p>`,
                        employer: 'Codemonk',
                        industry: 'Apparel & Fashion',
                        skills: [{ name: 'Android', rate: 9 }]
                    }]
                };

                request(process.env.BASE_URL)
                    .put('/talent/project-details')
                    .set({ Authorization: requestPayload.token })
                    .send(projectDetails)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 200);
                        done();
                    });
            });

        it('As a user I can save my project details with text description ',
            (done) => {
                const projectDetails = {
                    projectDetails: [{
                        name: 'CodeMonk',
                        url: 'http://www.codemonk.ai',
                        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam at efficitur metus.
                    Duis convallis enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                    placerat sagittis.Duis vestibulum justo ac mi molestie ultrices. Sed accumsan
                    eleifend purus, at dignissim lacus hendrerit eu.Phasellus tempor sollicitudin
                    odio ac posuere. Integer eros urna, venenatis ac felis quis,
                    tempus fringilla quam.
                    Curabitur gravida faucibus aliquet. Vestibulum elementum laoreet accumsan.
                    Suspendisse imperdiet orci ut quam mattis, eu molestie enim viverra. Nulla
                    porta eros feugiat porttitor ultrices.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Lorem ipsum dolor sit amet, consectetur adipiscing eli
                    sit amet, consectetur adipiscing eli`,
                        role: 'Developer',
                        keyAchievements: `Lorem ipsum dolor sit amet, consectetur
                         adipiscing elit. Nullam at efficitur metus. Duis convallis
                         enim eu turpis convallis hendrerit. Quisque vestibulum id magna
                          placerat sagittis.Duis vestibulum justo ac mi molestie ultrices.
                           Sed accumsan eleifend purus, at dignissim lacus hendrerit eu.
                           Phasellus tempor sollicitudin odio ac posuere`,
                        employer: 'Codemonk',
                        industry: 'Apparel & Fashion',
                        skills: [{ name: 'Android', rate: 9 }]
                    }]
                };

                request(process.env.BASE_URL)
                    .put('/talent/project-details')
                    .set({ Authorization: requestPayload.token })
                    .send(projectDetails)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 200);
                        done();
                    });
            });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});


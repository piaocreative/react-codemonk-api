const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./editQuote');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const trueDataStatus = 1;
const falseStatus = 0;

// Admin User
const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Admin edit quote', () => {
    try {
        TestCase.edit.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/quote')
                    .set({ Authorization: adminPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a admin, I shouldn\'t able to edit quote with more than 20 mb file', async () => {
            const data = {
                id: '5fa500eea79f873b8ef67b17',
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
                <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"</b>`
            };

            const res = await request(process.env.BASE_URL)
                .put('/quote')
                .set({ Authorization: adminPayload.token })
                .attach('quote', 'test/mock-data/21MB_file.mp4')
                .field('id', data.id)
                .field('projectId', data.projectId)
                .field('name', data.name)
                .field('description', data.description);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I should able to edit quote without uploading file', async () => {
            const data = {
                id: '5fa500eea79f873b8ef67b17',
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
                <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"</b>`
            };

            const res = await request(process.env.BASE_URL)
                .put('/quote')
                .set({ Authorization: adminPayload.token })
                .send(data);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I shouldn able to edit quote', async () => {
            const data = {
                id: '5fa500eea79f873b8ef67b17',
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
                <b>The standard chunk of Lorem Ipsum used since the 1500s Sections "de Finibus Bonorum et"</b>`
            };

            const res = await request(process.env.BASE_URL)
                .put('/quote')
                .set({ Authorization: adminPayload.token })
                .attach('quote', 'test/mock-data/proper_pdf.pdf')
                .field('id', data.id)
                .field('projectId', data.projectId)
                .field('name', data.name)
                .field('description', data.description);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
        describe('Jobpost Archive', () => {
            try {
                it('As a Admin, I should able to archive job post', async () => {
                    const res = await request(process.env.BASE_URL)
                        .patch('/quote/archive/5fa500eea79f873b8ef67b17')
                        .set({ Authorization: adminPayload.token });
                    expect(res.body.status).to.be.status;
                    assert.equal(res.body.status, trueDataStatus);
                    assert.equal(res.statusCode, 200);
                });
            } catch (exception) {
                CONSOLE_LOGGER.error(exception);
            }
        });


    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

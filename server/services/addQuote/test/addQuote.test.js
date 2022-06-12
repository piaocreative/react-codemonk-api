const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./addQuote');
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

describe('Admin add quote', () => {
    try {
        TestCase.add.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/quote')
                    .set({ Authorization: adminPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a admin, I shouldn\'t able to add quote with more than 20 mb file', async () => {
            const data = {
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
                .post('/quote')
                .set({ Authorization: adminPayload.token })
                .attach('quote', 'test/mock-data/21MB_file.mp4')
                .field('projectId', data.projectId)
                .field('name', data.name)
                .field('description', data.description);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I shouldn able to add quote', async () => {
            const data = {
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
                .post('/quote')
                .set({ Authorization: adminPayload.token })
                .attach('quote', 'test/mock-data/proper_pdf.pdf')
                .field('projectId', data.projectId)
                .field('name', data.name)
                .field('description', data.description);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

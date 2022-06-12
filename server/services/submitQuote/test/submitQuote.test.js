const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./submitQuote');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
    algorithm: 'HS256',
    expiresIn: 86400
};
const trueDataStatus = 1;
const falseStatus = 0;

// Agency User
const agencyUser = {
    id: '5f475a9ef25e122eb21d68a8',
    email: 'agency@mailinator.com'
};
const agencyPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};
describe('Agency submit post', () => {
    try {
        TestCase.add.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .post('/agency/quote/submit')
                    .set({ Authorization: agencyPayload.token })
                    .send(data.options)
                    .end((err, res) => {
                        expect(res.body.status).to.be.status;
                        assert.equal(res.statusCode, 400);
                        done();
                    });
            });
        });

        it('As a admin, I shouldn\'t able to submit post because of invalid project plan file', async () => {
            const data = {
                quoteId: '5fa500eea79f873b8ef67b17',
                projectId: '5f631e56d37cbb4801f0fa45',
                assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
               looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
               and going through the cites of the word in classical literature, discovered the undoubtable source.
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC.
               This book is a treatise on the theory of ethics, very popular during the Renaissance.
               The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                totalCost: 1000,
                otherInfo: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32`
            };

            const res = await request(process.env.BASE_URL)
                .post('/agency/quote/submit')
                .set({ Authorization: agencyPayload.token })
                .attach('projectPlan', 'test/mock-data/10mb_file.mp4')
                .attach('effrotsBreakdown', 'test/mock-data/10mb_file.mp4')
                .field('quoteId', data.quoteId)
                .field('projectId', data.projectId)
                .field('assumptions', data.assumptions)
                .field('outOfScope', data.outOfScope)
                .field('teamStructure', data.teamStructure)
                .field('otherInfo', data.otherInfo)
                .field('totalCost', data.totalCost);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I shouldn\'t able to submit post because of invalid efforts break down plan file', async () => {
            const data = {
                quoteId: '5fa500eea79f873b8ef67b17',
                projectId: '5f631e56d37cbb4801f0fa45',
                assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
               looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
               and going through the cites of the word in classical literature, discovered the undoubtable source.
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC.
               This book is a treatise on the theory of ethics, very popular during the Renaissance.
               The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                totalCost: 1000,
                otherInfo: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32`
            };

            const res = await request(process.env.BASE_URL)
                .post('/agency/quote/submit')
                .set({ Authorization: agencyPayload.token })
                .attach('projectPlan', 'test/mock-data/proper_pdf.pdf')
                .attach('effrotsBreakdown', 'test/mock-data/10mb_file.mp4')
                .field('quoteId', data.quoteId)
                .field('projectId', data.projectId)
                .field('assumptions', data.assumptions)
                .field('outOfScope', data.outOfScope)
                .field('teamStructure', data.teamStructure)
                .field('otherInfo', data.otherInfo)
                .field('totalCost', data.totalCost);
            expect(res.body.status).to.be.status;
            assert.equal(res.statusCode, 200);
        });

        it('As a admin, I shouldn\'t able to submit post because of projectId not valid', async () => {
            const data = {
                quoteId: '5fa500eea79f873b8ef67b17',
                projectId: '5f631e56d37cbb4801f0fa4e',
                assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
               looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
               and going through the cites of the word in classical literature, discovered the undoubtable source.
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC.
               This book is a treatise on the theory of ethics, very popular during the Renaissance.
               The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                totalCost: 1000,
                otherInfo: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32`
            };

            const res = await request(process.env.BASE_URL)
                .post('/agency/quote/submit')
                .set({ Authorization: agencyPayload.token })
                .attach('projectPlan', 'test/mock-data/proper_pdf.pdf')
                .attach('effrotsBreakdown', 'test/mock-data/proper_pdf.pdf')
                .field('quoteId', data.quoteId)
                .field('projectId', data.projectId)
                .field('assumptions', data.assumptions)
                .field('outOfScope', data.outOfScope)
                .field('teamStructure', data.teamStructure)
                .field('otherInfo', data.otherInfo)
                .field('totalCost', data.totalCost);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, falseStatus);
            assert.equal(res.statusCode, 400);
        });

        it('As a admin, I should able to submit post', async () => {
            const data = {
                quoteId: '5fa500eea79f873b8ef67b17',
                projectId: '5f631e56d37cbb4801f0fa45',
                assumptions: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                outOfScope: `Contrary to popular belief, Lorem Ipsum is not simply random text.
             It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
             Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
              looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
              and going through the cites of the word in classical literature, discovered the undoubtable source.
             Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
             (The Extremes of Good and Evil) by Cicero, written in 45 BC.
              This book is a treatise on the theory of ethics, very popular during the Renaissance.
              The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                teamStructure: `Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
               looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
               and going through the cites of the word in classical literature, discovered the undoubtable source.
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
              (The Extremes of Good and Evil) by Cicero, written in 45 BC.
               This book is a treatise on the theory of ethics, very popular during the Renaissance.
               The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
                totalCost: 1000,
                otherInfo: `Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
             looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
             and going through the cites of the word in classical literature, discovered the undoubtable source.
            Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum"
            (The Extremes of Good and Evil) by Cicero, written in 45 BC.
             This book is a treatise on the theory of ethics, very popular during the Renaissance.
             The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32`
            };

            const res = await request(process.env.BASE_URL)
                .post('/agency/quote/submit')
                .set({ Authorization: agencyPayload.token })
                .attach('projectPlan', 'test/mock-data/proper_pdf.pdf')
                .attach('effrotsBreakdown', 'test/mock-data/proper_pdf.pdf')
                .field('quoteId', data.quoteId)
                .field('projectId', data.projectId)
                .field('assumptions', data.assumptions)
                .field('outOfScope', data.outOfScope)
                .field('teamStructure', data.teamStructure)
                .field('otherInfo', data.otherInfo)
                .field('totalCost', data.totalCost);
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

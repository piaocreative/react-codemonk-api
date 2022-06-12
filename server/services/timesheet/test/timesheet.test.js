const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const { add, list, edit } = require('./timesheet');
const Timesheet = require('../../../models/timesheet.model');
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

const adminUser = {
    id: '5f5f2cd2f1472c3303b6b861',
    email: 'super@codemonk.ai'
};
const adminPayload = {
    token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};


// client User
const clientuser = {
    id: '5f083c352a7908662c334533',
    email: 'client@mailinator.com'
};
const clientPayload = {
    token: jwt.sign(clientuser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// client User
const agencyUser = {
    id: '5f5335172317791e189ac32d',
    email: 'agencybefore@mailinator.com'
};
const agencyPayload = {
    token: jwt.sign(agencyUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Timesheet', () => {
    let timeSheetId;
    describe('Add Timesheet', () => {
        add.forEach((data) => {
            it(data.it, async () => {

                const res = await request(process.env.BASE_URL)
                    .post('/timesheet')
                    .set({ Authorization: requestPayload.token })
                    .send(data.body );
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, data.status);
                assert.equal(res.statusCode, data.statusCode);
            });
        });

        it('As an agency I should not able to add timesheet without talent id', async () => {
            const res = await request(process.env.BASE_URL)
                .post('/timesheet')
                .set({ Authorization: agencyPayload.token })
                .send( {
                    'projectId': '5f631e56d37cbb4801f0fa45',
                    'dateStart': '24/01/2021',
                    'week': [
                        {
                            'date': '14/01/2021',
                            'value': 1
                        },
                        {
                            'date': '15/01/2021',
                            'value': 0.5
                        },
                        {
                            'date': '16/01/2021',
                            'value': 1
                        },
                        {
                            'date': '17/01/2021',
                            'value': 0
                        },
                        {
                            'date': '18/01/2021',
                            'value': 0
                        },
                        {
                            'date': '19/01/2021',
                            'value': 0.5
                        },
                        {
                            'date': '20/01/2021',
                            'value': 1
                        }
                    ],
                    status: 3
                } );
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });

        it('As an agency I able to add timesheet for my talent', async () => {
            const res = await request(process.env.BASE_URL)
                .post('/timesheet')
                .set({ Authorization: agencyPayload.token })
                .send( {
                    talentId: talent.id,
                    'projectId': '5f631e56d37cbb4801f0fa45',
                    'dateStart': '24/01/2021',
                    'week': [
                        {
                            'date': '14/01/2021',
                            'value': 1
                        },
                        {
                            'date': '15/01/2021',
                            'value': 0.5
                        },
                        {
                            'date': '16/01/2021',
                            'value': 1
                        },
                        {
                            'date': '17/01/2021',
                            'value': 0
                        },
                        {
                            'date': '18/01/2021',
                            'value': 0
                        },
                        {
                            'date': '19/01/2021',
                            'value': 0.5
                        },
                        {
                            'date': '20/01/2021',
                            'value': 1
                        }
                    ],
                    status: 3
                } );
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });
    });

    describe('Get Timesheet details', () => {
        before('Get id for timesheet', async ()=>{
            const { _id } = await Timesheet.findOne({ status: 3 }, {});
            timeSheetId = _id;
        });
        it('As a Talent, I should able to get timesheet details', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/timesheet/' + timeSheetId)
                .set({ Authorization: requestPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });
    });

    describe('Timesheet List', () => {
        list.forEach((data) => {
            it(data.it, async () => {
                const res = await request(process.env.BASE_URL)
                    .get('/timesheet')
                    .set({ Authorization: requestPayload.token })
                    .query(data.query );
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, data.status);
                assert.equal(res.statusCode, data.statusCode);
            });
        });

        it('As an Admin I able to get timesheet list', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/timesheet')
                .set({ Authorization: adminPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });

        it('As an client I able to get timesheet list', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/timesheet')
                .set({ Authorization: clientPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });


        it('As an agency I able to get timesheet list', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/timesheet')
                .set({ Authorization: agencyPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });

    });

    describe('Edit timesheet', async () => {
        edit.forEach((data) => {
            it(data.it, async () => {
                const res = await request(process.env.BASE_URL)
                    .put('/timesheet/' + timeSheetId)
                    .set({ Authorization: requestPayload.token })
                    .send(data.body );
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, data.status);
                assert.equal(res.statusCode, data.statusCode);
            });
        });

        it('As a Talent, I should not able to update timesheet which is submitted', async () => {
            const { _id } = await Timesheet.findOne({ status: 0 }, {});
            const res = await request(process.env.BASE_URL)
                .put('/timesheet/' + _id)
                .set({ Authorization: requestPayload.token })
                .send();
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });
    });

    describe('Timesheet status', () => {
        let pendingTimeSheet;
        let draftTimeSheet;
        before(async ()=>{
            const draft = await Timesheet.findOne({ status: 3 }, {});
            const submit = await Timesheet.findOne({ status: 0 }, {});
            pendingTimeSheet = submit._id;
            draftTimeSheet = draft._id;
        });
        it('As a Client, I should not able to update drafted timesheet status', async () => {
            const res = await request(process.env.BASE_URL)
                .patch('/timesheet/' + draftTimeSheet)
                .set({ Authorization: clientPayload.token })
                .send({ status: 2 });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });
        it('As a Client, I should not able to update timesheet status submitted to setteled', async () => {
            const res = await request(process.env.BASE_URL)
                .patch('/timesheet/' + pendingTimeSheet)
                .set({ Authorization: clientPayload.token })
                .send({ status: 4 });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });
        it('As a Client, I should able to update timesheet status to rejected', async () => {
            const res = await request(process.env.BASE_URL)
                .patch('/timesheet/' + pendingTimeSheet)
                .set({ Authorization: clientPayload.token })
                .send({ status: 2 });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });
        it('As a Client, I should able to update timesheet status from rejected to approved', async () => {
            const res = await request(process.env.BASE_URL)
                .patch('/timesheet/' + pendingTimeSheet)
                .set({ Authorization: clientPayload.token })
                .send({ status: 1 });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });
        it('As a Client, I should not able to update timesheet status from approved to rejected', async () => {
            console.log(pendingTimeSheet)
            const res = await request(process.env.BASE_URL)
                .patch('/timesheet/' + pendingTimeSheet)
                .set({ Authorization: clientPayload.token })
                .send({ status: 1 });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });
        it('As an Admin, I able to change setteled status from approved', async () => {
            const res = await request(process.env.BASE_URL)
                .patch('/timesheet/' + pendingTimeSheet)
                .set({ Authorization: adminPayload.token })
                .send({ status: 4 });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });
    });
});

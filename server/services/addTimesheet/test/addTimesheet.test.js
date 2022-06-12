const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const { add,list } = require('./addTimesheet');
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
                    .post('/v2/timesheet')
                    .set({ Authorization: requestPayload.token })
                    .send(data.body);
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, data.status);
                assert.equal(res.statusCode, data.statusCode);
            });
        });

        it('As an agency I should not able to add timesheet without talent id', async () => {
            const res = await request(process.env.BASE_URL)
                .post('/v2/timesheet')
                .set({ Authorization: agencyPayload.token })
                .send({
                    'projectId': '5f631e56d37cbb4801f0fa45',
                    'dateStart': '08/08/2021',
                    'week': [
                        {
                            'date': '08/08/2021',
                            'hours': 8,
                            'minutes': 0
                        },
                        {
                            'date': '09/08/2021',
                            'hours': 4,
                            'minutes': 0
                        },
                        {
                            'date': '10/08/2021',
                            'hours': 8,
                            'minutes': 0
                        },
                        {
                            'date': '11/08/2021',
                            'hours': 0,
                            'minutes': 0
                        },
                        {
                            'date': '12/08/2021',
                            'hours': 0,
                            'minutes': 0
                        },
                        {
                            'date': '13/08/2021',
                            'hours': 4,
                            'minutes': 0
                        },
                        {
                            'date': '14/08/2021',
                            'hours': 8,
                            'minutes': 0
                        }
                    ],
                    status: 3
                });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });

        it('As an agency I able to add timesheet for my talent', async () => {
            const res = await request(process.env.BASE_URL)
                .post('/v2/timesheet')
                .set({ Authorization: agencyPayload.token })
                .send({
                    talentId: talent.id,
                    'projectId': '5f631e56d37cbb4801f0fa45',
                    'dateStart': '08/08/2021',
                    'week': [
                        {
                            'date': '08/08/2021',
                            'hours': 8,
                            'minutes': 0
                        },
                        {
                            'date': '09/08/2021',
                            'hours': 4,
                            'minutes': 0
                        },
                        {
                            'date': '10/08/2021',
                            'hours': 8,
                            'minutes': 0
                        },
                        {
                            'date': '11/08/2021',
                            'hours': 0,
                            'minutes': 0
                        },
                        {
                            'date': '12/08/2021',
                            'hours': 0,
                            'minutes': 0
                        },
                        {
                            'date': '13/08/2021',
                            'hours': 4,
                            'minutes': 0
                        },
                        {
                            'date': '14/08/2021',
                            'hours': 8,
                            'minutes': 0
                        }
                    ],
                    status: 3
                });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });
    });

    describe('Timesheet v2 List', () => {
        list.forEach((data) => {
            it(data.it, async () => {
                const res = await request(process.env.BASE_URL)
                    .get('/v2/timesheet')
                    .set({ Authorization: requestPayload.token })
                    .query(data.query);
                expect(res.body.status).to.be.status;
                assert.equal(res.body.status, data.status);
                assert.equal(res.statusCode, data.statusCode);
            });
        });

        it('As an Admin I able to get timesheet list', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/timesheet')
                .set({ Authorization: adminPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });

        it('As an client I able to get timesheet list', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/timesheet')
                .set({ Authorization: clientPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });

        it('As an agency I able to get timesheet list', async () => {
            const res = await request(process.env.BASE_URL)
                .get('/v2/timesheet')
                .set({ Authorization: agencyPayload.token });
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 1);
            assert.equal(res.statusCode, 200);
        });
    });


    describe('Edit timesheet v2', async () => {
        edit.forEach((data) => {
            it(data.it, async () => {
                const res = await request(process.env.BASE_URL)
                    .put('/v2/timesheet/' + timeSheetId)
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
                .put('/v2/timesheet/' + _id)
                .set({ Authorization: requestPayload.token })
                .send();
            expect(res.body.status).to.be.status;
            assert.equal(res.body.status, 0);
            assert.equal(res.statusCode, 400);
        });
    });


});

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseTalentPayDetails');
chai.use(chaiHttp);
const trueDataStatus = 1;
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
describe('Talent Pay details', () => {
    try {
        TestCase.payDetails.forEach((data) => {
            it(data.it, (done) => {
                request(process.env.BASE_URL)
                    .put('/v2/talent/pay-details')
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

        it('As a user, I should check salary for permanent employee', async () => {
            const data = {
                employmentType: 'permanent-employee',
                currencyAnnualRate: 'USD',
                annualRate: 40
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/pay-details')
                .set({ Authorization: requestPayload.token })
                .send(data);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should check salary for freelancer', async () => {
            const data = {
                currency: 'USD',
                ratePerHour: 40,
                billingType: 'freelancer',
                employmentType: 'freelancer-consultant'
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/pay-details')
                .set({ Authorization: requestPayload.token })
                .send(data);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should check salary for permanent-employee/freelancer', async () => {
            const data = {
                currency: 'USD',
                ratePerHour: 40,
                billingType: 'freelancer',
                employmentType: 'permanent-employee,freelancer-consultant',
                currencyAnnualRate: 'USD',
                annualRate: 40
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/pay-details')
                .set({ Authorization: requestPayload.token })
                .send(data);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });

        it('As a user, I should check salary for permanent-employee/freelancer with billing type company', async () => {
            const data = {
                currency: 'USD',
                ratePerHour: 40,
                billingType: 'company',
                companyName: 'Soft Silicon',
                companyregisteredNumber: 'ABC',
                companyPincode: '380015',
                companyCity: 'Ahmedabad',
                companyCountry: 'India',
                companyAddressLineOne: 'Some Building',
                currencyCompanyProfessionInsuranceValue: 'USD',
                companyProfessionInsuranceValue: 1000000,
                currencyCompanyPublicInsurancesValue: 'USD',
                companyPublicInsurancesValue: 5000000,
                currencyCompanyEmployerInsuranceValue: 'USD',
                companyEmployerInsuranceValue: 10000000,
                employmentType: 'permanent-employee,freelancer-consultant',
                currencyAnnualRate: 'USD',
                annualRate: 40
            };
            const res = await request(process.env.BASE_URL)
                .put('/v2/talent/pay-details')
                .set({ Authorization: requestPayload.token })
                .send(data);
            assert.equal(res.body.status, trueDataStatus);
            assert.equal(res.statusCode, 200);
        });
    } catch (exception) {
        CONSOLE_LOGGER.error(exception);
    }
});

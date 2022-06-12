const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseDashboard');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
	algorithm: 'HS256',
	expiresIn: 86400
};

// Ambassador user
const ambassador = {
	id: '621def15252b22fd20837dd6',
	email: 'ambassadorcompanyprofile@mailinator.com'
};
const ambassadorUser = {
	token: jwt.sign(ambassador, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Ambassador dashboard', () => {
	try {
		TestCase.inviteEmail.forEach((data) => {
			it(data.it,  (done) => {
					request(process.env.BASE_URL)
					.post('/v2/ambassador/talent-invite')
					.set({ Authorization: ambassadorUser.token })
					.send(data.options)
					.end((err, res) => {
                        expect(res.body.status).to.be.status;
						assert.equal(res.statusCode, data.statusCode);
						assert.equal(res.body.status, data.status);
                        done();
                    });;
				
			});
		});

		it('As a ambassador, I should invite my unique friend that are not on platform',
			async () => {
				const data = {
					emails: [{
						name: 'My Friend',
						email: 'test@yopmail.com'
					},
					{
						email: 'test@yopmail.com'
					},
					{
						email: 'talent@mailinator.com'
					}]
				};
				const res = await request(process.env.BASE_URL)
					.post('/v2/ambassador/talent-invite')
					.set({ Authorization: ambassadorUser.token })
					.send(data);
				expect(res.body.status).to.be.status;
				assert.equal(res.body.status, 1);
				assert.equal(res.statusCode, 200);
			});

			

	} catch (exception) {
		CONSOLE_LOGGER.error(exception);
	}
});


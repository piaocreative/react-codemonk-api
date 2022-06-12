const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
const TestCase = require('./testcaseRecruiterDashboard');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const tokenOptionalInfo = {
	algorithm: 'HS256',
	expiresIn: 86400
};

// Recruiter user
const recruiter = {
	id: '620a449b8ecd7f654bf64b87',
	email: 'recruitercompanyprofile@mailinator.com'
};
const recruiterUser = {
	token: jwt.sign(recruiter, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Recruiter dashbaord', () => {
	try {
		TestCase.inviteEmail.forEach((data) => {
			it(data.it, async () => {
				const res = await request(process.env.BASE_URL)
					.post('/v2/recruiter/talent-invite')
					.set({ Authorization: recruiterUser.token })
					.send(data.options);
				expect(res.body.status).to.be.status;
				assert.equal(res.statusCode, data.statusCode);
				assert.equal(res.body.status, data.status);
			});
		});

		it('As a recruiter, I should invite my unique friend that are not on platform',
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
					.post('/v2/recruiter/talent-invite')
					.set({ Authorization: recruiterUser.token })
					.send(data);
				expect(res.body.status).to.be.status;
				assert.equal(res.body.status, 1);
				assert.equal(res.statusCode, 200);
			});

	} catch (exception) {
		CONSOLE_LOGGER.error(exception);
	}
});


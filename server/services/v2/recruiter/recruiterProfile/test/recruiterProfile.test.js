const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const TestCases = require('./testcaseRecruiterProfile');

const tokenOptionalInfo = {
	algorithm: 'HS256',
	expiresIn: 86400
};

// Recruiter user
const recruiter = {
	id: '620a449b8ecd7f654bf64b87',
	email: 'recruiter@mailinator.com'
};

const recruiterUser = {
	token: jwt.sign(recruiter, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Recruiter profile about-you', () => {
	try {
		TestCases.aboutYou.forEach((data) => {
			it(data.it, async () => {
				const res = await request(process.env.BASE_URL)
					.put('/v2/recruiter/about-you')
					.set({ Authorization: recruiterUser.token })
					.send(data.options)
				expect(res.body.status).to.be.status;
				assert.equal(res.statusCode, data.statusCode);
				assert.equal(res.body.status, data.status);
			});
		});

	} catch (exception) {
		CONSOLE_LOGGER.error(exception);
	}
});

describe('Recruiter profile about-company', () => {
	try {
		TestCases.aboutCompany.forEach((data) => {
			it(data.it, async () => {
				const res = await request(process.env.BASE_URL)
					.put('/v2/recruiter/about-company')
					.set({ Authorization: recruiterUser.token })
					.send(data.options)
				expect(res.body.status).to.be.status;
				assert.equal(res.statusCode, data.statusCode);
				assert.equal(res.body.status, data.status);
			});
		});

	} catch (exception) {
		CONSOLE_LOGGER.error(exception);
	}
});

describe('Recruiter profile save-later for step1 profile', () => {
	try {
		TestCases.saveLater.firstStep.forEach((data) => {
			it(data.it, async () => {
				const res = await request(process.env.BASE_URL)
					.put('/v2/recruiter/save-later')
					.set({ Authorization: recruiterUser.token })
					.send(data.options)
				expect(res.body.status).to.be.status;
				assert.equal(res.statusCode, data.statusCode);
				assert.equal(res.body.status, data.status);
			});
		});

	} catch (exception) {
		CONSOLE_LOGGER.error(exception);
	}
});

describe('Recruiter profile save-later for step2 profile', () => {
	try {
		TestCases.saveLater.secondStep.forEach((data) => {
			it(data.it, async () => {
				const res = await request(process.env.BASE_URL)
					.put('/v2/recruiter/save-later')
					.set({ Authorization: recruiterUser.token })
					.send(data.options)
				expect(res.body.status).to.be.status;
				assert.equal(res.statusCode, data.statusCode);
				assert.equal(res.body.status, data.status);
			});
		});

	} catch (exception) {
		CONSOLE_LOGGER.error(exception);
	}
});


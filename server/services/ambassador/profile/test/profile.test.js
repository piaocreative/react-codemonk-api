const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const assert = chai.assert;
const request = require('supertest');
chai.use(chaiHttp);
const jwt = require('jsonwebtoken');
const TestCases = require('./profileTestCases');

const tokenOptionalInfo = {
	algorithm: 'HS256',
	expiresIn: 86400
};
const adminUser = {
	id: '5f5f2cd2f1472c3303b6b861',
	email: 'super@codemonk.ai'
};
const adminPayload = {
	token: jwt.sign(adminUser, process.env.JWT_SECRET, tokenOptionalInfo)
};

// Ambassador user
const ambassador = {
	id: '621d0880cf4c3a80f037a37c',
	email: 'vipivis306@robhung.com'
};

const ambassadorUser = {
	token: jwt.sign(ambassador, process.env.JWT_SECRET, tokenOptionalInfo)
};

describe('Ambassador profile about-you', () => {
	try {
		TestCases.aboutYou.forEach((data) => {
			it(data.it, async () => {
				const res = await request(process.env.BASE_URL)
					.put('/ambassador/about-you')
					.set({ Authorization: ambassadorUser.token })
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

describe('Ambassador profile about-company', () => {
	try {
		TestCases.aboutCompany.forEach((data) => {
			it(data.it, async () => {
				const res = await request(process.env.BASE_URL)
					.put('/ambassador/about-company')
					.set({ Authorization: ambassadorUser.token })
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

describe('Ambassador profile save-later for step1 profile', () => {
	try {
		TestCases.saveLater.firstStep.forEach((data) => {
			it(data.it, async () => {
				const res = await request(process.env.BASE_URL)
					.put('/ambassador/save-later')
					.set({ Authorization: ambassadorUser.token })
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

describe('Ambassador profile save-later for step2 profile', () => {
	try {
		TestCases.saveLater.secondStep.forEach((data) => {
			it(data.it, async () => {
				const res = await request(process.env.BASE_URL)
					.put('/ambassador/save-later')
					.set({ Authorization: ambassadorUser.token })
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

describe('Get ambassador details', () => {
	try {
		it('As a admin I can\'t get ambassador details that not exist', async () => {
			const res = await request(process.env.BASE_URL)
				.get('/ambassador/ABC')
				.set({ Authorization: adminPayload.token });
			expect(res.body.status).to.be.status;
			assert.equal(res.statusCode, 400);
		});

		it('As a admin I can\'t get details with an id that is not an ambassador id', async () => {
			const res = await request(process.env.BASE_URL)
				.get('/ambassador/5f083c352a7908662c334535')
				.set({ Authorization: adminPayload.token });
			expect(res.body.status).to.be.status;
			assert.equal(res.statusCode, 400);
		});

		it('As a admin I can get ambassador details that exists', async () => {
			const res = await request(process.env.BASE_URL)
				.get('/ambassador/620b2fd550e116c3cbbd5aa1')
				.set({ Authorization: adminPayload.token });
			expect(res.body.status).to.be.status;
			assert.equal(res.statusCode, 200);
		});
	} catch (exception) {
		CONSOLE_LOGGER.error(exception);
	}
});

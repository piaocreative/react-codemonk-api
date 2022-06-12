const falseDataStatus = 0;

module.exports = {
	inviteEmail: [{
		it: 'As a user I should validate emails must be passed',
		options: {
		},
		statusCode: 400,
		status: falseDataStatus
	}, {
		it: 'As a user I should validate emails must not be string',
		options: {
			emails: 'test@yopmail.com'
		},
		statusCode: 400,
		status: falseDataStatus
	},
	{
		it: 'As a user I should validate emails must not be integer',
		options: {
			emails: 1000
		},
		statusCode: 400,
		status: falseDataStatus
	},
	{
		it: 'As a user I should validate emails must not be object',
		options: {
			emails: {
				email: 'test@yopmail.com'
			}
		},
		statusCode: 400,
		status: falseDataStatus
	},
	{
		it: 'As a user I should validate emails must not be empty array',
		options: {
			emails: []
		},
		statusCode: 400,
		status: falseDataStatus
	},
	{
		it: 'As a user I should validate emails should be valid one',
		options: {
			emails: [{
				email: 'invalid Email'
			}]
		},
		statusCode: 400,
		status: falseDataStatus
	}]
};

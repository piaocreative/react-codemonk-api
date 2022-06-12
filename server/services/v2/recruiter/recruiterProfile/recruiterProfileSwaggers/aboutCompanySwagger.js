const message = require('../../../../../locales/en');

module.exports = swaggerJson => {

	swaggerJson.paths['/v2/recruiter/about-company'] = {
		put: {
			security: [{ bearerAuth: [] }],
			tags: ['Recruiter(v2)'],
			description: 'Add recruiter company detail',
			summary: 'Add recruiter company detail',
			parameters: [{
				in: 'formData',
				name: 'logo',
				type: 'file'
			},
			{
				in: 'formData',
				name: 'name',
				type: 'string',
				example: 'Joy story company',
				required: true
			}, {
				in: 'formData',
				name: 'brand',
				type: 'string',
				example: 'Hourse',
				required: true
			}, {
				in: 'formData',
				name: 'registeredNumber',
				type: 'string',
				example: '12345678',
				required: true
			}, {
				in: 'formData',
				name: 'vatNumber',
				type: 'string',
				example: '112233',
				required: true
			}, {
				in: 'formData',
				name: 'websiteUrl',
				type: 'string',
				example: 'https://mywebsite/',
				required: true
			}, {
				in: 'formData',
				name: 'linkedInUrl',
				type: 'string',
				example: 'https://www.linkedin.com/',
				required: true
			}, {
				in: 'formData',
				name: 'postcode',
				type: 'string',
				example: '380015',
				required: true
			}, {
				in: 'formData',
				name: 'country',
				type: 'string',
				example: 'India',
				required: true
			}, {
				in: 'formData',
				name: 'addressLineOne',
				type: 'string',
				required: true
			}, {
				in: 'formData',
				name: 'addressLineTwo',
				type: 'string'
			}, {
				in: 'formData',
				name: 'city',
				type: 'string',
				required: true
			}, {
				in: 'formData',
				name: 'state',
				type: 'string'
			}],
			responses: {
				200: {
					description: 'Update recruiter user profile details',
					schema: {
						$ref: '#/definitions/successRecruiterAboutCompany'
					}
				},
				400: {
					description: 'Invalid request',
					schema: {
						$ref: '#/definitions/validationError'
					}
				},
				401: {
					description: 'Unauthorized Access',
					schema: {
						$ref: '#/definitions/unauthorisedAccess'
					}
				},
				500: {
					description: 'Something went wrong. Try again.',
					schema: {
						$ref: '#/definitions/unexpextedError'
					}
				}
			}
		}
	};

	swaggerJson.definitions.recruiterAboutCompany = {
		type: 'object',
		properties: {
			firstName: {
				type: 'string',
				example: 'Recruiter\'s First'
			},
			lastName: {
				type: 'string',
				example: 'Recruiter\'s Last'
			},
			jobTitle: {
				type: 'string',
				example: 'CTO'
			}
		}
	};

	swaggerJson.definitions.successRecruiterAboutCompany = {
		properties: {
			status: {
				type: 'number',
				example: 1
			},
			message: {
				example: message.SUCCESS
			}
		}
	};

	swaggerJson.definitions.unexpextedError = {
		properties: {
			status: {
				type: 'number',
				example: 0
			},
			message: {
				example: message.ERROR_MSG
			}
		}
	};

	swaggerJson.definitions.validationError = {
		properties: {
			status: {
				type: 'number',
				example: 0
			},
			message: {
				example: message.INVALID_REQUEST
			}
		}
	};

	swaggerJson.definitions.unauthorisedAccess = {
		properties: {
			status: {
				type: 'number',
				example: 0
			},
			message: {
				example: message.ACCESS_DENIED
			}
		}
	};

	return swaggerJson;
};



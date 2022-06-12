const message = require('../../../../../locales/en');

module.exports = swaggerJson => {

	swaggerJson.paths['/v2/recruiter/about-you'] = {
		put: {
			security: [{ bearerAuth: [] }],
			tags: ['Recruiter(v2)'],
			description: 'Update recruiter about you details',
			summary: 'Update recruiter about you details',
			parameters: [{
				in: 'formData',
				name: 'logo',
				type: 'file'
			}, {
				in: 'formData',
				name: 'firstName',
				type: 'string',
				example: 'Recruiter\'s First'
			}, {
				in: 'formData',
				name: 'lastName',
				type: 'string',
				example: 'Recruiter\'s Last'
			}, {
				in: 'formData',
				name: 'jobTitle',
				type: 'string',
				example: 'CTO'
			},
			],
			responses: {
				200: {
					description: 'Update recruiter user profile details',
					schema: {
						$ref: '#/definitions/successRecruiterAboutYou'
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

	swaggerJson.definitions.recruiterAboutYou = {
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

	swaggerJson.definitions.successRecruiterAboutYou = {
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

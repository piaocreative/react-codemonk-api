const message = require('../../../../locales/en');

module.exports = swaggerJson => {

	swaggerJson.paths['/ambassador/about-you'] = {
		put: {
			security: [{ bearerAuth: [] }],
			tags: ['Ambassador'],
			description: 'Update ambassador about you details',
			summary: 'Update ambassador about you details',
			parameters: [{
				in: 'formData',
				name: 'logo',
				type: 'file'
			}, {
				in: 'formData',
				name: 'firstName',
				type: 'string',
				example: 'Ambassador\'s First'
			}, {
				in: 'formData',
				name: 'lastName',
				type: 'string',
				example: 'Ambassador\'s Last'
			}, {
				in: 'formData',
				name: 'jobTitle',
				type: 'string',
				example: 'CTO'
			},
			],
			responses: {
				200: {
					description: 'Update ambassador user profile details',
					schema: {
						$ref: '#/definitions/successAmbassadorAboutYou'
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

	swaggerJson.definitions.ambassadorAboutYou = {
		type: 'object',
		properties: {
			firstName: {
				type: 'string',
				example: 'Ambassador\'s First'
			},
			lastName: {
				type: 'string',
				example: 'Ambassador\'s Last'
			},
			jobTitle: {
				type: 'string',
				example: 'CTO'
			}
		}
	};

	swaggerJson.definitions.successAmbassadorAboutYou = {
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

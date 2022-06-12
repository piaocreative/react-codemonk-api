const message = require('../../../../../locales/en');

module.exports = swaggerJson => {

  swaggerJson.paths['/v2/recruiter/save-later'] = {
    put: {
      security: [{ bearerAuth: [] }],
      tags: ['Recruiter(v2)'],
      description: 'Update recruiter user profile partial save  step=1 : /about-you  step=2 : /about-company',
      summary: 'Update recruiter user profile partial save  step=1 : /about-you  step=2 : /about-company',
      parameters: [{
        in: 'formData',
        name: 'step',
        type: 'number',
        example: 1,
        required: true
      }, {
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
      }, {
        in: 'formData',
        name: 'name',
        type: 'string',
        example: 'Joy story company'
      }, {
        in: 'formData',
        name: 'brand',
        type: 'string',
        example: 'Hourse'
      }, {
        in: 'formData',
        name: 'registeredNumber',
        type: 'string',
        example: '12345678'
      }, {
        in: 'formData',
        name: 'vatNumber',
        type: 'string',
        example: '112233'
      }, {
        in: 'formData',
        name: 'websiteUrl',
        type: 'string',
        example: 'http://www.codemonk.ai'
      }, {
        in: 'formData',
        name: 'linkedInUrl',
        type: 'string',
        example: 'https://www.linkedin.com/'
      }, {
        in: 'formData',
        name: 'postcode',
        type: 'string',
        example: '380015'
      }, {
        in: 'formData',
        name: 'country',
        type: 'string',
        example: 'India'
      }, {
        in: 'formData',
        name: 'addressLineOne',
        type: 'string',
        example: 'Some House, Some Buildding'
      }, {
        in: 'formData',
        name: 'addressLineTwo',
        type: 'string',
        example: 'Some Road, Somewhere'
      }, {
        in: 'formData',
        name: 'city',
        type: 'string',
        example: 'Ahmedabad'
      }, {
        in: 'formData',
        name: 'state',
        type: 'string',
        example: 'company state'
      }],

      responses: {
        200: {
          description: 'Update client user profile partial save',
          schema: {
            $ref: '#/definitions/successRecruiter'
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
  swaggerJson.definitions.successRecruiter = {
    type: 'object',
    properties: {
      step: {
        type: 'number',
        example: 1
      },
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

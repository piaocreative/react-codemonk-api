const message = require('../../../locales/en');

module.exports = swaggerJson => {
  swaggerJson.paths['/algo-api/job-brief/{id}/rec_candidates'] = {
    get: {
      security: [{
        bearerAuth: []
      }],
      tags: [
        'Algorithm Api'
      ],
      parameters: [{
        in: 'path',
        name: 'id',
        description: 'id in jobpost',
        example: '5f0c3ffc68f150000730d676'
      }],
      description: "Get recommended talents from a jobpost Id",
      summary: "Get recommended talents from a jobpost Id",

      responses: {
        200: {
          description: 'Success',
          schema: {
            $ref: '#/definitions/successRes'
          }
        },
        400: {
          description: 'Invalid request.',
          schema: {
            $ref: '#/definitions/errorBadRequest'
          }
        },
        401: {
          description: 'Unauthorized Access',
          schema: {
            $ref: '#/definitions/unauthorisedAccess'
          }
        },
        500: {
          description: 'Internal Server Error',
          schema: {
            $ref: '#/definitions/unexpextedError'
          }
        }
      }
    }
  };

  swaggerJson.definitions.successRes = {
    properties: {
      status: {
        type: 'number',
        example: 1
      },
      data: {
        example: {
          "data": [
            {
              "rank": 0,
              "id": "5fc4e3e44f38630ada2423b2"
            },
            {
              "rank": 1,
              "id": "5fbfae8f28943c124e412c8a"
            },
            {
              "rank": 2,
              "id": "5fbf7a815fc76d1255a67453"
            },
            {
              "rank": 3,
              "id": "5f92b8ae900a5561d4ad347a"
            },
            {
              "rank": 4,
              "id": "5f91720f45c0b01fed4674ef"
            },
            {
              "rank": 5,
              "id": "5f6835123f26e16e6d0ef80d"
            },
            {
              "rank": 6,
              "id": "5f634ede0c5fd0114bfcdf49"
            },
            {
              "rank": 7,
              "id": "5f5f038214f8195591200a7e"
            },
            {
              "rank": 8,
              "id": "5f19ec25b43fa909b222e8b9"
            },
            {
              "rank": 9,
              "id": "5f105c2a13316800088fa2b6"
            }
          ]
        }
      },
      message: {
        example: message.SUCCESS
      }
    }
  };
  swaggerJson.definitions.errorBadRequest = {
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

  return swaggerJson;
};

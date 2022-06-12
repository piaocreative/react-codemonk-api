const trueDataStatus = 1;
const falseDataStatus = 0;

module.exports = {
  aboutYou: [
    {
      it: 'As a recruiter user I should save - firstName, lastName, jobTitle',
      options: {
        firstName: 'Recruiter\'s Change',
        lastName: 'Recruiter\'s  Last',
        jobTitle: 'CTO'
      },
      statusCode: 200,
      status: trueDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without firstName',
      options: {
        lastName: 'Recruiter\'s  Last',
        jobTitle: 'CTO'
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without lastName',
      options: {
        firstName: 'Recruiter\'s Change',
        jobTitle: 'CTO'
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without jobTitle',
      options: {
        firstName: 'Recruiter\'s Change',
        lastName: 'Recruiter\'s  Last'
      },
      statusCode: 400,
      status: falseDataStatus
    }
  ],

  aboutCompany: [
    {
      it: 'As a recruiter user I should save with all required company info',
      options: {
        name: 'company name',
        brand: 'test brand',
        registeredNumber: 'test brand',
        vatNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        postcode: '380015',
        country: 'India',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        state: 'test state',
      },
      statusCode: 200,
      status: trueDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without company name',
      options: {
        brand: 'test brand',
        registeredNumber: 'test brand',
        vatNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        postcode: '380015',
        country: 'India',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        state: 'test state',
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without company brand',
      options: {
        name: 'company name',
        registeredNumber: 'test brand',
        vatNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        postcode: '380015',
        country: 'India',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        state: 'test state',
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without company registeredNumber',
      options: {
        name: 'company name',
        brand: 'test brand',
        vatNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        postcode: '380015',
        country: 'India',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        state: 'test state',
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without company vatNumber',
      options: {
        name: 'company name',
        brand: 'test brand',
        registeredNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        postcode: '380015',
        country: 'India',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        state: 'test state',
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without company postcode',
      options: {
        name: 'company name',
        brand: 'test brand',
        registeredNumber: 'test brand',
        vatNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        country: 'India',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        state: 'test state',
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without company country',
      options: {
        name: 'company name',
        brand: 'test brand',
        registeredNumber: 'test brand',
        vatNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        postcode: '380015',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        state: 'test state',
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without company city',
      options: {
        name: 'company name',
        brand: 'test brand',
        registeredNumber: 'test brand',
        vatNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        postcode: '380015',
        country: 'India',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        state: 'test state',
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without company addressLineOne',
      options: {
        name: 'company name',
        brand: 'test brand',
        registeredNumber: 'test brand',
        vatNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        postcode: '380015',
        country: 'India',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
        state: 'test state',
      },
      statusCode: 400,
      status: falseDataStatus
    }, {
      it: 'As a recruiter user I shouldn\'t be validated without company state',
      options: {
        name: 'company name',
        brand: 'test brand',
        registeredNumber: 'test brand',
        vatNumber: 'test brand',
        websiteUrl: 'http://www.codemonk.ai',
        postcode: '380015',
        country: 'India',
        addressLineOne: 'Some House, Some Buildding',
        addressLineTwo: 'Some Road, Somewhere',
        city: 'Ahmedabad',
      },
      statusCode: 400,
      status: falseDataStatus
    }
  ],

  saveLater: {
    firstStep: [
      {
        it: 'As a recruiter user I should save first name',
        options: {
          step: 1,
          firstName: 'Recruiter\'s Change'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save last name',
        options: {
          step: 1,
          firstName: 'Recruiter\'s Change',
          lastName: 'Recruiter\'s  Last'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save job title',
        options: {
          step: 1,
          firstName: 'Recruiter\'s Change',
          lastName: 'Recruiter\'s Last',
          jobTitle: 'CTO'
        },
        statusCode: 200,
        status: trueDataStatus
      }
    ],
    secondStep: [
      {
        it: 'As a recruiter user I should save company name',
        options: {
          step: 2,
          name: 'company name'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company Brand/Trading name',
        options: {
          step: 2,
          brand: 'test brand'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company registration number',
        options: {
          step: 2,
          registeredNumber: 'test brand'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company VAT/GST/Tax number',
        options: {
          step: 2,
          vatNumber: 'test brand'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company website',
        options: {
          step: 2,
          websiteUrl: 'http://www.codemonk.ai'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company post code',
        options: {
          step: 2,
          postcode: '380015'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company country',
        options: {
          step: 2,
          country: 'India'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company address line one',
        options: {
          step: 2,
          addressLineOne: 'Some House, Some Buildding'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company address line two',
        options: {
          step: 2,
          addressLineTwo: 'Some Road, Somewhere'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company city',
        options: {
          step: 2,
          city: 'Ahmedabad'
        },
        statusCode: 200,
        status: trueDataStatus
      }, {
        it: 'As a recruiter user I should save company city',
        options: {
          step: 2,
          state: 'test state'
        },
        statusCode: 200,
        status: trueDataStatus
      }
    ]
  }
}
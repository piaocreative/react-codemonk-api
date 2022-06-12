const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type LOCATION {
            addressLineOne: String!
            addressLineTwo: String!
            city: String!
            country: String!
            postcode: String!
        }
        
        type COMPANY_DETAILS {
            name: String!
            addressLineOne: String!
            addressLineTwo: String!
            city: String!
            country: String!
            postcode: String!
            registeredNumber: String!
            vatNumber: String!
            website: String!
            cultures: [String!]!
        }



        type BILLING {
            type: String!
            companyDetails : COMPANY_DETAILS!
            companyLocation : [LOCATION!]!
        }

        type INFOS {
            email: String!
            phoneNumber: String!
            countryCode: String!
            userId: String!
            signupStep: Int!
            role: Int!
            proxyUser: Boolean!
            isActive: Int!
            isDelete: Int!
            registerType: String!
            firstName: String!
            lastName: String!
            jobTitle: String!
            billing: BILLING!
            version: String!
        }        

        type RootQuery {
            events: [String!]!
            infos: INFOS!
        }

        schema {
            query: RootQuery
        }
    `);

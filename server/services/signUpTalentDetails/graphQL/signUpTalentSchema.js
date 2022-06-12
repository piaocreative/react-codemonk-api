const { buildSchema } = require('graphql')

module.exports = buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String) : String
            updateFirstName(firstName: String) : String
            updateLastName(lastName: String) : String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);

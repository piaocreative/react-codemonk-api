

const { graphqlHTTP } = require('express-graphql');
const schema = require('./signUpTalentSchema');
const resolver = require('./signUpTalentResolver');
module.exports = graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
});


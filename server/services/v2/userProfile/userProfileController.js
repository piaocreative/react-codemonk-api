
// const UserProfileService = require('./userProfileService');
// const Utils = require('../../util/utilFunctions');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./userProfileSchema');
const resolver = require('./userProfileResolver');


/**
 * Class represents controller for user Basic Profile.
 */
// class UserProfileController {

//     /**
//      * @desc This function is being used to get user details
//      * @author Innovify
//      * @since 08/06/2020
//      * @param {Object} req Request
//      * @param {Object} req.body RequestBody
//      * @param {function} res Response
//      */
//     static async getUserDetails (req, res) {
//         const data = await UserProfileService.getUserDetails(res.locals.user);
//         Utils.sendResponse(null, data, res, res.__('SUCCESS'));
//     }

// }

// module.exports = UserProfileController;

module.exports = graphqlHTTP({
    schema: schema,
    rootValue: resolver,
    graphiql: true
});

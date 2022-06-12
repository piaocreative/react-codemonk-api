const User = require('../../../models/user.model');
const UserProfileService = require('./userProfileService');


module.exports = {
    infos: async (args, req) => {
        return await UserProfileService.getUserDetails(req.res.locals.user);
    }
};

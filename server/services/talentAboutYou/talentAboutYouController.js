
const TalentAboutYouService = require('./talentAboutYouService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent Basic Profile.
 */
class TalentAboutYouController {

    static async saveUserPersonalDetails (req, res) {
        try {
            const data = await TalentAboutYouService
                .saveUserPersonalDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentAboutYouController;

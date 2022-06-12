
const TalentCountryWiseService = require('./talentCountryWiseService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for country wise count
 */
class TalentCountryWiseController {

    /**
     * @desc This function is being used to get talent count country wise
     * @author Innovify
     * @since 02/12/2020
     * @param {function} res Response
     */
    static async getTalentCount (req, res) {
        const data = await TalentCountryWiseService.talentCount();
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = TalentCountryWiseController;


const TalentRegisterTypeService = require('./talentRegisterTypeService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent register type selection.
 */
class TalentRegisterTypeController {

    /**
     * @desc This function is being used to talent register type selection.
     * @author Innovify
     * @since 06/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async talentRegisterType (req, res) {
        try {
            const data = await TalentRegisterTypeService.talentRegisterType(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('UPDATE_SUCCESS', 'Registration type'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = TalentRegisterTypeController;

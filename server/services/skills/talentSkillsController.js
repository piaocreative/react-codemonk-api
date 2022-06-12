
const SkillsService = require('./skillServices');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Skills.
 */
class SkillsController {
    /**
     * @desc This function is being used to Skills talent
     * @author Innovify
     * @since 26/05/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     * @param {Object} res Response
     */
    static async skills (req, res) {
        const data = await SkillsService.skills(req, res.__);
        Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    }
}

module.exports = SkillsController;

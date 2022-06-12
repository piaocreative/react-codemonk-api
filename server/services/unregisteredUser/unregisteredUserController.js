
const UnregisteredUserService = require('./unregisteredUserService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for talent list based in name search
 */
class UnregisteredUserController {

    /**
     * @desc This function is being used to get talent list based in name search
     * @author Innovify
     * @since 15/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async searchByEmail (req, res) {
        try {
            const data = await UnregisteredUserService.searchByEmail(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = UnregisteredUserController;

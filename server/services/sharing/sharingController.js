
const SharingService = require('./sharingService');

/**
 * Class represents controller for Talent details
 */
class SharingController {

    /**
     * @desc This function is being used to get talent details
     * @author Innovify
     * @since 17/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async profile (req, res, next) {
        await SharingService.profile(req, res, next);
    }
}

module.exports = SharingController;

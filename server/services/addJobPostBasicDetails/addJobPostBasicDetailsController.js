const AddJobPostBasicDetailsService = require('./addJobPostBasicDetailsService');
const Utils = require('../../util/utilFunctions');

class AddJobPostBasicDetailsController {

    static async addJobPostBasicDetails (req, res) {
        try {
            const data = await AddJobPostBasicDetailsService.addJobPostBasicDetails(req, res.locals.user, res.__);
            CONSOLE_LOGGER.info('Job POST basic-detail ', data.body);

            if (res.locals.user.role === CONSTANTS.ROLE.CLIENT) {
                Utils.sendResponse(null, data, res, res.__('CLIENT_ADD_BRIEF_SUCCESS', data.name));
            } else {
                Utils.sendResponse(null, data, res, res.__('ADD_BRIEF_SUCCESS', data.name));
            }
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = AddJobPostBasicDetailsController;

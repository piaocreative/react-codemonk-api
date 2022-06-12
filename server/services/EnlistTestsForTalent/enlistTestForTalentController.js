
const EnlistTestForTalentService = require('./enlistTestForTalentService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for agency upload multiple talents
 */
class EnlistTestForTalentController {

   static async enlistTests (req, res) {
        try {
            const data = await EnlistTestForTalentService.enlistTests(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

   
}

module.exports = EnlistTestForTalentController;

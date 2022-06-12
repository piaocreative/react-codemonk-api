
const CallbackOfTestForTalentService = require('./callbackOfTestForTalentService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for extract the test result
 */
class CallbackOfTestForTalentController {

   static async callbackTest (req, res) {
        try {
            const data = await CallbackOfTestForTalentService.callbackTest(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

   
}

module.exports = CallbackOfTestForTalentController;

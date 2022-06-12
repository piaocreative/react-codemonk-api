
const StartTestForTalentService = require('./startTestForTalentService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for start the tests
 */
class StartTestForTalentController {

   static async startTest (req, res) {
        try {
            const data = await StartTestForTalentService.startTest(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

   
}

module.exports = StartTestForTalentController;

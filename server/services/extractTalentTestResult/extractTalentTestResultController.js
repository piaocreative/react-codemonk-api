
const ExtractTestForTalentService = require('./extractTalentTestResultService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for extract the test result
 */
class ExtractTestForTalentController {

   static async extractTest (req, res) {
        try {
            const data = await ExtractTestForTalentService.extractTest(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

   
}

module.exports = ExtractTestForTalentController;

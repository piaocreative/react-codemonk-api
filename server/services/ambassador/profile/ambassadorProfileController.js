const AmbassadorProfileService = require('./ambassadorProfileService');
const Utils = require('../../../util/utilFunctions');

class AmbassadorProfileController {

  /**
   * @desc This function returns ambassador details based on id
   * @author CodeMonk
   * @since 15/02/2022
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {function} res Response
   */
  static async details (req, res) {
    try {
      const data = await AmbassadorProfileService.details(req, res.__);
      Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    } catch (error) {
      Utils.sendResponse(error, null, res, error.message);
    }
  }

  /**
   * @desc This function updates ambassador about you
   * @since 16/02/2021
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {Object} res Response
   */
  static async updateAmbassadorAboutYou(req, res) {
    try {
      const data = await AmbassadorProfileService.updateAmbassadorAboutYou(req, res.locals.user, res.__);
      Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }

  /**
   * @desc This function updates ambassador about company
   * @since 16/02/2022
   * @param {Object} req  Request
   * @param {Object} req.body RequestBody
   * @param {Object} res  Response
   */
  static async updateAmbassadorAboutCompany(req, res) {
    try {
      const data = await AmbassadorProfileService.updateAmbassadorAboutCompany(req, res.locals.user, res.__);
      Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }

  /**
   * @desc This function updates ambassador profile partial save-later
   * @author CodeMonk
   * @since 17/02/2022
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {Object} res Response
   */
  static async updateAmbassadorProfileSaveLater(req, res) {
    try {
      const data = await AmbassadorProfileService.updateAmbassadorSaveLater(req, res.locals.user, res.__);
      Utils.sendResponse(null, data, res, 'The data is saved successfully.');
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }
}

module.exports = AmbassadorProfileController;

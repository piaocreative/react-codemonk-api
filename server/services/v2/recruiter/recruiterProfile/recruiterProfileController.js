
const RecruiterProfileService = require('./recruiterProfileService');
const Utils = require('../../../../util/utilFunctions');

/**
 * Class represents controller for job post details based on it's id
 */
class RecruiterProfileController {

  /**
   * @desc This function is being used to update recruiter about you
   * @since 16/02/2021
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {Object} res Response
   */
  static async updateRecruiterAboutYou(req, res) {
    try {
      const data = await RecruiterProfileService.updateRecruiterAboutYou(req, res.locals.user, res.__);
      Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }

  /**
   * @desc This function is being used to update recruiter about company
   * @since 16/02/2022
   * @param {Object} req  Request
   * @param {Object} req.body RequestBody
   * @param {Object} res  Response
   */
  static async updateRecruiterAboutCompany(req, res) {
    try {
      const data = await RecruiterProfileService.updateRecruiterAboutCompany(req, res.locals.user, res.__);
      Utils.sendResponse(null, data, res, res.__('SUCCESS'));
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }

  /**
   * @desc This function is being used to update recruiter profile partial save-Later
   * @author CodeMonk
   * @since 17/02/2022
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {Object} res Response
   */
  static async updateRecruiterProfileSaveLater(req, res) {
    try {
      const data = await RecruiterProfileService.updateRecruiterSaveLater(req, res.locals.user, res.__);
      Utils.sendResponse(null, data, res, 'The data is saved successfully.');
    } catch (error) {
      Utils.sendResponse(error, null, res, '');
    }
  }
}

module.exports = RecruiterProfileController;

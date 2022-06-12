const validation = require('../validation');
const JobPost = require('../../models/jobPost.model');
const mongoose = require('mongoose');
/**
 * Class represents validations for Talent register type selection.
 */
class TalentSearchValidator extends validation {
  constructor(body, local) {
    super(local);
    this.body = body;
  }

  /**
   * @desc This function is being used to validate check talent register type
   * @author Innovify
   * @since 26/08/2020
   */
  async validationJobPostId(jobPostId, userId) {
    let jobOne = [];
    if (jobPostId && userId) {
      jobOne = await JobPost.find(
        { _id: mongoose.Types.ObjectId(jobPostId), "clientId": userId }, { _id: 1 }
      ).lean();
    }
    if (!jobOne.length) {
      console.log('...............................')
      throw new CodeMonkError(this.__('ACCESS_DENIED', 'Client'), 400);
    }
  }
}

module.exports = TalentSearchValidator;

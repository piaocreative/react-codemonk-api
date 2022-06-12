const mongoose = require('mongoose');
const JobPost = require('../../../../models/jobPost.model');
const TalentStatusChangeValidator = require('../talentStatusChange/talentStatusChangeValidator');
const TalentStatusChangeSecondService = require('../talentStatusChange/talentStatusChangeSecondService');
const AdminInterviewChangeTalentStatusSecondService =
  require('../../../adminInterviewChangeTalentStatus/adminInterviewChangeTalentStatusSecondService');
const {
  ROLE: { CLIENT },
  BRIEF: { TALENT: {
    STATUS: { SHORTLISTED, HIRED, REJECTED }
  } }
} = require('../../../../util/constants');

/**
 * Class represents services for job post talent status change
 */
class TalentStatusAddHelper {

  /**
   * @desc This function is being used to update jobpost's application with adding new talent.
   * @author CodeMonk
   * @since 08/03/2022
   * @param {Object} jobPostId jobpost id
   * @param {Object} newApplicationData talent data that will be added in jobpost's application
   * @param {String} user logged in user data
   * @param {Number} status status that will be added
   */
  static async updateJobPostApplicationAdd(newApplicationData, jobPostId, user, local) {
    const { role: userRole, _id: userId } = user;
    const { talentId } = newApplicationData;

    // Validate if talent is already exists in a jobpost.
    const where = {
      _id: mongoose.Types.ObjectId(jobPostId)
    };
    const jobPostExists = await JobPost.findOne(where).lean();
    if (!jobPostExists) {
      throw new CodeMonkError(local('FIELD_NOT_VALID', 'JobPostId'), 400);
    }
    if (Array.isArray(jobPostExists.applications)) {
      const talentExists = jobPostExists.applications.some(item =>
        JSON.stringify(item.talentId) === JSON.stringify(talentId)
      );
      if (talentExists) {
        throw new CodeMonkError(local('TALENT_ALREADY_EXISTS_PROJECT'), 400);
      }
    }

    if (userRole === CLIENT) {
      if (JSON.stringify(userId) !== JSON.stringify(jobPostExists.clientId)) {
        throw new CodeMonkError(local('FIELD_NOT_VALID', 'ClientId'), 400);
      }
      where.clientId = userId;
    }

    const updatedData = await JobPost.findOneAndUpdate(where, {
      $addToSet: {
        applications: newApplicationData
      }
    }, { upsert: true, returnOriginal: false });
    return updatedData;
  }

}

module.exports = TalentStatusAddHelper;

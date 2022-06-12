const mongoose = require('mongoose');
const Validator = require('../../../validation');
const User = require('../../../../models/user.model');
const Recruiter = require('../../../../models/recruiter.model');
const UploadService = require('../../../../util/uploadService');
const AddCompanyValidator = require('../../addCompany/addCompanyValidator');
const RecruiterProfileValidator = require('./recruiterProfileValidator');
const EngageBay = require('../../../engageBay/engageBay');
const utils = require('../../../../util/utilFunctions');
const AddCompanyService = require('../../addCompany/addCompanyService');

/**
 * Class represents services for recruiter profile Details
 */
class RecruiterProfile {
  /**
   * @desc This function is being used to update recruiter profile
   * @author CodeMonk
   * @since 16/02/2021
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {object} user Logged in recruiter user data
   */
  static async updateRecruiterAboutYou(req, user, local) {
    const Validator = new RecruiterProfileValidator(req.body, local);
    await Validator.profile();

    const signupStep = await this.getRecruiterSignupStepFromUserId(user._id);
    let updateData = await this.getUpdateStepData(req, user, local, '1');
    updateData = {
      ...updateData,
      registerType: CONSTANTS.RECRUITER.REGISTER_TYPE[1],
      version: 'v2',
      ...(user && signupStep && signupStep < CONSTANTS.RECRUITER.REGITRATION_STATUS.BASIC_PROFILE &&
        { signupStep: CONSTANTS.RECRUITER.REGITRATION_STATUS.BASIC_PROFILE })
    };

    const recruiter = await Recruiter.findOneAndUpdate({userId: mongoose.Types.ObjectId(user._id) },
      { $set: updateData }, { new: true }).lean();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    
    return _.merge(user, recruiter);
  }

  /**
   *
   * @author CodeMonk
   * @since 16/02/2021
   * @param {Object} data
   * @returns
   */
  static async updateRecruiterAboutCompany(req, user, local) {
    const Validator = new RecruiterProfileValidator(req.body, local);
    await Validator.companyDetails();

    const signupStep = await this.getRecruiterSignupStepFromUserId(user._id);
    let updateData = await this.getUpdateStepData(req, user, local, '2');
    updateData = {
      ...updateData,
      registerType: CONSTANTS.RECRUITER.REGISTER_TYPE[1],
      version: 'v2',
      ...(user && signupStep && signupStep === CONSTANTS.RECRUITER.REGITRATION_STATUS.BASIC_PROFILE &&
        { signupStep: CONSTANTS.RECRUITER.REGITRATION_STATUS.COMAPNY_DETAIL })
    };

    return await Recruiter.findOneAndUpdate({ userId: mongoose.Types.ObjectId(user._id) },
      { $set: updateData }, { new: true }).lean();
  }

  /**
   * @desc This function is being used to get signupStep from Recruiter user
   * @author CodeMonk
   * @since 16/02/2021
   * @param {object} id userId
   */
  static async getRecruiterSignupStepFromUserId(id) {
    const res = await Recruiter.findOne({ userId: id }, ['-_id', 'signupStep']).lean();
    return res ? res.signupStep : 0;
  }

  /**
   * @desc This function is being used to update recruiter profile partial save later
   * @author CodeMonk
   * @since 17/02/2022
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {object} user Logged in recruiter user data
   */
  static async updateRecruiterSaveLater(req, user, local) {
    const Validator = new RecruiterProfileValidator(req.body, local);
    await Validator.validateExisting();
    const updateData = await this.getUpdateStepData(req, user, local, req.body.step);
    let recruiter = await Recruiter.findOneAndUpdate({ userId: mongoose.Types.ObjectId(user._id) },
      { $set: updateData }, { new: true }).lean();
    if(req.body.step === '1') {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      recruiter = _.merge(user, recruiter)
    }
    return recruiter;
  }

  /**
   * @desc This function is being used to upload profile picture
   * @author CodeMonk
   * @since 17/02/2022
   * @param {Object} logoFile uploaded file
   * @param {Object} fileName fileName to be saved
   * @param {Function} local function for i18n
   */
  static async uploadLogo(logoFile, fileName, local) {
    const LogoValidator = new AddCompanyValidator(logoFile, local);
    await LogoValidator.validateLogo();
    await UploadService.uploadFile(logoFile, fileName);
    return `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
  }

  /**
   * @desc This function is being used to prepare talent object based on input to update data
   * @author CodeMonk
   * @since 17/02/2022
   * @param {Object} data data
   * @return {Object} updateData updateData
   */
  static async getUpdateStepData(req, user, local, step) {
    let updateData = {};
    switch (step) {
      case '1':
        const updateUserData = {};
        if (req.file) {
          const fileName = `${process.env.NODE_ENV}-proflie-pictures/${user._id}`;
          user.profilePicture = updateUserData.profilePicture = await this.uploadLogo(req.file, fileName, local);
        }
        updateUserData.firstName = req.body.firstName;
        updateUserData.lastName = req.body.lastName;
        updateData.jobTitle = req.body.jobTitle;

        await User.updateOne({
          _id: mongoose.Types.ObjectId(user._id)
        }, {
          $set: updateUserData
        });
        break;
      case '2':
        updateData = {
          ['billing.type']: CONSTANTS.RECRUITER.REGISTER_TYPE[1],
          ['billing.companyDetails.name']: req.body.name,
          ['billing.companyDetails.brand']: req.body.brand,
          ['billing.companyDetails.registeredNumber']: req.body.registeredNumber,
          ['billing.companyDetails.vatNumber']: req.body.vatNumber,
          ['billing.companyDetails.websiteUrl']: _.get(req.body, 'websiteUrl', undefined),
          ['billing.companyDetails.linkedInUrl']: _.get(req.body, 'linkedInUrl', undefined),
          ['billing.companyLocation.postcode']: req.body.postcode,
          ['billing.companyLocation.country']: req.body.country,
          ['billing.companyLocation.addressLineOne']: req.body.addressLineOne,
          ['billing.companyLocation.addressLineTwo']: req.body.addressLineTwo,
          ['billing.companyLocation.city']: req.body.city,
          ['billing.companyLocation.state']: req.body.state
        };

        const resultCompany = await AddCompanyService.getAddedOrUpdatedCompany(
          req.body.name,
          req.body.country,
          req.file,
          local
        );
        if (Object.entries(resultCompany).length > 0) {
          updateData[['companyId']] = mongoose.Types.ObjectId(resultCompany._id);
          updateData[['billing.companyDetails.logo']] = resultCompany.logo;
        };
        break;
    }

    return updateData;
  }
}

module.exports = RecruiterProfile;

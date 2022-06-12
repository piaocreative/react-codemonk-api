const mongoose = require('mongoose');
const Validator = require('../../validation');
const User = require('../../../models/user.model');
const Ambassador = require('../../../models/ambassador.model');
const UploadService = require('../../../util/uploadService');
const AddCompanyValidator = require('../../v2/addCompany/addCompanyValidator');
const AmbassadorProfileValidator = require('./ambassadorProfileValidator');
const AmbassadorSaveLaterValidator = require('./ambassadorSaveLaterValidator');
const AddCompanyService = require('../../v2/addCompany/addCompanyService');
const Utils = require('../../../util/utilFunctions');


class AmbassadorProfile {

  /**
   * @desc This function returns ambassador details based on id
   * @author CodeMonk
   * @since 15/02/2022
   * @param {Object} req Request
   * @param local
   * @param {String} req.params params ambassador id
   */
  static async details (req, local) {
    const Valid = new Validator( local);
    await Valid.checkId(req.params.id);

    const aggregateParams = [{
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id)
      }
    }, {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'ambassadorDetails'
      }
    }, {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{
            $arrayElemAt: [
              '$ambassadorDetails', 0
            ]
          }, '$$ROOT']
        }
      }
    }, {
      $project: {
        ambassadorUserId: '$userId',
        registerType: 1,
        firstName: 1,
        lastName: 1,
        jobTitle: 1,
        postcode: 1,
        timeZone: 1,
        addressLineOne: 1,
        addressLineTwo: 1,
        city: 1,
        country: 1,
        billing: 1,
        authority: 1,
        pay: 1,
        status: Utils.getUserStatusForRecruiter()
      }
    }];
    const ambassador = await Ambassador.aggregate(aggregateParams);

    if (!ambassador.length) {
      throw new CodeMonkError(local('INVALID_AMBASSADOR_ID'), 400);
    }

    return ambassador[0];
  }

  /**
   * @desc This function updates ambassador profile (about)
   * @author CodeMonk
   * @since 16/02/2021
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {object} user Logged in ambassador user data
   * @param local
   */
  static async updateAmbassadorAboutYou(req, user, local) {
    const Validator = new AmbassadorProfileValidator(req.body, local);
    await Validator.profile();

    const signupStep = await this.getAmbassadorSignupStepFromUserId(user._id);
    let updateData = await this.getUpdateStepData(req, user, local, '1');

    if (user && signupStep < CONSTANTS.AMBASSADOR.REGISTRATION_STATUS.BASIC_PROFILE)
        updateData.signupStep = CONSTANTS.AMBASSADOR.REGISTRATION_STATUS.BASIC_PROFILE

    updateData = {
      ...updateData,
      registerType: CONSTANTS.AMBASSADOR.REGISTER_TYPE[1]
    };

    const ambassador = await Ambassador.findOneAndUpdate({userId: mongoose.Types.ObjectId(user._id) },
      { $set: updateData }, { new: true }).lean();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    return _.merge(user, ambassador);
  }

  /**
   *
   * @desc This function updates ambassador profile (company)
   * @author CodeMonk
   * @since 16/02/2021
   * @returns
   * @param req
   * @param user
   * @param local
   */
  static async updateAmbassadorAboutCompany(req, user, local) {
    const Validator = new AmbassadorProfileValidator(req.body, local);
    await Validator.companyDetails();

    const signupStep = await this.getAmbassadorSignupStepFromUserId(user._id);
    let updateData = await this.getUpdateStepData(req, user, local, '2');

    if (user && signupStep < CONSTANTS.AMBASSADOR.REGISTRATION_STATUS.COMPANY_DETAIL)
        updateData.signupStep = CONSTANTS.AMBASSADOR.REGISTRATION_STATUS.COMPANY_DETAIL

    updateData = {
      ...updateData,
      registerType: CONSTANTS.AMBASSADOR.REGISTER_TYPE[1]
    };

    return await Ambassador.findOneAndUpdate({ userId: mongoose.Types.ObjectId(user._id) },
      { $set: updateData }, { new: true }).lean();
  }

  /**
   * @desc This function returns signupStep from ambassador user
   * @author CodeMonk
   * @since 16/02/2021
   * @param {object} id userId
   */
  static async getAmbassadorSignupStepFromUserId(id) {
    const res = await Ambassador.findOne({ userId: id }, ['-_id', 'signupStep']).lean();
    return ( res && res.signupStep) ? res.signupStep : 0;
  }

  /**
   * @desc This function updates ambassador profile partially
   * @author CodeMonk
   * @since 17/02/2022
   * @param {Object} req Request
   * @param {Object} req.body RequestBody
   * @param {object} user Logged in ambassador user data
   * @param local
   */
  static async updateAmbassadorSaveLater(req, user, local) {
    const SLValidator = new AmbassadorSaveLaterValidator(req.body, local);
    await SLValidator.validateStep(req.body.step);
    const updateData = await this.getUpdateStepData(req, user, local, req.body.step);
    let ambassador = await Ambassador.findOneAndUpdate({ userId: mongoose.Types.ObjectId(user._id) },
      { $set: updateData }, { new: true }).lean();
    if(req.body.step === '1') {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      ambassador = _.merge(user, ambassador)
    }
    return ambassador;
  }

  /**
   * @desc This function uploads profile picture
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
   * @return {Object} updateData updateData
   * @param req
   * @param user
   * @param local
   * @param step
   */
  static async getUpdateStepData(req, user, local, step) {
    let updateData = {};
    switch (step) {
      case '1':
        const updateUserData = {};
        if (req.file) {
          const fileName = `${process.env.NODE_ENV}-profile-pictures/${user._id}`;
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
          ['billing.type']: CONSTANTS.AMBASSADOR.REGISTER_TYPE[1],
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

        if (req.body.name && req.body.country) {
          const resultCompany = await AddCompanyService.getAddedOrUpdatedCompany(
              req.body.name,
              req.body.country,
              req.file,
              local
          );

          if (Object.entries(resultCompany).length > 0) {
            updateData[['companyId']] = mongoose.Types.ObjectId(resultCompany._id);
            updateData[['billing.companyDetails.logo']] = resultCompany.logo;
          }
        }
        break;
    }

    return updateData;
  }
}

module.exports = AmbassadorProfile;

const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Talent = require('../../models/talent.model');
const TalentAboutYouValidator = require('./talentAboutYouValidator');
const AddTestForTalentService = require('../addTestForTalent/addTestForTalentService');
const utils = require('../../util/utilFunctions');
const TalentEventlogRecordService = require('../v2/talentEventlogRecord/talentEventlogRecordService');

/**
 * Class represents services for Talent About You.
 */
class TalentAboutYouService {
    /**
     * @desc This function is being used to update talent about you
     * @author Codemonk
     * @since 30/09/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {function} res Response
     * @param {function} next exceptionHandler
     */
    static async saveUserPersonalDetails (req, user, local) {
        const Validator = new TalentAboutYouValidator(req.body, local);
        await Validator.validationPersonalDetails();
        var dob = req.body.dob;
        var data = dob.split('/');

        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            countryCode: req.body.countryCode,
            phoneNumber: req.body.phoneNumber
        });

        const updateData = {
            userId: mongoose.Types.ObjectId(user._id),
            dob: MOMENT(data[2] + '-' + data[1] + '-' + data[0]).utc(),
            gender: req.body.gender,
            postcode: req.body.postcode,
            addressLineOne: req.body.addressLineOne,
            addressLineTwo: req.body.addressLineTwo,
            city: req.body.city,
            country: req.body.country,
            state: req.body.state ? req.body.state : '',
            language: req.body.language,
            timeZone: req.body.timeZone,
            linkedInUrl: (req.body.linkedInUrl) ? req.body.linkedInUrl : '',
            gitHubUrl: (req.body.gitHubUrl) ? req.body.gitHubUrl : '',
            stackOverFlowUrl: (req.body.stackOverFlowUrl) ? req.body.stackOverFlowUrl : '',
            dribbbleUrl: (req.body.dribbbleUrl) ? req.body.dribbbleUrl : '',
            behanceUrl: (req.body.behanceUrl) ? req.body.behanceUrl : '',
            portfolioUrl: (req.body.portfolioUrl) ? req.body.portfolioUrl : '',
            primaryRole: req.body.primaryRole,
            yearsOfExperience: req.body.yearsOfExperience,
            experienceOrder: CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(req.body.yearsOfExperience)
        };
        const oldUserStep = user.signupStep;

        const signupStep = utils.getSignupStep(user, CONSTANTS.TALENT.V2.REGITRATION_STATUS.ABOUT_YOU);
        if (signupStep) {
            updateData.signupStep = signupStep;
        }

        const talent = await Talent.findOneAndUpdate({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        }, { new: true });

        if (!(user && user.signupStep && user.signupStep >= 5)) {
            TalentAboutYouService.registerCandidate(user._id, req.body.firstName + ' ' + req.body.lastName, user.email);
        }

        await utils.profileEditLog(talent, oldUserStep);
        await utils.profileCompleteLog(talent, oldUserStep);

        return talent;
    }


    static async registerCandidate (id, name, email) {
        const response = await AddTestForTalentService.registerCandidate(id, name, email);
        await Talent.updateOne({ userId: id }, {
            $set: {
                candidateToken: response.body.accessToken
            }
        });
    }
}

module.exports = TalentAboutYouService;

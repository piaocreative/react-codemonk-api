const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Talent = require('../../models/talent.model');
const TalentBasicProfileValidator = require('./talentBasicProfileValidator');
const AddTestForTalentService = require('../addTestForTalent/addTestForTalentService')

/**
 * Class represents services for Talent Basic Profile.
 */
class TalentBasicProfileService {
    /**
     * @desc This function is being used to update talent personal details
     * @author Innovify
     * @since 02/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.password password
     * @param {function} res Response
     * @param {function} next exceptionHandler
     */
    static async saveUserPersonalDetails (req, user, local) {
        const Validator = new TalentBasicProfileValidator(req.body, local);
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

        const talent = await Talent.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                userId: mongoose.Types.ObjectId(user._id),
                dob: MOMENT(data[2] + '-' + data[1] + '-' + data[0]).utc(),
                gender: req.body.gender,
                postcode: req.body.postcode,
                addressLineOne: req.body.addressLineOne,
                addressLineTwo: req.body.addressLineTwo,
                city: req.body.city,
                country: req.body.country,
                language: req.body.language,
                timeZone: req.body.timeZone,
                signupStep: CONSTANTS.TALENT.REGITRATION_STATUS.BASIC_PROFILE
            }
        });
        TalentBasicProfileService.registerCandidate(user._id, req.body.firstName + ' ' + req.body.lastName, user.email)
        return talent;
    }


    static async registerCandidate(id, name, email) {
        const response = await AddTestForTalentService.registerCandidate(id, name, email)
        await Talent.updateOne({ userId: id }, {
            $set: {
                candidateToken: response.body.accessToken
            }
        });
    }
}

module.exports = TalentBasicProfileService;

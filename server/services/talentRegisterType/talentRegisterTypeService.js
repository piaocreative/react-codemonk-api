const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Talent = require('../../models/talent.model');
const Agency = require('../../models/agency.model');
const TalentRegisterTypeValidator = require('./talentRegisterTypeValidator');
const EngageBay = require('../engageBay/engageBay');

/**
 * Class represents services for Talent register type selection.
 */
class TalentRegisterTypeService {
    /**
     * @desc This function is being used to talent register type selection.
     * @author Innovify
     * @since 06/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async talentRegisterType (req, user, local) {
        const Validator = new TalentRegisterTypeValidator(req.body, local);
        Validator.validationRegisterType(req.body.registerType);
        let role = 1;
        if (req.body.registerType === CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'Register Type'), 400);
        } else if (req.body.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY) {
            role = 3;
            await Talent.deleteOne({
                userId: mongoose.Types.ObjectId(user._id)
            });

            await Agency.findOneAndUpdate({
                userId: mongoose.Types.ObjectId(user._id)
            }, {
                $set: {
                    userId: mongoose.Types.ObjectId(user._id),
                    signupStep: CONSTANTS.TALENT.REGITRATION_STATUS.INITIAL_TYPE_STAGE,
                    isActive: 1
                }
            }, { upsert: true });
            EngageBay.updateEngageBayContactTags(user.email, ['agency', 'incomplete']);
        }

        await User.updateOne({
            _id: mongoose.Types.ObjectId(user._id)
        }, {
            role
        });
    }
}

module.exports = TalentRegisterTypeService;

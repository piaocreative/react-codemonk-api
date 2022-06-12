const mongoose = require('mongoose');
const Talent = require('../../models/talent.model');
const TalentProfessionalProfileValidator = require('./talentProfessionalProfileValidator');
const { addSkill } = require('../skills/skillServices');

/**
 * Class represents services for Talent Professional Profile.
 */
class TalentProfessionalProfileService {

    /**
     * @desc This function is being used to save professional details of talent
     * @author Innovify
     * @since 04/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.professionalSummary professionalSummary
     * @param {Object} req.body.linkedInUrl linkedInUrl
     * @param {Object} req.body.gitHubUrl gitHubUrl
     * @param {Object} req.body.stackOverFlowUrl stackOverFlowUrl
     * @param {Object} req.body.primaryRole primaryRole
     * @param {Object} req.body.yearsOfExperience yearsOfExperience
     * @param {Object} req.body.skills skills
     * @param {function} res Response
     * @param {function} next exceptionHandler
     */
    static async saveUserProfessionalDetails(req, user, local) {
        const Validator = new TalentProfessionalProfileValidator(req.body, local);
        await Validator.validationProfessionalDetails();
        await Talent.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                //professionalSummary: req.body.professionalSummary,
                linkedInUrl: (req.body.linkedInUrl) ? req.body.linkedInUrl : '',
                gitHubUrl: (req.body.gitHubUrl) ? req.body.gitHubUrl : '',
                stackOverFlowUrl: (req.body.stackOverFlowUrl) ? req.body.stackOverFlowUrl : '',
                dribbbleUrl: (req.body.dribbbleUrl) ? req.body.dribbbleUrl : '',
                behanceUrl: (req.body.behanceUrl) ? req.body.behanceUrl : '',
                portfolioUrl: (req.body.portfolioUrl) ? req.body.portfolioUrl : '',
                primaryRole: req.body.primaryRole,
                yearsOfExperience: req.body.yearsOfExperience,
                experienceOrder: CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(req.body.yearsOfExperience),
               // skills: req.body.skills,
                signupStep: CONSTANTS.TALENT.REGITRATION_STATUS.PROFESSIONAL_PROFILE
            }
        });
       // addSkill(req.body.skills.map(s => s.name));
    }
}

module.exports = TalentProfessionalProfileService;

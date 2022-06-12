const mongoose = require('mongoose');
const Talent = require('../../../models/talent.model');
const TalentProjectDetailsValidator = require('./talentProjectDetailsValidator');
const { addSkill } = require('../../skills/skillServices');

/**
 * Class represents services for Talent Project Details.
 */
class TalentProjectDetailsService {
    /**
     * @desc This function is being used to store project details of talent user
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async saveProjectDetails(req, user, local) {
        const Validator = new TalentProjectDetailsValidator(req.body, local);
        await Validator.validationProjectDetails();

        let skills = [];
        req.body.projectDetails.forEach(function (p) {
            skills.forEach(function (s) {
                let foundSkill = p.skills.filter(ps => ps.name === s.name)
                foundSkill.forEach(function (fs) {
                    s.rate = (s.rate  + fs.rate) / 2.0
                })
            });
            skills = skills.concat(p.skills.filter(ps => skills.length == 0 || !skills.some(s => s.name === ps.name)));
        });

        skills.sort((a, b) => {
            return b.rate - a.rate;
        });

        skills.forEach(function (s) {
            s.rate = Math.round(s.rate)
        });

        const talent = await Talent.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                projectDetails: req.body.projectDetails,
                signupStep: CONSTANTS.TALENT.REGITRATION_STATUS.PROJECT_DETAIL,
                skills: skills
            }
        });

        addSkill(skills.map(s => s.name));
        return talent;
    }
}

module.exports = TalentProjectDetailsService;

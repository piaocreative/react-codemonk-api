const mongoose = require('mongoose');
const Talent = require('../../models/talent.model');
const TalentWorkExperienceDetailsValidator = require('./talentWorkExperienceDetailsValidator');

/**
 * Class represents services for Talent Work Experience Details.
 */
class TalentWorkExperienceDetailsService {

    /**
     * @desc This function is being used to store work experience details of talent user
     * @author Innovify
     * @since 15/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.workExperience workExperience
     * @param {function} res Response
     * @param {function} next exceptionHandler
     */
    static async saveUserWorkExperienceDetails (req, user, local) {
        const Validator = new TalentWorkExperienceDetailsValidator(req.body, local);
        await Validator.validationWorkExperienceDetails();

        const updateData =
            await TalentWorkExperienceDetailsService.prepareWorkExperienceUpdateData(req.body);
        await Talent.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        });
    }

    /**
     * @desc This function is being to prepare string date
     *  to date object for talent education details
     * @author Innovify
     * @since 15/06/2020
     * @param {Object} data data
     */
    static prepareWorkExperienceUpdateData (data) {
        data.workExperience.map((d) => {
            const startDate = d.startDate;
            const startDateArray = startDate.split('/');
            const startDateParsed =
                Date.parse(startDateArray[2] + '-' + startDateArray[1] + '-' + startDateArray[0]);
            d.startDate = MOMENT(startDateParsed).utc();

            const endDate = d.endDate;
            const endDateArray = endDate.split('/');
            const endDateParsed =
                Date.parse(endDateArray[2] + '-' + endDateArray[1] + '-' + endDateArray[0]);
            d.endDate = MOMENT(endDateParsed).utc();
        });

        data.signupStep = CONSTANTS.TALENT.REGITRATION_STATUS.WORK_EXPERIENCE_DETAIL;
        return data;
    }

}

module.exports = TalentWorkExperienceDetailsService;

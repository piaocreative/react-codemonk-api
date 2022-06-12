const mongoose = require('mongoose');
const TalentWorkExperienceDetailsValidator = require('../talentWorkExperienceDetail/talentWorkExperienceDetailsValidator');

/**
 * Class represents services for talent prepare update object for work experience talent details.
 */
class TalentPrepareEditData {

    /**
     * @desc This function is being used to common work experience validation
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} data
     * @return {Object}
     */
    static async prepareWorkExperienceCommonValidation(data, local) {
        const workExperienceValidator = new TalentWorkExperienceDetailsValidator(data, local);
        workExperienceValidator.checkDate(data.startDate, 'Start date');
        workExperienceValidator.checkDate(data.endDate, 'End date');
        await workExperienceValidator.country(data.country);
        await workExperienceValidator.checkEmploymentType(data.employmentType);
        await workExperienceValidator.checkEmployer(data.employer);
        await workExperienceValidator.checkJobTitle(data.jobTitle);
        await workExperienceValidator.checkShortDescription(data.shortDescription);
    }

    /**
     * @desc This function is being used to validate and prepare talent work experience to update
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareWorkExperienceAdd(data, local, company) {
        const workExperienceValidator = new TalentWorkExperienceDetailsValidator(data, local);
        await this.prepareWorkExperienceCommonValidation(data, local);
        const startDate = workExperienceValidator.checkDate(data.startDate, 'Start date');
        const endDate = workExperienceValidator.checkDate(data.endDate, 'End date');
        await workExperienceValidator.checkStartEndDate(startDate, endDate);
        return {
            $push: {
                workExperience: {
                    $each: [{
                        jobTitle: data.jobTitle,
                        employmentType: data.employmentType,
                        employer: data.employer,
                        country: data.country,
                        startDate: MOMENT(startDate).utc(),
                        endDate: MOMENT(endDate).utc(),
                        shortDescription: data.shortDescription,
                        isPresent: (typeof data.isPresent !== 'undefined') ? data.isPresent : false,
                        logo: company.logo
                    }],
                    $position: 0
                }
            }
        };
    }

    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareWorkExperienceDelete(data, local) {
        const workExperienceValidator = new TalentWorkExperienceDetailsValidator(null, local);
        await workExperienceValidator.checkId(data._id);
        return {
            $pull: {
                workExperience: {
                    _id: mongoose.Types.ObjectId(data._id)
                }
            }
        };
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareWorkExperienceEdit(data, local,company) {
        const workExperienceValidator = new TalentWorkExperienceDetailsValidator(data, local);
        await this.prepareWorkExperienceCommonValidation(data, local);
        const startDate = workExperienceValidator.checkDate(data.startDate, 'Start date');
        const endDate = workExperienceValidator.checkDate(data.endDate, 'End date');
        await workExperienceValidator.checkStartEndDate(startDate, endDate);
        await workExperienceValidator.checkId(data._id);
        return {
            $set: {
                'workExperience.$.jobTitle': data.jobTitle,
                'workExperience.$.employmentType': data.employmentType,
                'workExperience.$.employer': data.employer,
                'workExperience.$.country': data.country,
                'workExperience.$.startDate': MOMENT(startDate).utc(),
                'workExperience.$.endDate': MOMENT(endDate).utc(),
                'workExperience.$.shortDescription': data.shortDescription,
                'workExperience.$.isPresent': (typeof data.isPresent !== 'undefined') ? data.isPresent : false,
                'workExperience.$.logo':company.logo
            }
        };
    }

    /**
     * @desc This function is being used to validate talent id for agency edit their details
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} talentId talentId of that user that agency want to update them
     */
    static async checkTalentId(talentId, local) {
        const Validator = new TalentWorkExperienceDetailsValidator(null, local);
        await Validator.checkId(talentId);
    }
}

module.exports = TalentPrepareEditData;

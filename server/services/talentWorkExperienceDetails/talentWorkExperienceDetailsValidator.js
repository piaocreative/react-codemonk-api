const validation = require('../validation');
/**
 * Class represents validations for Talent Work Experience Details.
 */
class TalentWorkExperienceDetailsValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate work experience details user input
     * @author Innovify
     * @since 15/06/2020
     */
    async validationWorkExperienceDetails () {
        await this.workExperience(this.body.workExperience);
    }

    /**
     * @desc This function is being used to validate workExperience details
     * @author Innovify
     * @since 15/06/2020
     * @param {Object} workExperience workExperience of user
     */
    async workExperience (workExperience, required = true) {
        if (!Array.isArray(workExperience)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Work Experience'), 400);
        }
        if (required && !workExperience.length) {
            throw new CodeMonkError(this.__(this.SELECT, 'Work Experience'), 400);
        }
        await this.workExperienceEach(workExperience);
    }

    /**
     * @desc This function is being used to validate work experience each object
     * @author Innovify
     * @since 10/06/2020
     * @param {Object} workExperience workExperience of user
     */
    async workExperienceEach (workExperience) {
        return Promise.all(workExperience.map(async (l) => {
            await this.checkJobTitle(l.jobTitle);
            await this.checkEmploymentType(l.employmentType);
            await this.checkEmployer(l.employer);
            await super.country(l.country);
            const startDate = super.checkDate(l.startDate, 'Start Date');
            const endDate = super.checkDate(l.endDate, 'End Date');
            await super.checkStartEndDate(startDate, endDate);
            await this.checkShortDescription(l.shortDescription);
        }));
    }

    /**
     * @desc This function is being used to validate workExperience employement type
     * @author Innovify
     * @since 15/06/2020
     * @param {String} employmentType employmentType of user
     */
    async checkEmploymentType (employmentType) {
        if (!employmentType || !_.includes(CONSTANTS.EMPLOYMENT_TYPE, employmentType)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Employment type'), 400);
        }
    }

    /**
     * @desc This function is being used to validate workExperience employer
     * @author Innovify
     * @since 15/06/2020
     * @param {String} employer employer of user
     */
    async checkEmployer (employer) {
        if (!employer) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Employer'), 400);
        }
        const { MIN, MAX } = CONSTANTS.LENGTH.NAME;
        if (MIN > employer.length || MAX < employer.length) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Employer', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate workExperience Short Description
     * @author Innovify
     * @since 15/06/2020
     * @param {String} ShortDescription ShortDescription of user
     */
    async checkShortDescription (shortDescription) {
        if (!shortDescription) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Short Description'), 400);
        }

        const count = super.countHTML(shortDescription);
        const { MIN, MAX } = CONSTANTS.LENGTH.SHORT_DESCRIPTION;
        if (MIN > count || MAX < count) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Short Description', MIN, MAX
            }), 400);
        }
    }
}

module.exports = TalentWorkExperienceDetailsValidator;

const CodeMonkError = require('../../../util/CodeMonkError');
const validation = require('../../validation');
/**
 * Class represents validations for Talent Education Details.
 */
class TalentEducationDetailsValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate education details save request
     * @author Innovify
     * @since 15/06/2020
     */
    async validationEducationDetails () {
        await this.educationDetails(this.body.educationDetails);
        if (this.body.certificateDetails && !Array.isArray(this.body.certificateDetails)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Certication Details'), 400);
        }
        if (this.body.certificateDetails && this.body.certificateDetails.length) {
            await this.certificateDetails(this.body.certificateDetails);
        }
    }

    /**
     * @desc This function is being used to validate education details
     * @author Innovify
     * @since 15/06/2020
     * @param {Object} educationDetails educationDetails of user
     */
    async educationDetails (educationDetails) {
        if (!educationDetails || !Array.isArray(educationDetails) || !educationDetails.length) {
            throw new CodeMonkError(this.__(this.SELECT, 'Education Details'), 400);
        }

        await this.checkEducationEach(educationDetails);
    }

    /**
     * @desc This function is being used to validate education details from input
     * @author Innovify
     * @since 15/06/2020
     * @param {Array} educationDetails educationDetails of user
     */
    async checkEducationEach (educationDetails) {
        for (let index = 0; index < educationDetails.length; index++) {
            const d = educationDetails[index];
            await this.degreeLevel(d.degreeLevel);
            await this.degreeTitle(d.degreeTitle);
            await this.collegeName(d.collegeName);
            await this.country(d.country);
            await this.startYear(d.startYear);
            await this.endYear(d.endYear);
            await this.checkStartEndYear(d.startYear, d.endYear);
        }
    }

    /**
     * @desc This function is being used to validate each education object's degreeLevel
     * @author Innovify
     * @since 15/06/2020
     * @param {String} degreeLevel degreeLevel of user
     */
    async degreeLevel (degreeLevel) {
        if (!degreeLevel) {
            throw new CodeMonkError(this.__(this.SELECT, 'Degree Level'), 400);
        }
        if (!_.includes(CONSTANTS.EDUCATION_DEGREE, degreeLevel)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Degree Level'), 400);
        }
    }

    /**
     * @desc This function is being used to validate each education object's degree title
     * @author Innovify
     * @since 15/06/2020
     * @param {String} degreeTitle degreeTitle of user
     */
    async degreeTitle (degreeTitle) {
        if (!degreeTitle) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Degree Title'), 400);
        }
        const { MIN, MAX } = CONSTANTS.EDUCATION_DEGREE_TITLE;
        if (MIN > degreeTitle.length || MAX < degreeTitle.length) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Degree Title', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate each education object's college name
     * @author Innovify
     * @since 15/06/2020
     * @param {String} collegeName collegeName of user
     */
    async collegeName (collegeName) {
        if (!collegeName) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'College Name'), 400);
        }
        const { MIN, MAX } = CONSTANTS.EDUCATION_COLLEGE_NAME;
        if (MIN > collegeName.length || MAX < collegeName.length) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'College Name', MIN, MAX
            }), 400);
        }
    }
}

module.exports = TalentEducationDetailsValidator;

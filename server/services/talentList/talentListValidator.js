const validation = require('../validation');
const { stringFilter, lengthFilter } = require('../../util/utilFunctions');
const Currencies = require('../../util/currency')
/**
 * Class represents validations for Talent list with mutliple filters.
 */
class TalentListValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate check project role for filter
     * @author Innovify
     * @since 17/08/2020
     * @param {string} role role from selection
     */
    checkProjectRole(role) {
        return stringFilter(CONSTANTS.PRIMARY_ROLE, role);
    }

    /**
     * @desc This function is being used to validate yearsOfExperience for filter
     * @author Innovify
     * @since 17/08/2020
     * @param {string} yearsOfExperience yearsOfExperience of user
     */
    yearsOfExperience(yearsOfExperience) {
        return stringFilter(CONSTANTS.YEAR_OF_EXPERIENCE, yearsOfExperience);
    }

    /**
     * @desc This function is being used to validate check team preference for filter
     * @author Innovify
     * @since 17/08/2020
     * @param {string} teamPreference teamPreference from selection
     */
    teamPreference(teamPreference) {
        return stringFilter(CONSTANTS.TEAM_PREFERENCE, teamPreference);
    }

    /**
     * @desc This function is being used to validate check work preference for filter
     * @author Innovify
     * @since 17/08/2020
     * @param {string} workPreference workPreference from selection
     */
    workPreference(workPreference) {
        return stringFilter(CONSTANTS.WORK_PREFERENCE, workPreference);
    }

    assignment(assignment) {
        return stringFilter(CONSTANTS.ASSIGNMENTS, assignment);
    }

    /**
     * @desc This function is being used to validate degree level for filter
     * @author Innovify
     * @since 17/08/2020
     * @param {String} degreeLevel degreeLevel of user
     */
    degreeLevel(degreeLevel) {
        if (degreeLevel) {
            degreeLevel = degreeLevel.replace('\'', '’');
            return degreeLevel !== 'all' && _.includes(CONSTANTS.EDUCATION_DEGREE, degreeLevel);
        } else {
            return false;
        }
    }

    dayRate(dayRate) {
        if (!dayRate) {
            return false;
        }

        const dayRateArr = dayRate.split(',');
        if (dayRateArr.length !== 2) {
            return false;
        }

        if (isNaN(dayRateArr[0]) || isNaN(dayRateArr[1])) {
            return false;
        }

        if (dayRateArr[0] > dayRateArr[1]) {
            return false;
        }
        return true;
    }

    discProfile(discProfile) {
        return stringFilter(CONSTANTS.DISC_PROFILE, discProfile);
    }

    teamWorking(teamWorking) {
        return stringFilter(CONSTANTS.TEAM_WORKING, teamWorking);
    }

    industry(industry) {
        return lengthFilter(CONSTANTS.INDUSTRY.LENGTH, industry);
    }

    values(values) {
        return lengthFilter(CONSTANTS.COMPANY_CULTURE.LENGTH, values);
    }

    certification(certification) {
        return lengthFilter(CONSTANTS.CERTIFICATIONS.LENGTH, certification);
    }

    currency(currency) {
        return stringFilter(Currencies.map(c => { return c.label }), currency);
    }

}

module.exports = TalentListValidator;

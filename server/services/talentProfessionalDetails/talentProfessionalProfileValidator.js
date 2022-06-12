const validation = require('../validation');
/**
 * Class represents validations for Talent Professinal Details.
 */
class TalentProfessinalDetailsValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate professional Summary save request
     * @author Innovify
     * @since 04/06/2020
     */
    async validationProfessionalDetails() {
        //    await this.professionalSummary(this.body.professionalSummary);
        super.linkedInUrl(this.body.linkedInUrl);
        super.gitHubUrl(this.body.gitHubUrl);
        super.stackOverFlowUrl(this.body.stackOverFlowUrl);
        super.dribbbleUrl(this.body.dribbbleUrl);
        super.behanceUrl(this.body.behanceUrl);
        super.otherWebsiteUrl(this.body.portfolioUrl);
        await this.primaryRole(this.body.primaryRole);
        await this.yearsOfExperience(this.body.yearsOfExperience);
        // await this.skills(this.body.skills);
    }


    /**
     * @desc This function is being used to validate professionalSummary
     * @author Innovify
     * @since 04/06/2020
     * @param {string} professionalSummary professionalSummary of user
     */
    async professionalSummary(professionalSummary) {
        if (!professionalSummary) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Professional Summary'), 400);
        }
        const count = super.countHTML(professionalSummary);
        const { MIN, MAX } = CONSTANTS.LENGTH.PROFESSIONALSUMMARY;
        if (MIN > count || MAX < count) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Professional Summary', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate primaryRole
     * @author Innovify
     * @since 04/06/2020
     * @param {string} primaryRole primaryRole of user
     */
    async primaryRole(primaryRole) {
        if (!primaryRole || CONSTANTS.PRIMARY_ROLE.indexOf(primaryRole) === -1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Primary Role'), 400);
        }
    }

    /**
     * @desc This function is being used to validate yearsOfExperience
     * @author Innovify
     * @since 04/06/2020
     * @param {string} yearsOfExperience yearsOfExperience of user
     */
    async yearsOfExperience(yearsOfExperience) {
        if (!yearsOfExperience
            || CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(yearsOfExperience) === -1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Years of Experience'), 400);
        }
    }

    /**
     * @desc This function is being used to validate skills
     * @author Innovify
     * @since 04/06/2020
     * @param {Array} skills skills of user
     */
    async skills(skills) {
        if (!skills || !Array.isArray(skills) || !skills.length) {
            throw new CodeMonkError(this.__(this.SELECT, 'Skill'), 400);
        }
        await this.checkSkills(skills);
    }

    /**
     * @desc This function is being used to check skills has correct data
     * @author Innovify
     * @since 04/06/2020
     * @param {Array} skills skills of user
     */
    async checkSkills(skills) {
        skills.map((l) => {
            if (!l.name) {
                throw new CodeMonkError(this.__(this.REQUIRED, 'Skill Name'), 400);
            }

            const { LENGTH } = CONSTANTS.SKILL_NAME;
            const SKILL_MIN = LENGTH.MIN;
            const SKILL_MAX = LENGTH.MAX;
            if (l.name.length < SKILL_MIN || l.name.length > SKILL_MAX) {
                throw new CodeMonkError(this.__(this.LENGTH, {
                    FIELD: `the ${l.name} Skill Name`, SKILL_MIN, SKILL_MAX
                }), 400);
            }

            const { MIN, MAX } = CONSTANTS.LENGTH.RATE;
            if (!l.rate || l.rate < MIN || l.rate > MAX) {
                throw new CodeMonkError(this.__(this.LENGTH, {
                    FIELD: 'Skill rate', MIN, MAX
                }), 400);
            }
        });
    }

}

module.exports = TalentProfessinalDetailsValidator;

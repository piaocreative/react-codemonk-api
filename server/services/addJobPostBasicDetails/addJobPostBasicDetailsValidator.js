const validation = require('../validation');
/**
 * Class represents validations for client add job post details.
 */
class AddJobPostBasicDetailsValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add job post
     * @author Innovify
     * @since 03/11/2020
     */
    async addJobPostBasicDetails() {
        this.projectName(this.body.projectName);
        await this.jobPostBasicDetailsValidation();
    }

    async jobPostBasicDetailsValidation() {
        this.briefTitle(this.body.name);
        this.briefDescription(this.body.description);
        this.primaryRole(this.body.role);
        await this.workPreference(this.body.workPreference);
        await this.teamPreference(this.body.teamPreference);
        await this.assignments(this.body.assignments);
        this.expertise(this.body.expertise);
        this.duration(this.body.duration);

    }

    async checkSkills(skills) {
        skills.map((l) => {
            if (!l) {
                throw new CodeMonkError(this.__(this.REQUIRED, `${l} Skill`), 400);
            }

            const { MIN, MAX } = CONSTANTS.SKILL_NAME.LENGTH;
            if (l.length < MIN || l.length > MAX) {
                throw new CodeMonkError(this.__(this.LENGTH, {
                    FIELD: `the ${l} Skill`, MIN, MAX
                }), 400);
            }
        });
    }
}

module.exports = AddJobPostBasicDetailsValidator;

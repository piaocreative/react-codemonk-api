const validation = require('../../validation');
/**
 * Class represents validations for Talent Project Details.
 */
class TalentProjectDetailsValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate project Details
     * @author Innovify
     * @since 10/06/2020
     */
    async validationProjectDetails() {
        await this.projectDetails(this.body.projectDetails);
    }

    /**
     * @desc This function is being used to validate projectDetails
     * @author Innovify
     * @since 10/06/2020
     * @param {Object} projectDetails projectDetails of user
     */
    async projectDetails(projectDetails) {
        if (!Array.isArray(projectDetails)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Project'), 400);
        }
        for (const project of projectDetails) {
            await this.checkProjectName(project.name);
            await this.checkProjectURL(project.url);
            await this.checkProjectDescription(project.description);
            await this.checkProjectRole(project.role);
            await this.checkProjectEmployer(project.employer);
            await this.checkProjectIndustry(project.industry);
            //    await this.checkProjectKeyAchievements(project.keyAchievements);
            await this.skills(project.skills);
        }
    }

    /**
     * @desc This function is being used to validate check individual project name
     * @author Innovify
     * @since 10/06/2020
     */
    async checkProjectName(name) {
        if (!name) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Project Name'), 400);
        }
    }

    /**
     * @desc This function is being used to validate check individual project url
     * @author Innovify
     * @since 10/06/2020
     */
    async checkProjectURL(url) {
        if (url && !CONSTANTS.REGEX.URL.test(url)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Project URL'), 400);
        }
    }

    /**
     * @desc This function is being used to validate check individual project description
     * @author Innovify
     * @since 10/06/2020
     */
    async checkProjectDescription(description) {
        if (!description) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Description'), 400);
        }
        const count = super.countHTML(description);
        const { MIN, MAX } = CONSTANTS.LENGTH.PROJECT_DESCRIPTION;
        if (MIN > count || MAX < count) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Description', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate check individual project user role
     * @author Innovify
     * @since 10/06/2020
     */
    async checkProjectRole(role) {
        if (!role || !_.includes(CONSTANTS.PRIMARY_ROLE, role)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Primary Role'), 400);
        }
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
     * @desc This function is being used to validate check individual project achivements
     * @author Innovify
     * @since 10/06/2020
     */
    async checkProjectKeyAchievements(keyAchievements) {
        if (!keyAchievements) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Key Achievements'), 400);
        }
        const count = super.countHTML(keyAchievements);
        const { MIN, MAX } = CONSTANTS.LENGTH.PROJECT_KEY_ACHIEVEMENT;
        if (MIN > count || MAX < count) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Key Achievements', MIN, MAX
            }), 400);
        }
    }

    async skills(skills) {
        if (!skills || !Array.isArray(skills) || !skills.length) {
            throw new CodeMonkError(this.__(this.SELECT, 'Skill'), 400);
        }

        await this.checkSkillCount(skills);
        await this.checkSkills(skills);

        await this.checkSkillsRatingLimit(skills);
    }

    async checkSkillCount(skills) {
        const { LENGTH } = CONSTANTS.PROJECT_SKILLS;
        const SKILL_MIN = LENGTH.MIN;
        const SKILL_MAX = LENGTH.MAX;
        if (skills.length < SKILL_MIN || skills.length > SKILL_MAX) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: `Skills`, SKILL_MIN, SKILL_MAX
            }), 400);
        }
    }

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


    async checkSkillsRatingLimit(skills) {
        const { MAX } = CONSTANTS.LENGTH.RATE;
        const { ALLOW } = CONSTANTS.PROJECT_SKILLS.RATING_LIMIT;
        const arr = new Array(MAX).fill(0);

        skills.map((l) => {
            if ((arr[l.rate - 1] + 1) > ALLOW) {
                throw new CodeMonkError(this.__('PROJECT_SKILLS_RATING_LIMIT'), 400);
            }
            arr[l.rate - 1] = arr[l.rate - 1] + 1;
        });
    }

    async checkProjectEmployer(employer) {
        if (!employer) {
            throw new CodeMonkError(this.__(this.SELECT, 'Employer'), 400);
        }
    }

    async checkProjectIndustry(industry) {
        if (!industry) {
            throw new CodeMonkError(this.__(this.SELECT, 'Industry'), 400);
        }
    }
}

module.exports = TalentProjectDetailsValidator;

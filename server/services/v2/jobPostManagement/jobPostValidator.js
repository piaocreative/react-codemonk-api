const validation = require('../../validation');

class AddJobPostRoleValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function validates a job post
     * @author CodeMonk
     * @since 07/01/2022
     */
    async jobPost (isUpdate = false) {
        if (!isUpdate) this.projectName(this.body.projectName);
        if (isUpdate) this.briefId(this.body.id);
        await this.roleValidation();
        await this.preferredCandidatesValidation();
        await this.engagementValidation();
    }

    async roleValidation () {
        this.briefTitle(this.body.name);
        this.primaryRole(this.body.role);
        this.expertise(this.body.expertise);
        this.briefDescription(this.body.description);
        await this.teamPreference(this.body.teamPreference);
    }

    async preferredCandidatesValidation () {
        super.hardSkills(this.body.hardSkills);
        await this.checkSkills(this.body.hardSkills);
        super.softSkills(this.body.softSkills);
        await this.checkSkills(this.body.softSkills);
        await super.certifications(this.body.certifications, false);
        await super.languageWithoutRate(this.body.languages);
        await super.industry(this.body.industry);
        await super.discProfile(this.body.discProfile, false);
        await super.teamWorking(this.body.teamWorking);
    }

    async checkSkills (skills) {
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

    async engagementValidation () {
        await super.employmentType(this.body.employmentType);

        await this.workPreference(this.body.workPreference);
        this.duration(this.body.duration);
        await this.assignments(this.body.assignments);
        await super.timeZone(this.body.timeZone);

        let employmentType = this.body.employmentType;
        if (this.body.employmentType && typeof this.body.employmentType === 'string') {
            employmentType = this.body.employmentType.split(',');
        }
        if (employmentType && !(employmentType.indexOf(CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_PE) === -1)) {
            super.annualRateCurrency(this.body.currencyAnnualRate);
            super.annualRate(this.body.annualRate);
        }

        if (employmentType && !(employmentType.indexOf(CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR) === -1)) {
            super.currency(this.body.currency);
            super.ratePerHour(this.body.ratePerHour);
        }
    }
}

module.exports = AddJobPostRoleValidator;

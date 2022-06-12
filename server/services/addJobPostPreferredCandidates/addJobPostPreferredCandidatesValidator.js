const validation = require('../validation');

class AddJobPostPreferredCandidatesValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;
    }

    async addJobPostPreferredCandidates() {
        await super.checkId(this.body.id);
        await this.jobPostPreferredCandidatesValidation();
    }

    async jobPostPreferredCandidatesValidation() {
        super.hardSkills(this.body.hardSkills);
        await this.checkSkills(this.body.hardSkills);
        super.softSkills(this.body.softSkills);
        await this.checkSkills(this.body.softSkills);
        await super.certifications(this.body.certifications, false);
        await super.industry(this.body.industry);
        await super.teamWorking(this.body.teamWorking);
        await super.discProfile(this.body.discProfile);
        await super.timeZone(this.body.timeZone);
        super.currency(this.body.currency);
        super.ratePerHour(this.body.ratePerHour);
        await super.languageWithoutRate(this.body.languages);
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

module.exports = AddJobPostPreferredCandidatesValidator;

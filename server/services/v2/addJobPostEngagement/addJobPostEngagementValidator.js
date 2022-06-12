const validation = require('../../validation');

class AddJobPostEngagementValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    async addJobPostEngagement () {
        await super.checkId(this.body.id);
        await this.jobPostEngagementValidation();
    }

    async jobPostEngagementValidation () {
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

module.exports = AddJobPostEngagementValidator;

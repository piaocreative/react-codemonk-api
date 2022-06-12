class AddJobPostEngagementDTO {
    static prepareObject (data) {
        return {
            step: data.step,
            status: data.status,
            timeZone: data.timeZone,
            workPreference: Array.isArray(data.workPreference) ? data.workPreference : [],
            assignments: Array.isArray(data.assignments) ? data.assignments : [],
            duration: data.duration,
            ratePerHour: data.ratePerHour ? data.ratePerHour : 0,
            currency: data.currency ? data.currency : 'GBP',
            employmentType: Array.isArray(data.employmentType) ? data.employmentType : [],
            annualRate: data.annualRate ? data.annualRate : 0,
            currencyAnnualRate: data.currencyAnnualRate ? data.currencyAnnualRate : 'GBP',
            updatedAt: Date.now()
        };
    }
}

module.exports = AddJobPostEngagementDTO;

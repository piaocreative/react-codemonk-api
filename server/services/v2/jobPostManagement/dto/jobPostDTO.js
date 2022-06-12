class JobPostDTO {
    static prepareJobPostObject (data) {
        return {
            name: data.name,
            description: data.description,
            role: data.role,
            teamPreference: Array.isArray(data.teamPreference) ? data.teamPreference : [],
            expertise: data.expertise,
            expertiseOrder: data.expertise && CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(data.expertise),

            skills: Array.isArray(data.hardSkills) ? data.hardSkills : [],
            hardSkills: Array.isArray(data.hardSkills) ? data.hardSkills : [],
            softSkills: Array.isArray(data.softSkills) ? data.softSkills : [],
            certifications: Array.isArray(data.certifications) ? data.certifications : [],
            industry: data.industry,
            teamWorking: data.teamWorking,
            discProfile: data.discProfile,
            languages: Array.isArray(data.languages) ? data.languages : [],

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
        };
    }
}

module.exports = JobPostDTO;

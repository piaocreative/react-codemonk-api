class EditJobPostPreferredCandidateDTO {
    static prepareObject(data) {
        return {
            skills: Array.isArray(data.hardSkills) ? data.hardSkills : [],
            hardSkills: Array.isArray(data.hardSkills) ? data.hardSkills : [],
            softSkills: Array.isArray(data.softSkills) ? data.softSkills : [],
            certifications: Array.isArray(data.certifications) ? data.certifications : [],
            industry: data.industry,
            teamWorking: data.teamWorking,
            discProfile: data.discProfile,
            timeZone: data.timeZone,
            ratePerHour: data.ratePerHour,
            currency: data.currency,
            languages: Array.isArray(data.languages) ? data.languages : [],
            updatedAt: Date.now()
        };
    }
}

module.exports = EditJobPostPreferredCandidateDTO;

const Currencies = require('../util/currency');
const CodeMonkError = require('../util/CodeMonkError');
const NOT_VALID = 'FIELD_NOT_VALID';
const REQUIRED = 'FIELD_REQUIRED';
const SELECT = 'FIELD_SELECT_REQUIRED';
const LENGTH = 'FIELD_LENGTH';
const BasicFieldValidations = require('./basicFieldValidations');
const Industry = require('../models/industry.model');
const CompanyCulture = require('../models/companyCulture.model');

/**
 * Created by Innovify on 04/06/2020
 * @name signUpValidator
 */
class Validator extends BasicFieldValidations {
    constructor (local) {
        super(local);
    }

    /**
     * @desc This function is being used to validate OTP input
     * @param {number} otp OTP number
     * @author Innovify
     * @since 27/05/2020
     */
    async otp (otp) {
        if (!otp || otp.toString().length !== CONSTANTS.OTPLENGTH) {
            throw new CodeMonkError(this.__(NOT_VALID, 'OTP'), 400);
        }
    }

    /**
     * @desc This function is being used to validate company register number
     * @author Innovify
     * @since 08/07/2020
     * @param {String} registeredNumber registeredNumber of user
     */
    async registeredNumber (registeredNumber) {
        if (!registeredNumber) {
            throw new CodeMonkError(this.__(REQUIRED, 'Company registered number'), 400);
        }
    }

    /**
     * @desc This function is being used to validate workExperience job title
     * @author Innovify
     * @since 15/06/2020
     * @param {String} jobTitle jobTitle of user
     */
    async checkJobTitle (jobTitle) {
        if (!jobTitle) {
            throw new CodeMonkError(this.__(REQUIRED, 'Job title'), 400);
        }
        const { MAX, MIN } = CONSTANTS.LENGTH.NAME;
        if (MIN > jobTitle.length || MAX < jobTitle.length) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Job title', MIN, MAX
            }), 400);
        }
    }

    async checkJobRole (jobRole) {
        if (!jobRole || CONSTANTS.CLIENT.ROLE.indexOf(jobRole) === -1) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Role'), 400);
        }
    }

    async startYear (startYear) {
        if (!startYear || isNaN(startYear) || startYear < 1000 || startYear > 9999) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Start Year'), 400);
        }
    }

    async endYear (endYear) {
        if (!endYear || isNaN(endYear) || endYear < 1000 || endYear > 9999) {
            throw new CodeMonkError(this.__(NOT_VALID, 'End Year'), 400);
        }
    }

    async checkStartEndYear (startYear, endYear) {
        if (endYear < startYear) {
            throw new CodeMonkError(this.__(NOT_VALID, 'End Year'), 400);
        }
    }

    /**
     * @desc This function is being used to validate currency
     * @author Innovify
     * @param {string} currency currency
     * @since 28/08/2020
     */
    currency (currency, field = 'Currency') {
        if (!currency) {
            throw new CodeMonkError(this.__(REQUIRED, field), 400);
        }
        const isCurrencyValid = this.currencyCheck(currency);
        if (!isCurrencyValid) {
            throw new CodeMonkError(this.__(NOT_VALID, field), 400);
        }
    }

    /**
     * @desc This function is being used to validate currency
     * @author CodeMonk
     * @param {string} currency currency
     * @since 30/10/2021
     */
    annualRateCurrency (currency) {
        if (!currency) {
            throw new CodeMonkError(this.__(REQUIRED, 'Annual Currency'), 400);
        }
        const isCurrencyValid = this.currencyCheck(currency);
        if (!isCurrencyValid) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Annual Currency'), 400);
        }
    }

    /**
     * @desc This function is being used to validate currency
     * @author Innovify
     * @param {string} currency currency
     * @since 28/08/2020
     */
    currencyCheck (currency) {
        return Currencies.some((d) => {
            return d.value === currency;
        });
    }

    /**
     * @desc This function is being used to validate ratePerHour
     * @author Innovify
     * @param {string} ratePerHour ratePerHour
     * @since 28/08/2020
     */
    ratePerHour (ratePerHour) {
        if (!ratePerHour) {
            throw new CodeMonkError(this.__(REQUIRED, 'Rate per hour'), 400);
        }
        if (isNaN(ratePerHour)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Rate per hour'), 400);
        }

        const { MIN, MAX } = CONSTANTS.HOURLY_RATE;
        if (MIN > ratePerHour || MAX < ratePerHour) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Hourly Rate', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate annualRate
     * @author CodeMonk
     * @param {string} annualRate annualRate
     * @since 30/10/2021
     */
    annualRate (annualRate) {
        if (!annualRate) {
            throw new CodeMonkError(this.__(REQUIRED, 'Annual Rate'), 400);
        }
        if (isNaN(annualRate)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Annual Rate'), 400);
        }

        const { MIN, MAX } = CONSTANTS.ANNUAL_RATE;
        if (MIN > annualRate || MAX < annualRate) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Hourly Rate', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate project name
     * @author Innovify
     * @param {string} name name
     * @since 17/09/2020
     */
    projectName (name) {
        if (!name) {
            throw new CodeMonkError(this.__(REQUIRED, 'Project name'), 400);
        }
        const { MIN, MAX } = CONSTANTS.PROJECT.NAME.LENGTH;
        if (MIN > name.length || MAX < name.length) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Project name', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate project description
     * @author Innovify
     * @param {string} description description
     * @since 17/09/2020
     */
    projectDescription (description) {
        if (!description) {
            throw new CodeMonkError(this.__(REQUIRED, 'Project Description'), 400);
        } else {
            const { MIN, MAX } = CONSTANTS.PROJECT.DESCRIPTION.LENGTH;
            const count = this.countHTML(description);
            if (MIN > count || MAX < count) {
                throw new CodeMonkError(this.__(LENGTH, {
                    FIELD: 'Project Description', MIN, MAX
                }), 400);
            }
        }
    }

    briefId (briefId) {
        if (!briefId) {
            throw new CodeMonkError(this.__(REQUIRED, 'Brief Id'), 400);
        }
        const { MIN, MAX } = CONSTANTS.BRIEF.TITLE.LENGTH;
        if (MIN > briefId.length || MAX < briefId.length) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Brief Id', MIN, MAX
            }), 400);
        }
    }

    briefTitle (briefTitle) {
        if (!briefTitle) {
            throw new CodeMonkError(this.__(REQUIRED, 'Brief Title'), 400);
        }
        const { MIN, MAX } = CONSTANTS.BRIEF.TITLE.LENGTH;
        if (MIN > briefTitle.length || MAX < briefTitle.length) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Brief Title', MIN, MAX
            }), 400);
        }
    }

    briefDescription (briefDescription) {
        if (!briefDescription) {
            throw new CodeMonkError(this.__(REQUIRED, 'Brief Desciption'), 400);
        }
        const count = this.countHTML(briefDescription);
        const { MIN, MAX } = CONSTANTS.BRIEF.DESCRIPTION.LENGTH;
        if (MIN > count || MAX < count) {
            throw new CodeMonkError(this.__('FIELD_LENGTH', {
                FIELD: 'Brief Desciption', MIN, MAX
            }), 400);
        }
    }

    primaryRole (primaryRole) {
        if (!primaryRole || CONSTANTS.PRIMARY_ROLE.indexOf(primaryRole) === -1) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Primary Role'), 400);
        }
    }

    skills (skills) {
        if (!skills || !Array.isArray(skills) || !skills.length) {
            throw new CodeMonkError(this.__(REQUIRED, 'Skills'), 400);
        }
    }

    /**
     * @desc This function is being used to validate workPreference
     * @author Innovify
     * @since 09/06/2020
     * @param {String} workPreference workPreference of user
     */
    async workPreference (workPreference, required = true) {
        if (required && (!Array.isArray(workPreference) || !workPreference.length)) {
            throw new CodeMonkError(this.__(SELECT, 'Work preference'), 400);
        }
        workPreference && workPreference.forEach((d) => {
            if (d && CONSTANTS.WORK_PREFERENCE.indexOf(d) === -1) {
                throw new CodeMonkError(this.__(NOT_VALID, 'Work preference'), 400);
            }
        });
    }

    /**
     * @desc This function is being used to validate teamPreference
     * @author Innovify
     * @since 09/06/2020
     * @param {Array} teamPreference teamPreference of user
     */
    async teamPreference (teamPreference, fieldName = 'Team Preference') {
        if (teamPreference) {
            if (!Array.isArray(teamPreference)) {
                throw new CodeMonkError(this.__(NOT_VALID, fieldName), 400);
            }
            await this.checkTeamPreference(teamPreference);
        }
    }

    /**
     * @desc This function is being used to check team Preference value is valid
     * @author Innovify
     * @since 09/06/2020
     * @param {Array} teamPreference teamPreference of user
     */
    async checkTeamPreference (teamPreference) {
        teamPreference.forEach((l) => {
            if (!_.includes(CONSTANTS.TEAM_PREFERENCE, l)) {
                throw new CodeMonkError(this.__(NOT_VALID, 'Team Preference'), 400);
            }
        });
    }

    /**
     * @desc This function is being used to validate assignments
     * @author Innovify
     * @since 09/06/2020
     * @param {Array} assignments assignments of user
     */
    async assignments (assignments) {
        if (assignments) {
            if (!Array.isArray(assignments)) {
                throw new CodeMonkError(this.__(NOT_VALID, 'Assignments'), 400);
            }
            await this.checkAssignments(assignments);
        }
    }

    /**
     * @desc This function is being used to validate assignment array is valid or not
     * @author Innovify
     * @since 09/06/2020
     * @param {Array} assignments assignments of user
     */
    async checkAssignments (assignments) {
        assignments.map((l) => {
            if (!_.includes(CONSTANTS.ASSIGNMENTS, l)) {
                throw new CodeMonkError(this.__(NOT_VALID, 'Assignments'), 400);
            }
        });
    }

    /**
     * @desc This function is being used to validate expertise
     * @author Innovify
     * @since 04/11/2020
     * @param {String} expertise expertise of user
     */
    expertise (expertise) {
        if (!expertise) {
            throw new CodeMonkError(this.__(SELECT, 'Expertise'), 400);
        }
        if (CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(expertise) === -1) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Expertise'), 400);
        }
    }

    /**
     * @desc This function is being used to validate duration
     * @author Innovify
     * @since 04/11/2020
     * @param {String} duration duration of user
     */
    duration (duration) {
        if (!duration || duration < 1 || (duration % 1) !== 0) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Duration'), 400);
        }
    }

    quoteTitle (quoteTitle) {
        if (!quoteTitle) {
            throw new CodeMonkError(this.__(REQUIRED, 'Title'), 400);
        }
        const { MIN, MAX } = CONSTANTS.QUOTE.TITLE.LENGTH;
        if (MIN > quoteTitle.length || MAX < quoteTitle.length) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Title', MIN, MAX
            }), 400);
        }
    }

    quoteDescription (quoteDescription) {
        if (!quoteDescription) {
            throw new CodeMonkError(this.__(REQUIRED, 'Description'), 400);
        }
        const count = this.countHTML(quoteDescription);
        const { MIN, MAX } = CONSTANTS.QUOTE.DESCRIPTION.LENGTH;
        if (MIN > count || MAX < count) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Description', MIN, MAX
            }), 400);
        }
    }
    checkQuoteFileSize (size) {
        if (!size || size > CONSTANTS.QUOTE.ATTACHMENT.SIZE) {
            throw new CodeMonkError(this.__('INVALID_QUOTE_FILE'), 400);
        }
    }

    checkSubmitQuoteFileSize (size) {
        if (!size || size > CONSTANTS.SUBMIT_QUOTE.ATTACHMENT.SIZE) {
            throw new CodeMonkError(this.__('INVALID_SUBMIT_QUOTE_FILE'), 400);
        }
    }

    /**
     * @desc This function is being used to validate linkedIn Url
     * @author Innovify
     * @since 04/06/2020
     * @param {string} linkedInUrl linkedInUrl
     */
    linkedInUrl (linkedInUrl) {
        if (linkedInUrl && !CONSTANTS.REGEX.LINKEDIN_URL.test(linkedInUrl)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Linkedin URL'), 400);
        }
    }

    /**
     * @desc This function is being used to validate gitHub Url
     * @author Innovify
     * @since 04/06/2020
     * @param {string} gitHubUrl gitHubUrl
     */
    gitHubUrl (gitHubUrl) {
        if (gitHubUrl && !CONSTANTS.REGEX.GITHUB_URL.test(gitHubUrl)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Github URL'), 400);
        }
    }

    /**
     * @desc This function is being used to validate stackOverFlow Url
     * @author Innovify
     * @since 04/06/2020
     * @param {string} stackOverFlowUrl stackOverFlowUrl
     */
    stackOverFlowUrl (stackOverFlowUrl) {
        if (stackOverFlowUrl && !CONSTANTS.REGEX.STACKOVERFLOW_URL.test(stackOverFlowUrl)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Stack overflow URL'), 400);
        }
    }

    /**
     * @desc This function is being used to validate dribble Url
     * @author Innovify
     * @since 02/09/2020
     * @param {string} dribbbleUrl dribbbleUrl
     */
    dribbbleUrl (dribbbleUrl) {
        if (dribbbleUrl && !CONSTANTS.REGEX.DRIBBLE_URL.test(dribbbleUrl)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Dribber URL'), 400);
        }
    }

    behanceUrl (behanceUrl) {
        if (behanceUrl && !CONSTANTS.REGEX.BEHANCE_URL.test(behanceUrl)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Behance URL'), 400);
        }
    }

    /**
     * @desc This function is being used to validate clutch Url
     * @author Innovify
     * @since 02/09/2020
     * @param {string} clutchUrl clutchUrl
     */
    clutchUrl (clutchUrl) {
        if (clutchUrl && !CONSTANTS.REGEX.CLUTCH_URL.test(clutchUrl)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Cluctch URL'), 400);
        }
    }

    /**
     * @desc This function is being used to validate goodfirms Url
     * @author Innovify
     * @since 02/09/2020
     * @param {string} goodfirmsUrl goodfirmsUrl
     */
    goodfirmsUrl (goodfirmsUrl) {
        if (goodfirmsUrl && !CONSTANTS.REGEX.GOODFIRMS_URL.test(goodfirmsUrl)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Goodfirm URL'), 400);
        }
    }

    /**
     * @desc This function is being used to validate otherWebsite Url
     * @author Innovify
     * @since 02/09/2020
     * @param {string} otherWebsiteUrl otherWebsiteUrl
     */
    otherWebsiteUrl (otherWebsiteUrl) {
        if (otherWebsiteUrl && !CONSTANTS.REGEX.URL.test(otherWebsiteUrl)) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Other website URL'), 400);
        }
    }

    /**
     * @desc This function is being used to validate cettification details
     * @author Innovify
     * @since 15/06/2020
     * @param {Array} certificateDetails certificateDetails of user
     */
    async certificateDetails (certificateDetails, isAgency) {
        certificateDetails.forEach((d) => {
            this.certificateName(d.name);
            this.checkDate(d.dateObtained, 'Date Obtained');
            this.certificateIssuedBy(d.issuedBy);
            if (!isAgency) {
                this.certificateId(d.certificateId);
            }
        });
    }

    /**
     * @desc This function is being used to validate each certificate object's name
     * @author Innovify
     * @since 15/06/2020
     * @param {String} certificateName certificateName of user
     */
    certificateName (name) {
        if (!name) {
            throw new CodeMonkError(this.__(REQUIRED, 'Certificate Name'), 400);
        }
        const { MIN, MAX } = CONSTANTS.EDUCATION_CERTIFICATE_NAME;
        if (MIN > name.length || MAX < name.length) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Certificate Name', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate each certificate object's issued by
     * @author Innovify
     * @since 15/06/2020
     * @param {String} issuedBy issuedBy of user
     */
    certificateIssuedBy (issuedBy) {
        if (!issuedBy) {
            throw new CodeMonkError(this.__(REQUIRED, 'Certificate issued by'), 400);
        }
        const { MIN, MAX } = CONSTANTS.EDUCATION_ISSUED_BY;
        if (MIN > issuedBy.length || MAX < issuedBy.length) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Certificate issued by', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate each certificate object's certificate id
     * @author Innovify
     * @since 15/06/2020
     * @param {String} certificateId certificateId of user
     */
    certificateId (certificateId) {
        if (!certificateId) {
            throw new CodeMonkError(this.__(REQUIRED, 'Certificate id/url'), 400);
        }
        const { MIN } = CONSTANTS.EDUCATION_CERT_ID;
        if (MIN > certificateId.length) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Certificate id/url'), 400);
        }
    }

    hardSkills (hardSkills) {
        if (!hardSkills || !Array.isArray(hardSkills) || !hardSkills.length) {
            throw new CodeMonkError(this.__(REQUIRED, 'Hard Skills'), 400);
        }
    }

    softSkills (softSkills) {
        if (!softSkills || !Array.isArray(softSkills) || !softSkills.length) {
            throw new CodeMonkError(this.__(REQUIRED, 'Soft Skills'), 400);
        }
    }

    async certifications (certifications, required = true) {
        if (required && (!Array.isArray(certifications) || !certifications.length)) {
            throw new CodeMonkError(this.__(SELECT, 'Certification'), 400);
        }

        certifications && certifications.forEach((d) => {
            if (d && (d.length < CONSTANTS.CERTIFICATIONS.LENGTH.MIN || d.length > CONSTANTS.CERTIFICATIONS.LENGTH.MAX)) {
                throw new CodeMonkError(this.__(this.LENGTH, {
                    FIELD: `the ${d} certification`, MIN: CONSTANTS.CERTIFICATIONS.LENGTH.MIN, MAX: CONSTANTS.CERTIFICATIONS.LENGTH.MAX
                }), 400);
            }
        });
    }

    async industry (industry, required = true) {
        if (required && !industry) {
            throw new CodeMonkError(this.__(REQUIRED, 'Industry'), 400);
        }
        const { MIN, MAX } = CONSTANTS.INDUSTRY.LENGTH;
        if (industry && (MIN > industry.length || MAX < industry.length)) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Industry', MIN, MAX
            }), 400);
        }
    }

    async teamWorking (teamWorking, required = true) {
        if (required && !teamWorking) {
            throw new CodeMonkError(this.__(REQUIRED, 'Team Working'), 400);
        }
        if (teamWorking && CONSTANTS.TEAM_WORKING.indexOf(teamWorking) === -1) {
            throw new CodeMonkError(this.__(NOT_VALID, 'Team Working'), 400);
        }
    }

    async discProfile (discProfile, required = true) {
        if (required && !discProfile) {
            throw new CodeMonkError(this.__(REQUIRED, 'DISC Profile'), 400);
        }
        if (discProfile && CONSTANTS.DISC_PROFILE.indexOf(discProfile) === -1) {
            throw new CodeMonkError(this.__(NOT_VALID, 'DISC Profile'), 400);

        }
    }

    companyType (companyType, required = true) {
        if (required && (!Array.isArray(companyType) || !companyType.length)) {
            throw new CodeMonkError(this.__(SELECT, 'Company Type'), 400);
        }
        companyType && companyType.forEach((d) => {
            if (d && CONSTANTS.COMPANY_TYPE.indexOf(d) === -1) {
                throw new CodeMonkError(this.__(NOT_VALID, 'Company Type'), 400);
            }
        });
    }

    preferredProjectDuration (preferredProjectDuration, required = true) {
        if (required && (!Array.isArray(preferredProjectDuration) || !preferredProjectDuration.length)) {
            throw new CodeMonkError(this.__(SELECT, 'Preferred Project Duration'), 400);
        }
        preferredProjectDuration && preferredProjectDuration.forEach((d) => {
            if (d && CONSTANTS.PREFERRED_PROJECT_DURATION.indexOf(d) === -1) {
                throw new CodeMonkError(this.__(NOT_VALID, 'Preferred Project Duration'), 400);
            }
        });
    }

    /**
     * @desc This function is being used to validate employment type
     * @author CodeMonk
     * @since 30/10/2021
     * @param {String} employmentType employmentType of user
     */
    async employmentType (employmentType2, required = true) {
        let employmentType = employmentType2;
        if (required && employmentType2 && typeof employmentType2 === 'string') {
            employmentType = employmentType2.split(',');
        }

        if (required && (!Array.isArray(employmentType) || !employmentType.length)) {
            throw new CodeMonkError(this.__(SELECT, 'Employment Type'), 400);
        }
        employmentType && employmentType.forEach((et) => {
            if (et && CONSTANTS.TALENT.EMPLOYMENT_TYPE.indexOf(et) === -1) {
                throw new CodeMonkError(this.__(NOT_VALID, 'Employment Type'), 400);
            }
        });
    }

    /**
     * @desc This function is being used to validate currency
     * @author CodeMonk
     * @param {string} currency currency
     * @since 16/11/2021
     */
    currencyCompanyProfessionInsuranceValue (currency) {
        this.currency(currency, 'Profession Insurance Value Currency');
    }

    /**
     * @desc This function is being used to validate currency
     * @author CodeMonk
     * @param {string} currency currency
     * @since 16/11/2021
     */
    currencyCompanyPublicInsurancesValue (currency) {
        this.currency(currency, 'Public Insurance Value Currency');
    }

    /**
     * @desc This function is being used to validate currency
     * @author CodeMonk
     * @param {string} currency currency
     * @since 16/11/2021
     */
    currencyCompanyEmployerInsuranceValue (currency) {
        this.currency(currency, 'Employer Insurance Value Currency');
    }

    async companyName (companyName) {
        if (!companyName) {
            throw new CodeMonkError(this.__(REQUIRED, 'Company Name'), 400);
        }
    }

    notesOfMotivation (notesOfMotivation) {
        if (!notesOfMotivation) {
            throw new CodeMonkError(this.__(REQUIRED, 'Motivation Notes'), 400);
        }

        const { MIN, MAX } = CONSTANTS.BRIEF.APPLY.NOTES_OF_MOTIVATION.LENGTH;
        if (MIN > notesOfMotivation.length || MAX < notesOfMotivation.length) {
            throw new CodeMonkError(this.__(LENGTH, {
                FIELD: 'Motivation Notes', MIN, MAX
            }), 400);
        }
    }

    async industries (industries) {
        if (!industries || !Array.isArray(industries) || !industries.length) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Industry'), 400);
        }
        await this.checkIndustryInDB(industries);
    }

    async checkIndustryInDB (industries) {
        const dbIndustries = await Industry.find({ name: { $in: industries } }).select('name');
        const dbIndustriesName = dbIndustries.map(db => { return db.name; });
        const reduceIndustries = industries.filter(di => !dbIndustriesName.includes(di));
        if (reduceIndustries && reduceIndustries.length > 0) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Industry'), 400);
        }
    }

    async companyCultures (companyCultures) {
        if (!companyCultures || !Array.isArray(companyCultures) || !companyCultures.length) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Company Culture'), 400);
        }
        await this.checkCompanyCultureInDB(companyCultures);
    }

    async checkCompanyCultureInDB (companyCultures) {
        const dbCompanyCultures = await CompanyCulture.find({ name: { $in: companyCultures } }).select('name');
        const dbCompanyCulturesName = dbCompanyCultures.map(db => { return db.name; });
        const reduceCompanyCultures = companyCultures.filter(di => !dbCompanyCulturesName.includes(di));
        if (reduceCompanyCultures && reduceCompanyCultures.length > 0) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Company Culture'), 400);
        }
    }
}

module.exports = Validator;

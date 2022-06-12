const mongoose = require('mongoose');
const fs = require('fs');
const { promisify } = require('util');
const Talent = require('../../models/talent.model');
const User = require('../../models/user.model');
const AgencyTalent = require('../../models/agencyTalent.model');
const Utils = require('../../util/utilFunctions');
const readFileAsync = promisify(fs.readFile);
const puppeteer = require('puppeteer');
const UploadService = require('../../util/uploadService');
const currency = require('../../util/currency');
const timezones = require('../../util/timeZone.json');
const {ROLE :{ADMIN, CLIENT, TALENT}} = require('../../util/constants');
const languages = require('../../util/languageISO');

/**
 * Class represents services for Talent details
 */
class TalentDetailsService {
    /**
     * @desc This function is being used to get Talent details
     * @author Innovify
     * @since 17/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     * @param {Object} user Logged in user details
     */
    static async details (userId, user, local) {
        const id = mongoose.Types.ObjectId(userId);
        let match = {
            _id: mongoose.Types.ObjectId(id),
            isActive: 1,
            $or: [{
                registerType: 'freelancer',
                signupStep: { $gte: CONSTANTS.TALENT.ACTIVE_STATUS }
            },
            {
                registerType: 'agency',
                signupStep: { $gte: CONSTANTS.AGENCY.TALENT.ACTIVE_STATUS }
            }]
        };

        if (user.role === CONSTANTS.ROLE.AGENCY) {
            await TalentDetailsService.checkAgencyTalent(id, user._id, local);
            match = {
                _id: mongoose.Types.ObjectId(id),
                registerType: 'agency'
            };
        } else if (user.role === CONSTANTS.ROLE.ADMIN) {
            match = {
                _id: mongoose.Types.ObjectId(id)
            };
        }

        const aggregateParams = [{
            $match: match
        },
        {
            $lookup: {
                from: 'users',
                let: { talentId: '$userId' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$_id', '$$talentId'] } } },
                    {
                        $project: {
                            talentUserId: '$_id',
                            profilePicture: 1,
                            countryCode: 1,
                            phoneNumber: 1,
                            email: 1,
                            firstName: '$firstName',
                            lastName: {
                                $cond: {
                                    if: { $eq: [user.role, 2] },
                                    then: '',
                                    else: '$lastName'
                                }
                            }
                        }
                    }
                ],
                as: 'user'
            }
        },
        {
            $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$user', 0] }, '$$ROOT'] } }
        },
        {
            $project: {
                talentUserId: 1,
                profilePicture: 1,
                firstName: 1,
                lastName: 1,
                countryCode: 1,
                phoneNumber: 1,
                email: 1,
                gender: 1,
                dob: 1,
                addressLineOne: 1,
                addressLineTwo: 1,
                city: 1,
                country: 1,
                timeZone: 1,
                postcode: 1,
                primaryRole: 1,
                yearsOfExperience: { $arrayElemAt: [{ $split: ['$yearsOfExperience', '-'] }, 0] },
                ratePerHour: {
                    $cond: {
                        if: { $eq: [user.role, 2] },
                        then: {
                            $sum: [CONSTANTS.FIXED_RATE, {
                                $divide: [{
                                    $subtract: [
                                        { $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] },
                                        { $mod: [{ $multiply: [{ $multiply: ['$ratePerHour', CONSTANTS.RATE_MULTIPLIER] }, 100] }, 1] }
                                    ]
                                }, 100]
                            }]
                        },
                        else: '$ratePerHour'
                    }
                },
                workPreference: 1,
                professionalSummary: 1,
                assignments: 1,
                teamPreference: 1,
                certificateDetails: 1,
                workExperience: 1,
                skills: 1,
                linkedInUrl: 1,
                gitHubUrl: 1,
                stackOverFlowUrl: 1,
                dribbbleUrl: 1,
                behanceUrl: 1,
                portfolioUrl: 1,
                projectDetails: 1,
                educationDetails: 1,
                currency: 1,
                language: 1,
                availability: 1,
                unavailability: 1,
                industries: 1,
                companyType: 1,
                companyCultures: 1,
                annualRate: {
                    $cond: {
                        if: { $eq: [user.role, 2] },
                        then: {
                            $sum: [CONSTANTS.FIXED_RATE, {
                                $divide: [{
                                    $subtract: [
                                        { $multiply: [{ $multiply: ['$annualRate', CONSTANTS.RATE_MULTIPLIER] }, 100] },
                                        { $mod: [{ $multiply: [{ $multiply: ['$annualRate', CONSTANTS.RATE_MULTIPLIER] }, 100] }, 1] }
                                    ]
                                }, 100]
                            }]
                        },
                        else: '$annualRate'
                    }
                },
                currencyAnnualRate: 1,
                employmentType: 1,
                profileURL: { $concat: [process.env.BASE_URL, '/c/', '$code'] },
                status: Utils.getUserStatus(true),
                verifiedProfile: 1
            }
        }];
        const talentDetails = await Talent.aggregate([aggregateParams]);
        return talentDetails[0];
    }

    static async checkAgencyTalent (id, userId, local) {
        const talent = await Talent.findOne({ _id: id }, { userId: 1 }).lean();

        if (!talent) {
            throw new CodeMonkError(local('NOT_FOUND', 'Talent'), 400);
        }

        const userDetails = await User.findOne({
            _id: talent.userId
        }, {
            email: 1
        }).lean();
        if (!userDetails) {
            throw new CodeMonkError(local('NOT_FOUND', 'User'), 400);
        }

        const agenycExists = await AgencyTalent.findOne({ agencyId: userId, 'talents.email': userDetails.email }, { _id: 1 }).lean();
        if (!agenycExists) {
            throw new CodeMonkError(local('NOT_FOUND', 'Agency'), 400);
        }
        return true;
    }
    /**
     * @desc This function is being used to get Talent details
     * @author Innovify
     * @since 17/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     * @param {Object} user Logged in user details
     */
    static async downloadProfile (req, user, local) {
        let id = req.params.id;
        if (user.role === CONSTANTS.ROLE.TALENT) {
            const talent = await Talent.findOne({ userId: user._id }).select('_id');
            id = talent._id;
        }

        const talentDetails = await TalentDetailsService.details(id, user, local);
        const htmlContent = await TalentDetailsService.prepareHtml(talentDetails,user);
        return await TalentDetailsService.generatePdf(htmlContent, talentDetails._id);
    }
    static async prepareHtml (talentDetails, user) {

        let htmlContent = await readFileAsync('htmlTemplates/index.html', 'utf8');
        htmlContent = htmlContent.replace(new RegExp('##BASE_URL', 'g'), process.env.BASE_URL);
        for (const [key, value] of Object.entries(talentDetails)) {
            if (typeof value === 'object') {
                switch (key) {
                    case 'teamPreference':
                        htmlContent = this.arrayValueMap(key, value, htmlContent, CONSTANTS.TEAM_PREFERENCE_LABEL);
                        break;
                    case 'assignments':
                        htmlContent = this.arrayValueMap(key, value, htmlContent, CONSTANTS.ASSIGNMENTS_LABEL);
                        break;
                    case 'workPreference':
                        htmlContent = this.arrayValueMap(key, value, htmlContent, CONSTANTS.WORK_PREFERENCE_LABEL);
                        break;
                    case 'industries':
                        htmlContent = this.arrayValueMap(key, value, htmlContent);
                        break;
                    case 'companyCultures':
                        htmlContent = this.arrayValueMap(key, value, htmlContent);
                        break;
                    case 'companyType':
                        htmlContent = this.arrayValueMap(key, value, htmlContent, CONSTANTS.COMPANY_TYPE_LABEL);
                        break;
                    case 'language':
                        htmlContent = this.languageArrayValueMap(key, value, htmlContent);
                        break;
                    case 'employmentType':
                        const isAgencyTalent = user && user.role === TALENT && user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY
                        htmlContent = htmlContent.replace(new RegExp('##IS_PERMANENT_EMPLOYEE', 'g'), !_.includes(value, CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_PE) ? 'hidden':'')
                        .replace(new RegExp('##IS_FREELANCER', 'g'), !_.includes(value,  CONSTANTS.TALENT.EMPLOYMENT_TYPE_LABEL_FR) ? 'hidden':'')
                        .replace(new RegExp('##PLATFORMFEES', 'g'), ADMIN === user.role ? '+ platform fees':'')
                        .replace(new RegExp('##SHOWEMPLOYMENT', 'g'), isAgencyTalent ? 'hidden':'');
                        break;
                    case 'skills':
                        htmlContent = this.mapTopSkills(key, value, htmlContent);
                        break;
                    case 'projectDetails':
                        htmlContent = this.mapProjectDetails(key, value, htmlContent);
                        break;
                    case 'workExperience':
                        htmlContent = this.mapWorkExperience(key, value, htmlContent);
                        break;
                    case 'educationDetails':
                        htmlContent = this.mapEducationDetails(key, value, htmlContent);
                        break;
                    case 'certificateDetails':
                        if (value.length) {
                            htmlContent = this.mapCertificateDetails(key, value, htmlContent);
                        } else {
                            htmlContent = htmlContent.replace(new RegExp('##HIDECERTIFICATE', 'g'), 'hidden');
                        }
                        break;
                    default:
                        break;
                }
            } else if (key === 'currency') {
                let currencyValue = 'USD';
                currency.forEach((cur) => {
                    if (cur.value === value) {
                        currencyValue = cur.symbol;
                    }
                });
                htmlContent = htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), currencyValue);
            } else if (key === 'currencyAnnualRate') {
                let currencyValue = 'USD';
                currency.forEach((cur) => {
                    if (cur.value === value) {
                        currencyValue = cur.symbol;
                    }
                });
                htmlContent = htmlContent.replace(new RegExp(`##2${key.toUpperCase()}`, 'g'), currencyValue);
            } else if (key === 'ratePerHour') {
                let rate = value ? value : 0
                if(CLIENT === user.role){
                    rate = Utils.round(rate + (rate * (CONSTANTS.RATE_MULTIPLIER - 1)), 2);
                }
                htmlContent = htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), rate);
            }  else if (key === 'annualRate') {
                let rate = value ? value : 0
                if(CLIENT === user.role){
                    rate = Utils.round(rate + (rate * (CONSTANTS.RATE_MULTIPLIER - 1)), 2);
                }
                htmlContent = htmlContent.replace(new RegExp(`##2${key.toUpperCase()}`, 'g'), rate);
            }  else if (key === 'firstName') {
                const firstName = Utils.capitalizeFirstLetter(value);
                htmlContent = htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), firstName);
            } else if (key === 'timeZone') {
                let timezoneString = '';
                const timeZone = timezones.filter((d) => {
                    return d.name === value;
                });
                if (timeZone.length) {
                    timezoneString = `${timeZone[0].offset} (${timeZone[0].name})`;
                }
                htmlContent = htmlContent.replace(new RegExp('##TIMEZONE', 'g'), timezoneString);
            } else if (key === 'verifiedProfile') {
                htmlContent = htmlContent.replace(new RegExp('##VERIFIEDPROFILE', 'g'), !value ? 'hidden':'');
            } else {
                htmlContent = htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
            }

        }
        return htmlContent;
    }
    static mapSkills (key, value, htmlContent) {
        let content = '';
        value.map(arrValue => {
            content += `<li>
                                <p>${arrValue.name} <span class="f-right">
                                    <span class="progress"><span style="width:${arrValue.rate * 10}%"></span></span>
                                </span></p>
                            </li>`;
        });
        return htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), content);
    }

    static mapTopSkills (key, value, htmlContent) {
        let content = '';
        const topSkills = value?JSON.parse(JSON.stringify(value)):[] ;
        const otherSkills = topSkills.splice(7);
        topSkills.map(arrValue => {
            const isTestPassed = false
            content += `<li>
                                <p>
                                    <img class="skill-status" src="${process.env.BASE_URL}/images/${isTestPassed?'tick.png':'info.png'}" />
                                    ${arrValue.name}
                                    <span class="f-right">
                                        <span class="progress"><span style="width:${arrValue.rate * 10}%"></span></span>
                                    </span>
                                </p>
                            </li>`;
        });
        const otherSkillContent = otherSkills.reduce((p,c)=> p + ',' + c ,'')
        return htmlContent.replace(new RegExp(`##TOPSKILLS`, 'g'), content)
        .replace(new RegExp(`##OTHERSKILLS`, 'g'), otherSkillContent)
        .replace(new RegExp(`##HASOTHERSKILLS`, 'g'), !otherSkills.length ? 'hidden' : '');
    }

    static mapProjectDetails (key, value, htmlContent) {
        let content = '';
        value.map(arrValue => {
            const skills = arrValue.skills ? arrValue.skills.reduce((p,c)=> p + ','+ c.name,''):'';
            const imageURL = arrValue.images && Array.isArray(arrValue.images) && arrValue.images.length ? arrValue.images.find(image => image.isCoverImage ? image.isCoverImage : false).logo : `${process.env.BASE_URL}/images/dummy_project.png`;

            content += ` <div class="project-details sub-section">
                            <div class="project-block display-flex">
                                <div class="project-image">
                                    <img src="${imageURL}" alt="${arrValue.name}" />
                                </div>
                                <div class="project-info">
                                    <p class="role">${arrValue.role}</p>
                                    <h3>${arrValue.name} <a href="${arrValue.url}" target="_blank"><img src="${process.env.BASE_URL}/images/new-tab.png" /></a></h3>
                                    <div>
                                        <p class="f-left">
                                            <img src="${process.env.BASE_URL}/images/profile.png" alt="##CLIENTNAME" />
                                            <span>${arrValue.employer}</span>
                                        </p> 
                                        <p class="f-left">
                                            <img src="${process.env.BASE_URL}/images/industry.png" alt="##INDUSTRYNAME" />
                                            <span>${arrValue.industry}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="description">${arrValue.description}</div>
                            <div class="project-skills">
                                <p class="project-skill-label">Skills & Tools used</p>
                                <p>${skills}</p>
                            </div>
                        </div>`;
        });
        return htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), content);
    }
    static mapWorkExperience (key, value, htmlContent) {
        let content = '';
        value.map(arrValue => {
            const imageURL = arrValue.logo ? arrValue.logo : `${process.env.BASE_URL}/images/dummy-image.png`;

            content += `<div class="sub-section">
        <div class="display-flex">
            <div class="image30">
                <img src="${imageURL}" alt="${arrValue.jobTitle}" />
            </div>
            <div class="sub-section-info">
                <p class="role font8">${MOMENT(arrValue.startDate).format('MMM DD, YYYY')} - ${arrValue.endDate ? MOMENT(arrValue.endDate).format('MMM DD, YYYY') : 'Present'}</p>
                <h3>${arrValue.jobTitle}</h3>
                <p>${arrValue.employer}, ${arrValue.country}</p>
            </div>
        </div>
        <div class="description">${arrValue.shortDescription}</div>
    </div>`;
        });
        return htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), content);
    }
    static mapEducationDetails (key, value, htmlContent) {
        let content = '';
        value.map(arrValue => {
            const imageURL = arrValue.logo ? arrValue.logo : `${process.env.BASE_URL}/images/dummy-image.png`;

            content += `<div class="sub-section">
        <div class="display-flex">
            <div class="image30">
                <img src="${imageURL}" alt="${arrValue.degreeLevel}" />
            </div>
            <div class="sub-section-info">
                <p class="role font8">${arrValue.startYear}-${arrValue.endYear}</p>
                <h3>${arrValue.degreeLevel}</h3>
                <p>${arrValue.collegeName}, ${arrValue.country}</p>
            </div>
        </div>
    </div>`;
        });
        return htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), content);
    }
    static mapCertificateDetails (key, value, htmlContent) {
        let content = '';
        value.map(arrValue => {
            const imageURL = arrValue.logo ? arrValue.logo : `${process.env.BASE_URL}/images/dummy-image.png`;

            content += `<div class="sub-section">
                            <div class="display-flex">
                                <div class="image30">
                                    <img src="${imageURL}" alt="${arrValue.name}" />
                                </div>
                                <div class="sub-section-info">
                                    <p class="role font8">${MOMENT(arrValue.dateObtained).format('MMM DD, YYYY')}</p>
                                    <h3>${arrValue.name}</h3>
                                    <p>${arrValue.issuedBy}</p>
                                </div>
                            </div>
                        </div>`;
        });
        return htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), content);
    }
    static async generatePdf (htmlContent, id) {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-web-security'
            ]
        });
        fs.writeFileSync('/tmp/test.html', htmlContent);

        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfName = `${process.env.NODE_ENV}-profiles/${id}.pdf`;
        const footerTemplate = `
            <div style="font-size: 9px; width: 100%;">
                <div style='padding-right:97px;float: right;float: right;font-size: 9px;color: #2A2536;'>
                <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
                <div style='padding-left:97px;color:gray;font-size: 9px;color: rgba(42, 37, 54, 0.5);'>
                    <span>www.codemonk.ai</span>
                </div>
            </div>
        `;
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            displayHeaderFooter: true,
            footerTemplate,
            margin: {
                top: 0,
                bottom: 40
            }
        });

        const pdfPath = await UploadService.uploadPdf(pdf, pdfName);
        // console message when conversion  is complete!
        await browser.close();
        return {
            pdfPath
        };
    }
    static arrayValueMap (key, value, htmlContent, label = undefined) {
        const content = value.map(arrValue => {
            return label ? label[arrValue]:`${arrValue}`;
        }).join(', ');
        return htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), content);
    }

    static languageArrayValueMap (key, value, htmlContent) {
        const content = value.map(arrValue => {
            const language = languages.find(l=>l.code===arrValue.name)
            return language ? language.language : arrValue.name;
        }).join(', ');
        return htmlContent.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), content);
    }
}

module.exports = TalentDetailsService;

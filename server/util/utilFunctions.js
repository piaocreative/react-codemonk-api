const fs = require('fs');
const pdf = require('html-pdf');
const HTTPStatus = require('./http-status');
const countryList = require('./country');
const { promisify } = require('util');
const readFileSync = promisify(fs.readFile);
const TalentEventlogRecordService = require('../services/v2/talentEventlogRecord/talentEventlogRecordService');
const TalentReferralLogService = require('../services/v2/talentReferralLog/talentReferralLogService');


/**
 * This class reprasents common utilities for application
 */
class Utils {
    static errorResponse () {
        return JSON.parse(
            JSON.stringify({
                status: 0,
                data: {},
                message: ''
            })
        );
    }

    static successResponse () {
        return JSON.parse(
            JSON.stringify({
                status: 1,
                data: {},
                message: ''
            })
        );
    }

    /**
     * This function is being used to add pagination for user table
     * @auther Innovify
     * @param {string} error Error Message
     * @param {Object} data Object to send in response
     * @param {Object} res Response Object
     * @param {string} successMessage success message
     * @param {Object} additionalData additional data outside of data object in response
     * @param {string} successMessageVars
     * @since 01/01/2020
     */
    static sendResponse (error, data, res, successMessage, successMessageVars) {
        let responseObject;
        if (error) {
            let status;
            responseObject = Utils.errorResponse();
            if (error instanceof CodeMonkError) {
                responseObject.message = error.message;
                status = error.statusCode ? error.statusCode : HTTPStatus.BAD_REQUEST;
                CONSOLE_LOGGER.info(error.message);
            } else {
                responseObject.message = res.__('ERROR_MSG');
                status = HTTPStatus.INTERNAL_SERVER_ERROR;
                CONSOLE_LOGGER.error(error);
            }
            responseObject.data = error.data;
            res.status(status).send(responseObject);
        } else {
            responseObject = Utils.successResponse();
            responseObject.message = successMessageVars
                ? res.__.apply('', [successMessage].concat(successMessageVars))
                : successMessage;
            responseObject.data = data;
            responseObject.newQuote = res.newQuote;
            responseObject.newBrief = res.newBrief;
            responseObject.newTimesheet = res.newTimesheet;
            responseObject.newNotification = res.newNotification;
            res.status(HTTPStatus.OK).send(responseObject);
        }
    }

    static generateOtp () {
        if (process.env.NODE_ENV === 'testing') {
            return 123456;
        } else {
            return Math.floor(Math.random() * 900000) + 100000;
        }
    }

    static getDateFromDDMMYYY (date) {
        const startDate = date;
        const startDateArray = startDate.split('/');
        const startDateParsed =
            Date.parse(startDateArray[2] + '-' + startDateArray[1] + '-' + startDateArray[0]);
        return MOMENT(startDateParsed).utc();
    }

    /**
     * @desc This function is being used to get limit for list
     * @author Innovify
     * @since 15/09/2020
     * @param {Number} limit limit
     */
    static getLimit (limit) {
        return (limit) ? parseInt(limit) : 20;
    }

    /**
     * @desc This function is being used to get page number for list
     * @author Innovify
     * @since 15/09/2020
     * @param {Number} page page
     * @param {Number} limit limit
     */
    static getPageNumber (page) {
        return (page) ? parseInt(page) : 1;
    }

    static getInterviewAggregateParams () {
        return [{
            $lookup: {
                from: 'talents',
                let: { t: '$talentId' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$_id', '$$t'] } } },
                    { $project: { '_id': 0, 'userId': '$userId' } }
                ],
                as: 'talents'
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$talents', 0] }, '$$ROOT']
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { ut: '$userId' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$_id', '$$ut'] } } },
                    {
                        $project: {
                            '_id': 0,
                            talentName: { $concat: ['$firstName', ' ', '$lastName'] },
                            talentEmail: '$email'
                        }
                    }
                ],
                as: 'talentDetails'
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$talentDetails', 0] }, '$$ROOT']
                }
            }
        },
        {
            $lookup: {
                from: 'users',
                let: { ct: '$clientId' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$_id', '$$ct'] } } },
                    {
                        $project: {
                            '_id': 0,
                            clientName: { $concat: ['$firstName', ' ', '$lastName'] },
                            clientEmail: { $concat: '$email' }
                        }
                    }
                ],
                as: 'clientDetails'
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$clientDetails', 0] }, '$$ROOT']
                }
            }
        },
        {
            $lookup: {
                from: 'clients',
                let: { ct: '$clientId' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$userId', '$$ct'] } } },
                    {
                        $project: {
                            '_id': 1,
                            companyName: { $concat: ['$billing.companyDetails.name', ''] }
                        }
                    }
                ],
                as: 'companyDetails'
            }
        },
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$companyDetails', 0] }, '$$ROOT']
                }
            }
        },
        {
            $project: {
                _id: 1,
                dateRequested: { $toDate: '$_id' },
                name: 1,
                description: 1,
                timeSlots: 1,
                clientId: '$companyDetails._id',
                clientName: 1,
                companyName: 1,
                clientEmail: 1,
                talentId: 1,
                talentName: 1,
                talentEmail: 1,
                projectId: 1,
                status: {
                    $switch: {
                        branches: [
                            { case: { $eq: ['$status', 0] }, then: 'Requested' },
                            { case: { $eq: ['$status', 1] }, then: 'In Progress' },
                            { case: { $eq: ['$status', 2] }, then: 'Done' }
                        ],
                        default: ''
                    }
                },
                talentStatus: {
                    $switch: {
                        branches: [
                            { case: { $eq: ['$talentStatus', 0] }, then: 'Rejected' },
                            { case: { $eq: ['$talentStatus', 1] }, then: 'Hired' }
                        ],
                        default: ''
                    }
                }
            }
        }];
    }

    static getEngageBayContactProproperties (user) {
        const contactDetails = [];
        if (user.firstName) {
            contactDetails.push({
                name: 'name',
                value: user.firstName,
                field_type: 'TEXT',
                is_searchable: true,
                type: 'SYSTEM'
            });
        }
        if (user.lastName) {
            contactDetails.push({
                name: 'last_name',
                value: user.lastName,
                field_type: 'TEXT',
                is_searchable: false,
                type: 'SYSTEM'
            });
        }
        if (user.email) {
            contactDetails.push({
                name: 'email',
                value: user.email,
                field_type: 'TEXT',
                is_searchable: true,
                type: 'SYSTEM'
            });
        }
        if (user.countryCode && user.phoneNumber) {
            contactDetails.push({
                name: 'phone',
                value: `${user.countryCode} ${user.phoneNumber}`,
                field_type: 'TEXT',
                is_searchable: true,
                type: 'SYSTEM'
            });
        }

        return contactDetails;
    }

    static projectStatusCase () {
        return {
            $switch: {
                branches: [
                    { case: { $eq: ['$status', 0] }, then: 'Requested' },
                    { case: { $eq: ['$status', 1] }, then: 'Proposed' },
                    { case: { $eq: ['$status', 2] }, then: 'Discovery' },
                    { case: { $eq: ['$status', 3] }, then: 'Kick-off' },
                    { case: { $eq: ['$status', 4] }, then: 'In Progress' },
                    { case: { $eq: ['$status', 5] }, then: 'On Hold' },
                    { case: { $eq: ['$status', 6] }, then: 'Suspended' },
                    { case: { $eq: ['$status', 7] }, then: 'Closed' }
                ],
                default: ''
            }
        };
    }

    /**
     * @desc This function is being used to generate pdf
     * @author Innovify
     * @since 18/09/2020
     * @param {String} html Prepared html file
     */
    static async createPDF (html, options = { format: 'A4' }) {
        return await new Promise((resolve, reject) => {
            pdf.create(html, options).toBuffer((err, buffer) => {
                if (err) {
                    CONSOLE_LOGGER.error('Pdf create failed', html, err);
                    reject(err);
                }

                resolve(buffer);
            });
        });
    }

    static async perpareProjectTemplate (project) {
        const html = await readFileSync('./emailTemplates/projectDetails.html', 'utf8');
        const buildStatus = (project.buildStatus === 'live') ? `${project.buildStatus} ${project.url}` : project.buildStatus;

        return html.replace('{{name}}', project.name)
            .replace('{{description}}', project.description)
            .replace('{{buildStatus}}', buildStatus)
            .replace('{{design}}', (project.lookingFor.design) ? project.lookingFor.design.join(', ') : 'No')
            .replace('{{softwareDevelopment}}',
                (project.lookingFor.softwareDevelopment) ? project.lookingFor.softwareDevelopment.join(', ') : 'No')
            .replace('{{developmentTeam}}',
                (project.lookingFor.developmentTeam) ? project.lookingFor.developmentTeam.join(', ') : 'No')
            .replace('{{dataAiMl}}',
                (project.lookingFor.dataAiMl) ? project.lookingFor.dataAiMl.join(', ') : 'No')
            .replace('{{isGrowthHacking}}', (project.lookingFor.isGrowthHacking) ? 'Yes' : 'No')
            .replace('{{isAgileCoach}}', (project.lookingFor.isAgileCoach) ? 'Yes' : 'No')
            .replace('{{other}}', project.lookingFor.other)
            .replace('{{budget}}', project.budget)
            .replace('{{messageToPreSales}}', project.messageToPreSales)
            .replace('{{speed}}', project.speed)
            .replace('{{teamManageType}}', project.teamManageType)
            .replace('{{year}}', MOMENT().year());
    }

    static async perpareQuoteTemplate (agencyQuote, projectName) {
        const html = await readFileSync('./emailTemplates/quoteDetails.html', 'utf8');
        return html.replace('{{name}}', projectName)
            .replace('{{totalCost}}', agencyQuote.totalCost)
            .replace('{{assumptions}}', agencyQuote.assumptions)
            .replace('{{outOfScope}}', agencyQuote.outOfScope)
            .replace('{{teamStructure}}', agencyQuote.teamStructure)
            .replace('{{otherInfo}}', agencyQuote.otherInfo)
            .replace('{{year}}', MOMENT().year());
    }

    static weekylyAvailability (data, workPreference, unavailability) {
        if (workPreference.includes('fulltime')
            || workPreference.includes('parttime-weekdays-am')
            || workPreference.includes('parttime-weekdays-pm')) {
            data[1].availability = true;
            data[2].availability = true;
            data[3].availability = true;
            data[4].availability = true;
            data[5].availability = true;
        } else if (workPreference.includes('parttime-weekends')) {
            data[0].availability = true;
            data[6].availability = true;
        }

        data.map(d => {
            unavailability.map(u => {
                if (MOMENT(u.date).format('yyyy-mm-dd') === MOMENT(d.date).format('yyyy-mm-dd')) {
                    d.availability = false;
                }
            });
        });

        return data;
    }

    static getCurrentWeekDays () {
        const currentDate = MOMENT();
        const weekStart = currentDate.clone().startOf('week');
        const days = [];
        for (let i = 0; i <= 6; i++) {
            days.push({ date: MOMENT(weekStart).add(i, 'days')._d, availability: false });
        }
        return days;
    }

    static getCountryNameFromISO2 (code) {
        return _.find(countryList, (o) => (o.alpha2code === code));
    }

    static getUserStatus (isTalent = false, isRecruiter = false, isAmbassador = false) {
        if(isRecruiter || isAmbassador){
            return {
                $switch: {
                    branches: [{
                        case: {
                            $and: [{ $eq: ['$isActive', 1] }, { $gte: ['$signupStep', 2] }]
                        },
                        then: 'Active'
                    },
                    {
                        case: {
                            $and: [{ $eq: ['$isActive', 2] }]
                        }, then: 'Suspend'
                    }],
                    default: 'Registered'
                }
            };
        } else if (isTalent) {
            return {
                $switch: {
                    branches: [
                        {
                            case: {
                                $and: [
                                    { $eq: ['$isActive', 1] },
                                    {
                                        $or: [
                                            {
                                                $and: [
                                                    { $gte: ['$signupStep', CONSTANTS.AGENCY.TALENT.ACTIVE_STATUS] },
                                                    { registerType: 'agency' }
                                                ]
                                            },
                                            {
                                                $and: [
                                                    { $eq: ['$signupStep', CONSTANTS.TALENT.REGITRATION_STATUS.PAY_DETAIL] },
                                                    { registerType: 'freelancer' }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            then: 'Active'
                        },
                        {
                            case: {
                                $and: [{ $eq: ['$isActive', 2] }]
                            }, then: 'Suspend'
                        }],
                    default: 'Unregistered'
                }
            };
        } else {
            return {
                $switch: {
                    branches: [{
                        case: {
                            $and: [{ $eq: ['$isActive', 1] }, { $gte: ['$signupStep', 2] }]
                        },
                        then: 'Active'
                    },
                    {
                        case: {
                            $and: [{ $eq: ['$isActive', 2] }]
                        }, then: 'Suspend'
                    }],
                    default: 'Unregistered'
                }
            };
        }

    }

    static getUserStatusForRecruiter () {
        return this.getUserStatus(false,true)
    }

    static getUserStatusForAmbassador () {
        return this.getUserStatus(false,false,true)
    }

    static getStatusMatchFilter (queryStatus, isTalent, isRecruiter = false, isAmbassador = false) {
        let status = queryStatus;
        switch (queryStatus) {
            case '0':
                status = isRecruiter || isAmbassador ? 'registered' : 'unregistered';
                break;
            case '1':
                status = 'active';
                break;
            case '2':
                status = 'suspended';
                break;
            default:
                break;
        }
        let query = {};
        const orCondition = [];
        status.split(',').forEach((s) => {
            switch (s) {
                case 'unregistered':
                case 'registered':
                    orCondition.push(this.unCompleteUserQuery(isTalent, isRecruiter, isAmbassador));
                    break;
                case 'active':
                    orCondition.push(this.activeUserQuery(isTalent, isRecruiter, isAmbassador));
                    break;
                case 'suspended':
                    orCondition.push({ isActive: 2 });
                    break;
            }
        });
        if (orCondition.length === 1) {
            query = orCondition[0];
        } else if (orCondition.length > 1) {
            query.$or = orCondition;
        }
        return query;
    }

    static getCommonUserSearchAggregateParams (status, isTalent = false, isRecruiter = false, isAmbassador = false) {
        let aggregateParams = [];
        if (status) {
            aggregateParams = [{
                $match: Utils.getStatusMatchFilter(status, isTalent, isRecruiter, isAmbassador)
            }];
        }

        aggregateParams.push({
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'users'
            }
        });

        aggregateParams.push({
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: [{ $arrayElemAt: ['$users', 0] }, '$$ROOT']
                }
            }
        });

        aggregateParams.push({
            $match: { 'isDelete': 0 }
        });

        return aggregateParams;
    }

    static prepareJobPostObject (data) {
        return {
            name: data.name,
            description: data.description,
            role: data.role,
            skills: data.skills,
            workPreference: data.workPreference,
            teamPreference: Array.isArray(data.teamPreference) ? data.teamPreference : [],
            assignments: Array.isArray(data.assignments) ? data.assignments : [],
            expertise: data.expertise,
            expertiseOrder: data.expertise && CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(data.expertise),
            duration: data.duration
        };
    }

    static prepareJobPostBasicDetailsObject (data) {
        return {
            name: data.name,
            description: data.description,
            role: data.role,
            workPreference: data.workPreference,
            teamPreference: Array.isArray(data.teamPreference) ? data.teamPreference : [],
            assignments: Array.isArray(data.assignments) ? data.assignments : [],
            expertise: data.expertise,
            expertiseOrder: data.expertise && CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(data.expertise),
            duration: data.duration
        };
    }

    static prepareJobPostRoleObject (data) {
        return {
            name: data.name,
            description: data.description,
            role: data.role,
            teamPreference: Array.isArray(data.teamPreference) ? data.teamPreference : [],
            expertise: data.expertise,
            expertiseOrder: data.expertise && CONSTANTS.YEAR_OF_EXPERIENCE.indexOf(data.expertise)
        };
    }

    /**
     * @desc This function is being to prepare string date
     *  to date object for agency update directors/shareholders details
     * @author Innovify
     * @since 03/09/2020
     * @param {Object} data data
     */
    static prepareDirectorsDataDOB (data) {
        return data.map((d) => {
            d.dob = Utils.getDateFromDDMMYYY(d.dob);
            return d;
        });
    }
    /**
     * @desc This function returns all active status of project
     * @author Innovify
     * @since 03/12/2020
     */
    static getProjectsActiveStatus () {
        return [0, 1, 2, 3, 4, 5];
    }

    /**
     * find split and attach keys in object for mongodb queries
     * @param {Object} body
     * @param {Array} keys
     */
    static splitAndAddFields (body, keys) {
        const object = {};
        keys.forEach((k) => {
            if (body[k]) {
                object[k] = { $in: body[k].split(',') };
            }
        });
        return object;
    }

    static roleWiseTalentCount () {
        return [
            {
                $group: {
                    _id: '$talents.talentId'
                }
            },
            {
                $lookup: {
                    from: 'talents',
                    let: { t: '$_id' },
                    pipeline: [
                        { $match: { '$expr': { '$eq': ['$userId', '$$t'] } } },
                        {
                            $project: {
                                primaryRole: 1
                            }
                        }],
                    as: 'talentDetails'
                }
            },
            {
                $unwind: {
                    path: '$talentDetails'
                }
            },
            {
                $group: {
                    _id: '$talentDetails.primaryRole',
                    value: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    value: 1
                }
            }
        ];
    }

    /**
     * Filter multi select data
     * @param {Array} constArray
     * @param {string} dataString
     */
    static stringFilter (constArray, dataString) {
        if (typeof dataString !== 'string') {
            return [];
        }
        return dataString.split(',').filter((d) => {
            return constArray.includes(d);
        });
    }

    static numberFilter (constArray, dataString) {
        if (typeof dataString !== 'string') {
            return [];
        }
        return dataString.split(',').filter((d) => {
            return Utils.isPositiveInteger(d) && constArray.length >= Math.floor(d / 10) && Math.floor(d / 10) > 0;
        }).map((d)=>{
            return constArray[parseInt(d / 10, 10) - 1];
        });
    }

    static lengthFilter (length, dataString) {
        if (typeof dataString !== 'string') {
            return [];
        }
        return dataString.split(',').filter((d) => {
            return d && length && length.MIN && length.MAX &&
                length.MIN <= d.length && d.length <= length.MAX;
        });
    }

    static activeUserQuery (isTalent, isRecruiter = false, isAmbassador = false) {
        if (isRecruiter || isAmbassador) {
            return { isActive: 1, signupStep: { $gte: 2 } };
        } else if (isTalent) {
            return {
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
        } else {
            return { isActive: 1, signupStep: { $gte: 2 } };
        }
    }

    static unCompleteUserQuery (isTalent, isRecruiter = false, isAmbassador = false) {
        if (isRecruiter || isAmbassador) {
            return {
                $or: [{ signupStep: { $exists: false } },
                    { signupStep: { $lte: 2 } }]
            };
        } else if (isTalent) {
            return {
                $or: [{
                    registerType: 'freelancer',
                    signupStep: { $lt: CONSTANTS.TALENT.ACTIVE_STATUS }
                },
                {
                    registerType: 'agency',
                    signupStep: { $lt: CONSTANTS.AGENCY.TALENT.ACTIVE_STATUS }
                }, {
                    signupStep: { $exists: false }
                }]
            };
        } else {
            return {
                $or: [{
                    signupStep: { $exists: false }
                },
                {
                    signupStep: { $lt: 2 }
                }]
            };
        }
    }

    static capitalizeFirstLetter (str) {
        var firstCodeUnit = str[0];

        if (firstCodeUnit < '\uD800' || firstCodeUnit > '\uDFFF') {
            return str[0].toUpperCase() + str.slice(1);
        }
        return str.slice(0, 2).toUpperCase() + str.slice(2);
    }

    static round (number, decimalDigits = 0) {
        if (isNaN(number)) {
            return number;
        }
        const num = number * 1.0;
        return Math.round((num + Number.EPSILON) * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits);
    }

    static previousWeekStarting () {
        return MOMENT().utc().startOf('day').startOf('isoWeek').subtract(14, 'day');
    }

    static async isBetween (start, end) {
        return MOMENT().utc().isBetween(MOMENT(start).utc(), MOMENT(end).utc().endOf('day'), 'day');
    }

    static getSignupStep (user, currentStep) {

        if (user && user.signupStep && user.signupStep >= currentStep) {
            return 0;
        }
        return this.getEligibleSignupStep(user, currentStep);
    }

    static getUpdatableSignupStep (user, currentStep) {
        const eligibleSignupStep = this.getEligibleSignupStep(user, currentStep);
        return eligibleSignupStep >= currentStep ? eligibleSignupStep : 0;
    }

    static getEligibleSignupStep (user, currentStep) {

        if (!((currentStep === CONSTANTS.TALENT.V2.REGITRATION_STATUS.ABOUT_YOU) || (user && user.firstName && user.lastName
            && user.countryCode && user.phoneNumber && user.dob && user.gender
            && user.postcode && user.addressLineOne && user.city
            && user.country && user.language && user.timeZone && user.primaryRole
            && user.yearsOfExperience))) {
            return 0;
        }

        if (!((currentStep === CONSTANTS.TALENT.V2.REGITRATION_STATUS.EDUCATION_DETAIL) ||
            (user && user.educationDetails && Array.isArray(user.educationDetails)
                && user.educationDetails.length))) {
            return 1;
        }

        if (!((currentStep === CONSTANTS.TALENT.V2.REGITRATION_STATUS.WORK_EXPERIENCE_DETAIL) ||
            (user && user.workExperience && Array.isArray(user.workExperience)
                && user.workExperience.length))) {
            return 2;
        }

        if (!((currentStep === CONSTANTS.TALENT.V2.REGITRATION_STATUS.PROJECT_DETAIL && user && user.projectDetails && Array.isArray(user.projectDetails)
            && user.projectDetails.length && user.projectDetails.length > 1) ||
            (user && user.projectDetails && Array.isArray(user.projectDetails)
                && user.projectDetails.length && user.projectDetails.length > 2))) {
            return 3;
        }

        if (!((currentStep === CONSTANTS.TALENT.V2.REGITRATION_STATUS.PREFERENCE_DETAIL) ||
            (user && user.industries && Array.isArray(user.industries)
                && user.industries.length && user.companyCultures && Array.isArray(user.companyCultures)
                && user.companyCultures.length && user.companyType && Array.isArray(user.companyType)
                && user.companyType.length && user.preferredProjectDuration && Array.isArray(user.preferredProjectDuration)
                && user.preferredProjectDuration.length && user.teamPreference && Array.isArray(user.teamPreference)
                && user.teamPreference.length && user.assignments && Array.isArray(user.assignments)
                && user.assignments.length && user.workPreference && Array.isArray(user.workPreference)
                && user.workPreference.length))) {
            return 4;
        }

        if (user && user.registerType && user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY) {
            return 5;
        }

        if (!((currentStep === CONSTANTS.TALENT.V2.REGITRATION_STATUS.BILLING_DETAIL) ||
            (user && user.employmentType && Array.isArray(user.employmentType)
                && user.employmentType.length))) {
            return 5;
        }

        if (!((currentStep === CONSTANTS.TALENT.V2.REGITRATION_STATUS.UPLOAD_DOC) ||
            (user && user.addressProofUrl && user.idProofUrl))) {
            return 6;
        }

        return 7;
    }

    static async profileCompleteLog (user, oldUserStep) {
        if ((user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER && user.signupStep === 7 && oldUserStep < 7)
            || (user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY && user.signupStep === 5 && oldUserStep < 5)) {
            await TalentEventlogRecordService.addEventLog(user.userId, 'profileCompleted', 'Profile completed');
            await TalentReferralLogService.updateReferralLog(user.userId, 'Active');
        }
    }

    static async profileEditLog (user, oldUserStep) {
        if ((user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER && oldUserStep === 7) || (user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY && oldUserStep === 5)) {
            await TalentEventlogRecordService.addEventLog(user.userId, 'profileEdited', 'Profile Edited');
        }
    }

    static isPositiveInteger (str) {
        if (typeof str !== 'string') {
            return false;
        }
        const num = Number(str);
        if (Number.isInteger(num) && num > 0) {
            return true;
        }
        return false;
    }

    static getEligibleSignupStepForClient (user, currentStep) {

        if (!((currentStep === CONSTANTS.CLIENT.REGITRATION_STATUS.BASIC_PROFILE) || (user && user.firstName && user.lastName
            && user.countryCode && user.phoneNumber && user.jobTitle && user.jobRole))) {
            return 0;

        }

        if (!((currentStep === CONSTANTS.CLIENT.REGITRATION_STATUS.COMAPNY_DETAIL) ||
            (user && user.billing && user.billing.companyDetails
                && user.billing.companyDetails.name && user.billing.companyDetails.brand
                && user.billing.companyDetails.registeredNumber && user.billing.companyDetails.vatNumber
         && user.billing.companyDetails.industry && user.billing.companyDetails.companyType
         && user.billing.companyDetails.cultures && Array.isArray(user.billing.companyDetails.cultures) && user.billing.companyDetails.cultures.length))) {
            return 1;
        }

        if (!((currentStep === CONSTANTS.CLIENT.REGITRATION_STATUS.COMPANY_LOCATION) ||
            (user && user.billing && user.billing.companyLocation && Array.isArray(user.billing.companyLocation)
                && user.billing.companyLocation.length))) {
            return 2;
        }

        return 3;
    }


    static getSignupStepForClient (user, currentStep) {

        if (user && user.signupStep && user.signupStep >= currentStep) {
            return 0;
        }
        return this.getEligibleSignupStepForClient(user, currentStep);
    }
}

module.exports = Utils;

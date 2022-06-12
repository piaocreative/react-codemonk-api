const Notification = require('../../models/notification.model');
const Project = require('../../models/project.model');
const User = require('../../models/user.model');
const Agency = require('../../models/agency.model');
const AgencyTalent = require('../../models/agencyTalent.model');
const Talent = require('../../models/talent.model');
const CodeMonkError = require('../../util/CodeMonkError');
/**
 * Class represents services for add notification.
 */
class AddNotificationService {

    /**
     * @desc This function is being used to add notification
     * @author Innovify
     * @since 18/01/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in client user data
     */
    static async addNotification (req, user, local) {
        const reqObj = await this.prepareObj(req.body, user, local);
        await Notification.create(reqObj);
    }
    static async prepareObj (obj, user, local) {
        const reqObj = { addedBy: user._id };
        let activeTalents = [];
        let finalObj = [];
        let projectDetails = {};
        let userDetails = {};
        switch (obj.notificationType) {
            case CONSTANTS.NOTIFICATION_TYPE.BRIEF_ADDED:
                reqObj.notificationType = CONSTANTS.NOTIFICATION_TYPE.BRIEF_ADDED;
                reqObj.message = CONSTANTS.NOTIFICATION_MESSAGE.BRIEF_ADDED;
                reqObj.metaData = {
                    jobPostId: obj.jobPostId
                };
                activeTalents = await this.activeTalents();
                break;
            case CONSTANTS.NOTIFICATION_TYPE.NEW_QUOTE:
                reqObj.notificationType = CONSTANTS.NOTIFICATION_TYPE.NEW_QUOTE;
                reqObj.message = CONSTANTS.NOTIFICATION_MESSAGE.NEW_QUOTE;
                reqObj.metaData = {
                    quoteId: obj.quoteId,
                    projectId: obj.projectId
                };
                activeTalents = await this.activeAgencies();
                break;
            case CONSTANTS.NOTIFICATION_TYPE.TALENT_ADDED:
                reqObj.notificationType = obj.notificationType;
                reqObj.metaData = {
                    projectId: obj.projectId,
                    talentId: obj.talentId,
                    clientId: obj.clientId
                };
                reqObj.message = `${CONSTANTS.NOTIFICATION_MESSAGE.TALENT_ADDED} ${obj.projectName}`;
                reqObj.userId = obj.talentId;
                finalObj.push({
                    ...reqObj, ...{
                        userId: obj.clientId,
                        message: `${CONSTANTS.NOTIFICATION_MESSAGE.TALENT_ADDED} ${obj.projectName}`
                    }
                });

                finalObj.push({
                    ...reqObj, ...{
                        userId: obj.clientId,
                        message: `${obj.talentName} ${CONSTANTS.NOTIFICATION_MESSAGE.TALENT_ADDED_CLIENT_TEXT} ${obj.projectName}`
                    }
                });
                reqObj.message = `${obj.talentName} ${CONSTANTS.NOTIFICATION_MESSAGE.TALENT_ADDED_CLIENT_TEXT} ${obj.projectName}`;
                finalObj = await this.pushAgencyTalent(finalObj, reqObj, obj.talentId);
                break;
            case CONSTANTS.NOTIFICATION_TYPE.TIMESHEET_APPROVED:
                reqObj.notificationType = obj.notificationType;
                reqObj.metaData = {
                    timesheetId: obj.timesheetId
                };
                reqObj.message = CONSTANTS.NOTIFICATION_MESSAGE.TIMESHEET_APPROVED;
                reqObj.userId = obj.talentId;
                finalObj.push(reqObj);
                finalObj = await this.pushAgencyTalent(finalObj, reqObj, obj.talentId);
                break;
            case CONSTANTS.NOTIFICATION_TYPE.TIMESHEET_INREVIEW:
                reqObj.notificationType = obj.notificationType;
                reqObj.metaData = {
                    timesheetId: obj.timesheetId
                };
                reqObj.message = CONSTANTS.NOTIFICATION_MESSAGE.TIMESHEET_INREVIEW;
                reqObj.userId = obj.talentId;
                finalObj.push(reqObj);
                finalObj = await this.pushAgencyTalent(finalObj, reqObj, obj.talentId);

                break;
            case CONSTANTS.NOTIFICATION_TYPE.TIMESHEET_SETTELED:
                reqObj.notificationType = obj.notificationType;
                reqObj.metaData = {
                    timesheetId: obj.timesheetId
                };
                reqObj.message = CONSTANTS.NOTIFICATION_MESSAGE.TIMESHEET_SETTELED;
                reqObj.userId = obj.talentId;
                finalObj.push(reqObj);
                finalObj = await this.pushAgencyTalent(finalObj, reqObj, obj.talentId);
                break;
            case CONSTANTS.NOTIFICATION_TYPE.TIMESHEET_SUBMIT:
                projectDetails = await this.getProject(obj.projectId);
                userDetails = await this.getUser(obj.talentId);
                reqObj.notificationType = obj.notificationType;
                reqObj.metaData = {
                    timesheetId: obj.timesheetId,
                    projectId: obj.projectId
                };
                reqObj.message = `${CONSTANTS.NOTIFICATION_MESSAGE.TIMESHEET_SUBMIT_1} ${userDetails.firstName} ${userDetails.lastName}
                 ${CONSTANTS.NOTIFICATION_MESSAGE.TIMESHEET_SUBMIT_2} ${projectDetails.name}`;
                reqObj.userId = obj.clientId;
                finalObj.push(reqObj);
                finalObj = await this.pushAgencyTalent(finalObj, reqObj, obj.talentId);
                break;
            case CONSTANTS.NOTIFICATION_TYPE.BRIEF_APPLY:
                userDetails = await this.getUser(obj.talentId);
                reqObj.notificationType = obj.notificationType;
                reqObj.metaData = {
                    jobPostId: obj.jobPostId,
                    jobId: obj.jobId,
                    role: obj.role
                };
                reqObj.message = `${CONSTANTS.NOTIFICATION_MESSAGE.BRIEF_APPLY}`
                    .replace(/<TALENT_NAME>/i, `${userDetails.firstName} ${userDetails.lastName}`)
                    .replace(/<ROLE>/i, obj.role ? `${obj.role}` : '' )
                    .replace(/<JOB_ID>/i, obj.jobId ? `${obj.jobId}` : '');
                reqObj.userId = obj.clientId;
                finalObj.push(reqObj);
                break;
            default:
                throw new CodeMonkError(local('INVALID'), 400);
        }

        if (activeTalents && activeTalents.length) {
            activeTalents.forEach(talent => {
                finalObj.push({ ...{ userId: talent.userId }, ...reqObj });
            });
        }
        return finalObj;
    }
    static async activeTalents () {
        const cond = {
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
        const aggregateParams = [];
        aggregateParams.push(
            {
                $match: cond
            },
            {
                $project: {
                    _id: 1,
                    userId: 1
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        );
        return await Talent.aggregate(aggregateParams);
    }
    static async getProject (id) {
        return await Project.findById(id, ['name']);

    }
    static async getUser (id) {
        return await User.findById(id, ['firstName', 'lastName', 'email']);

    }
    static async activeAgencies () {
        const cond = {
            isActive: 1
        };
        const aggregateParams = [];
        aggregateParams.push(
            {
                $match: cond
            },
            {
                $project: {
                    _id: 1,
                    userId: 1
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        );
        return await Agency.aggregate(aggregateParams);
    }
    static async getAgencyTalent (talentId) {
        const userData = await this.getUser(talentId);
        const agencyData = await AgencyTalent.findOne(
            {
                'talents.email': userData.email
            }, {
                _id: 0,
                agencyId: 1
            }
        );
        return agencyData && agencyData.agencyId;
    }
    static async pushAgencyTalent (finalObj, reqObj, talentId) {
        const userId = await this.getAgencyTalent(talentId);
        if (userId) {
            finalObj.push({ ...reqObj, ...{ userId } });
        }
        return finalObj;
    }
}

module.exports = AddNotificationService;

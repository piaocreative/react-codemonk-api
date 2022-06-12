const User = require('../../../../models/user.model');
const DashboardValidator = require('./dashboardValidator');
const Email = require('../../../../util/sendEmail');
const AssignReferrerToTalentService = require('../../assignReferrerToTalent/assignReferrerToTalentService');

/**
 * Class represents services for Ambassador dashboard
 */
class DashboardService {
    /**
     * @desc This function is being used to a ambassador invite multiple talents
     * @author CodeMonk
     * @since 03/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async inviteTalents(req, user, local) {
        const Validator = new DashboardValidator(req.body, local);
        await Validator.validationInviteEmails(req.body.emails);
        const uniqueObject = _.uniqBy(req.body.emails, 'email');
        const uniqueEmail = [];
        uniqueObject.map((d) => {
            uniqueEmail.push(d.email);
        });

        const existingUsers = await User.find({ email: { $in: uniqueEmail } }, { _id: 0, email: 1 }).lean();
        const dbEmails = existingUsers.map((d) => { return d.email; });
        const emails = _.difference(uniqueEmail, dbEmails);
        emails.map((emailOne) => {
            const referername = `${user.firstName} ${user.lastName}`;
            const subject = `${user.firstName} ${user.lastName} nominated you to become a CodeMonk`;
            const template = 'emailTemplates/inviteFriends.html';
            const appUrl = (user.role === CONSTANTS.ROLE.AMBASSADOR) ? process.env.FRONTEND_URL_TALENT : process.env.FRONTEND_URL_CLIENT;
            const templateVariables = {
                appUrl: appUrl,
                referername: (referername) ? referername : 'User',
                referralurl: `${appUrl}/referral/${user._id} `
            };
            Email.prepareAndSendEmail([emailOne], subject, template, templateVariables);
            AssignReferrerToTalentService.assignReferrerToTalentFromInvite(emailOne, `${user._id}`);
        });
    }
    /**
     * @desc This function is being used to a ambassador invite multiple talents
     * @author CodeMonk
     * @since 03/01/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async inviteClients(req, user, local) {
        console.log('----- start here ------- user : ', user.role);

        const Validator = new DashboardValidator(req.body, local);
        await Validator.validationInviteEmails(req.body.emails);
        const uniqueObject = _.uniqBy(req.body.emails, 'email');
        const uniqueEmail = [];
        uniqueObject.map((d) => {
            uniqueEmail.push(d.email);
        });
        const emailNames = {};
        req.body.emails.forEach((item) => {
            if (item.email && item.name) {
                emailNames[item.email] = item.name;
            }
        });

        
        const existingUsers = await User.find({ email: { $in: uniqueEmail } }, { _id: 0, email: 1 }).lean();
        const dbEmails = existingUsers.map((d) => { return d.email; });
        const emails = _.difference(uniqueEmail, dbEmails);
        emails.map((emailOne) => {
            const referername = `${user.firstName} ${user.lastName}`;
            const subject = `${user.firstName} ${user.lastName} nominated you to become a CodeMonk`;
            const template = 'emailTemplates/inviteFriends.html';
            const appUrl = process.env.FRONTEND_URL_CLIENT;
            const templateVariables = {
                appUrl: appUrl,
                referername: (referername) ? referername : 'User',
                referralurl: `${appUrl}/referral/${user._id} `
            };
            Email.prepareAndSendEmail([emailOne], subject, template, templateVariables);
            AssignReferrerToTalentService.assignReferrerToTalentFromInvite(emailOne, `${user._id}`, emailNames[emailOne]);
        });
    }
}

module.exports = DashboardService;

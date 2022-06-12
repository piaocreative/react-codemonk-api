const User = require('../../models/user.model');
const TalentDashboardValidator = require('./talentDashboardValidator');
const Email = require('../../util/sendEmail');
const AssignReferrerToTalentService = require('../v2/assignReferrerToTalent/assignReferrerToTalentService');

/**
 * Class represents services for Talent dashboard
 */
class TalentDashboardService {
    /**
     * @desc This function is being used to invite talent friends
     * @author Innovify
     * @since 10/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async inviteFriends (req, user, local) {
        const Validator = new TalentDashboardValidator(req.body, local);
        await Validator.validationInviteEmails(req.body.emails);
        const uniqueObject = _.uniqBy(req.body.emails, 'email');
        const uniqueEmail = [];
        uniqueObject.map((d) => {
            uniqueEmail.push(d.email);
        });

        const existingUsers = await User.find({ email: { $in: uniqueEmail } }, { _id: 0, email: 1 }).lean();
        const dbEmails = existingUsers.map((d) => { return d.email; });
        const emails = _.difference(uniqueEmail, dbEmails);
        emails.map((e) => {
            const referername = `${user.firstName} ${user.lastName}`;
            const subject = `${user.firstName} ${user.lastName} nominated you to become a CodeMonk`;
            const template = 'emailTemplates/inviteFriends.html';
            const appUrl = (user.role === CONSTANTS.ROLE.TALENT) ? process.env.FRONTEND_URL_TALENT : process.env.FRONTEND_URL_CLIENT;
            const templateVariables = {
                appUrl: appUrl,
                referername: (referername) ? referername : 'User',
                referralurl: `${appUrl}/referral/${user._id} `
            };
            Email.prepareAndSendEmail([e], subject, template, templateVariables);
            AssignReferrerToTalentService.assignReferrerToTalentFromInvite(e, `${user._id}`);
        });
    }
}

module.exports = TalentDashboardService;

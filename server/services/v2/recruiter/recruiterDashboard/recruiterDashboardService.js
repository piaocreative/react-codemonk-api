const User = require('../../../../models/user.model');
const RecruiterDashboardValidator = require('./recruiterDashboardValidator');
const Email = require('../../../../util/sendEmail');
const AssignReferrerToRecruiterService = require('../../assignReferrerToTalent/assignReferrerToTalentService');

/**
 * Class represents services for Recruiter dashboard
 */
class RecruiterDashboardService {
    /**
     * @desc This function is being used to a recruiter invite multiple talents
     * @author Innovify
     * @since 02/22/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async inviteTalents(req, user, local) {
        const Validator = new RecruiterDashboardValidator(req.body, local);
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
            const appUrl = (user.role === CONSTANTS.ROLE.RECRUITER) ? process.env.FRONTEND_URL_TALENT : process.env.FRONTEND_URL_CLIENT;
            const templateVariables = {
                appUrl: appUrl,
                referername: (referername) ? referername : 'User',
                referralurl: `${appUrl}/referral/${user._id} `
            };
            Email.prepareAndSendEmail([emailOne], subject, template, templateVariables);
            AssignReferrerToRecruiterService.assignReferrerToTalentFromInvite(emailOne, `${user._id}`, emailNames[emailOne]);
        });
    }
}

module.exports = RecruiterDashboardService;

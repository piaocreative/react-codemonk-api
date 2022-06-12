const Crypt = require('../../util/crypt');
const User = require('../../models/user.model');
const Email = require('../../util/sendEmail');
const validation = require('../validation');
const Random = require('randomstring');
const CodeMonkError = require('../../util/CodeMonkError');

/**
 * Class represents services fo forgot/reset password .
 */
class ForgotPasswordService {

    /**
     * @desc This function is being used to generate reset link to reset password
     * @author Innovify
     * @since 27/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     */
    static async forgotPassword (req, local) {
        const Validator = new validation(local);
        await Validator.email(req.body.email);
        const userEmail = req.body.email.toLowerCase();
        const userObj = await User.findOne({ email: userEmail }).exec();
        if (userObj) {
            const resetLink = Random.generate(12);
            const appUrl = (userObj.role === 2)
                ? process.env.FRONTEND_URL_CLIENT : process.env.FRONTEND_URL_TALENT;
            const actionURL = `${appUrl}/reset-password/${resetLink}`;
            const date = MOMENT().add(1, 'day').utc();
            await User.updateOne({
                email: userEmail
            }, {
                $set: {
                    resetToken: resetLink,
                    resetExpiryTime: date
                }
            });

            const subject = 'Reset your password to access your CodeMonk account';
            const template = 'emailTemplates/forgotPasswordMail.html';
            const templateVariables = { appUrl, actionURL };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
        }
    }


    /**
     * @desc This function is being used to verify token for reset password
     * @author Innovify
     * @since 27/06/2020
     * @param {Object} req Request req.body RequestBody
     */
    static async verifyToken (req, local) {
        if (!req.body.token) {
            throw new CodeMonkError(local('LINK_IS_NOT_VALID'), 400);
        }

        const compareDate = MOMENT().utc().unix();
        const userList = await User.findOne({ resetToken: req.body.token }).exec();
        if (!userList || compareDate > MOMENT(userList.resetExpiryTime).utc().unix()) {
            throw new CodeMonkError(local('RESET_LINK_EXPIRED'), 400);
        }
    }


    /**
     * @desc This function is being used to reset password
     * @author Innovify
     * @since 27/06/2020
     * @param {Object} req Request req.body RequestBody
     */
    static async resetPassword (req, local) {

        const Validator = new validation(local);
        if (!req.body.token) {
            throw new CodeMonkError(Validator.__('LINK_IS_NOT_VALID'), 400);
        }
        await Validator.password(req.body.password);

        const userList = await User.findOne({
            resetToken: req.body.token,
            resetExpiryTime: { $exists: true, $ne: null }
        }).exec();
        const compareDate = MOMENT().utc().unix();
        if (userList && userList.resetExpiryTime) {
            if (compareDate > MOMENT(userList.resetExpiryTime).utc().unix()) {
                throw new CodeMonkError(Validator.__('RESET_LINK_EXPIRED'), 400);
            } else {

                const hash = await Crypt.enCryptPassword(req.body.password);
                if (hash) {
                    await User.updateOne({
                        resetToken: req.body.token
                    }, {
                        $set: {
                            password: hash,
                            resetExpiryTime: null,
                            resetToken: null
                        }
                    });
                }
            }
        }
    }
}

module.exports = ForgotPasswordService;

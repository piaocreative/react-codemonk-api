const crypt = require('../../util/crypt');
const proxyLoginValidator = require('./proxyLoginValidator');
const User = require('../../models/user.model');
const Talent = require('../../models/talent.model');
const Client = require('../../models/client.model');
const Agency = require('../../models/agency.model');
const Recruiter = require('../../models/recruiter.model');
const Ambassador = require('../../models/ambassador.model');

/**
 * Class represents services for signin.
 */
class ProxyLoginService {
    /**
     * @desc This function is being used to sign in user
     * @author Innovify
     * @since 09/12/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {string} req.body.userId email
     * @param {Object} res Response
     */
    static async proxyLogin (req, user, local) {
        const Validator = new proxyLoginValidator(req.body, local);
        await Validator.validate();
        return await ProxyLoginService.userLogin(req.body.userId,user, local);
    }

    /**
     * @desc This function is being used to end user login
     * @author Innovify
     * @since 09/12/2020
     * @param {Object} userId userId
     * @param {Object} res Response
     * @param {function} callback callback Handles Response data/error messages
     * @param {function} next exceptionHandler Calls exceptionHandler
     */
    static async userLogin (userId,adminUser, local) {
        let user = await User.findById(userId).lean();
        if (user.isActive === 1) {
            const token = await crypt.getUserProxyToken(user, adminUser._id);
            delete user.__v;
            if (user.role === CONSTANTS.ROLE.TALENT) {
                const talentObject = await Talent.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                token.talentToken = token.token;
                delete token.token;
                user = _.merge(user, token, talentObject);
            } else if (user.role === CONSTANTS.ROLE.CLIENT) {
                const clientObject = await Client.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                token.clientToken = token.token;
                delete token.token;
                user = _.merge(user, token, clientObject);
            } else if (user.role === CONSTANTS.ROLE.AGENCY) {
                const agencyObject = await Agency.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                token.agencyToken = token.token;
                delete token.token;
                user = _.merge(user, token, agencyObject);
            } else if (user.role === CONSTANTS.ROLE.RECRUITER) {
                const recruiterObject = await Recruiter.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                token.recruiterToken = token.token;
                delete token.token;
                user = _.merge(user, token, recruiterObject);
            } else if (user.role === CONSTANTS.ROLE.AMBASSADOR) {
                const ambassadorObject = await Ambassador.findOne({ userId: user._id }, { _id: 0, __v: 0, updatedAt: 0 }).lean();
                token.ambassadorToken = token.token;
                delete token.token;
                user = _.merge(user, token, ambassadorObject);
            }
            return user;
        } else if (user.isActive === 2) {
            throw new CodeMonkError(local('DEACTIVATE_ACCOUNT_BY_ADMIN'), 423);
        } else {
            throw new CodeMonkError(local('USER_INACTIVE'), 423);
        }
    }
}

module.exports = ProxyLoginService;

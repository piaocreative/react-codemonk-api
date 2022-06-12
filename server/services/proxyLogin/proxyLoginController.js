
const ProxyLoginService = require('./proxyLoginService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for proxy login.
 */
class ProxyLoginController {
    /**
     * @desc This function is being used to login
     * @author Innovify
     * @since 18/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.userId user id
     * @param {function} res Response
     */
    static async proxyLogin (req, res) {
        try {
            const data = await ProxyLoginService.proxyLogin(req,res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SIGNIN_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = ProxyLoginController;

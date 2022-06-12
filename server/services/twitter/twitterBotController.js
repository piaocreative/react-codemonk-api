const TwitterService = require('../twitter/twitterBotService');
const Utils = require('../../util/utilFunctions');

class TwitterBotController {

    /**
     * @desc: Generates and redirects to a Twitter OAuth link
     * @param {Object} req
     * @param {Object} res
     */
    static async auth (req, res) {
        try {
            const url = await TwitterService.generateAuthLink(req, res.locals.user, res.__);
            res.redirect(url);
        } catch (error) {
            Utils.sendResponse(error, null, res, '', '');
        }
    }

    /**
     * @desc: Processes callbacks from Twitter
     * @param {Object} req
     * @param {Object} res
     */
    static async callbackProcessor (req, res) {
        const { state, code } = req.query;
        try {
            const { codeVerifier, state: currentState } = await TwitterService.getCredentials();
            if (state === currentState) {
                await TwitterService.login(code, codeVerifier);
            }
            res.sendStatus(200);
        } catch (error) {
            Utils.sendResponse(error, null, res, '', '');
        }
    }

    /**
     * @desc: Tests authentication for Twitter client
     * @param {Object} req
     * @param {Object} res
     */
    static async testAuth (req, res) {
        try {
            const data = await TwitterService.verify();
            Utils.sendResponse(null, data, res, res.__('SUCCESS'), '');
        } catch (error) {
            Utils.sendResponse(error, null, res, '', '');
        }
    }
}

module.exports = TwitterBotController;

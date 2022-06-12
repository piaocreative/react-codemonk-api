const jwt = require('jsonwebtoken');
const Utils = require('../util/utilFunctions');
const User = require('../models/user.model');
const Talent = require('../models/talent.model');
const Client = require('../models/client.model');
const Agency = require('../models/agency.model');
const Notification = require('../models/notification.model');
const AgencyTalent = require('../models/agencyTalent.model');
const HTTPStatus = require('../util/http-status');
const VisitHistory = require('../models/visitHistory.model');
const TimesheetHistory = require('../models/timesheetHistory.model');
const Recruiter = require('../models/recruiter.model');
const Ambassador = require('../models/ambassador.model');
const { ROLE: { CLIENT, TALENT, ADMIN, AGENCY, RECRUITER, AMBASSADOR } } = require('../util/constants');

const isNewQuotes = function (user, res, next) {
    VisitHistory.findOne().then((history) => {
        res.newQuote = !user.quoteLastVisited ||
            (!!history && history.quotePublishedDate > user.quoteLastVisited);
        isNewNotification(user, res, next);
    }).catch(next);
};

const isNewTagForClient = async function (clientId, user, res, next) {
    const history = await TimesheetHistory.findOne({
        clientId
    }, {
        timesheetPublishedDate: true
    });
    res.newTimesheet = !user.timesheetLastVisited ||
        (!!history && history.timesheetPublishedDate > user.timesheetLastVisited);
    isNewNotification(user, res, next);
};

const isNewBrief = function (user, res, next) {
    VisitHistory.findOne().then((history) => {
        res.newBrief = !user.briefLastVisited ||
            (!!history && history.briefPublishedDate > user.briefLastVisited);
        isNewNotification(user, res, next);
    }).catch(next);
};

const isNewNotification = async function (user, res, next) {
    const lastVisited = await Notification.findOne({ userId: user._id }).sort({ _id: -1 });
    res.newNotification = !user.notificationLastVisited ||
        (!!lastVisited && lastVisited.notificationLastVisited > user.notificationLastVisited);
    next();
};

/**
 * @desc This function is being used to authenticate each private request
 * @author Innovify
 * @since 01/01/2020
 * @param {Object} req Request req.headers RequestBody req.headers.accessToken accessToken
 * @param {Object} res Response
 * @param {function} next exceptionHandler Calls exceptionHandler
 */

const checkUser = (me, res, next) => {
    User.findOne({ _id: me.id }, {
        password: 0,
        __v: 0,
        otp: 0,
        phoneOtp: 0,
        resetToken: 0,
        resetExpiryTime: 0,
        requestedCountryCode: 0,
        requestedPhoneNumber: 0,
        requestedEmail: 0
    }).lean().then((userObj) => {
        const responseObject = Utils.errorResponse();
        if (!userObj) {
            responseObject.message = res.__('ACCESS_DENIED');
            res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
            return;
            // 0 = deactivate, 1 = activate
        } else if (userObj.isActive === 0 || userObj.isActive === 2) {
            responseObject.status = 0;
            responseObject.message = res.__('DEACTIVATE_ACCOUNT_BY_ADMIN');
            res.status(HTTPStatus.ACCOUNT_SUSPENDED).send(responseObject);
            return;
        }

        let administratorUser = {};
        if (me.adminId) {
            administratorUser = { adminId: me.adminId, proxyUser: true };
        }

        if (userObj.role === TALENT) {
            Talent.findOne({ userId: me.id }, { __v: 0, updatedAt: 0 }).lean().then((talentObject) => {
                userObj.fromTalent = { _id: talentObject._id };
                res.locals.user = _.merge(talentObject, userObj, administratorUser);
                isNewBrief(userObj, res, next);

            }).catch(next);
        } else if (userObj.role === CLIENT) {
            Client.findOne({ userId: me.id }, { _id: 0, __v: 0, updatedAt: 0 }).lean().then((clientObject) => {
                res.locals.user = _.merge(userObj, clientObject, administratorUser);
                isNewTagForClient(me.id, userObj, res, next);
            }).catch(next);
        } else if (userObj.role === AGENCY) {
            Agency.findOne({ userId: me.id }, { _id: 0, __v: 0, updatedAt: 0 }).lean().then((agencyObject) => {
                res.locals.user = _.merge(userObj, agencyObject, administratorUser);
                AgencyTalent.findOne({ agencyId: me.id }, { _id: 0, talents: 1 }).lean().then((agencyTalent) => {
                    res.locals.user = _.merge(userObj, agencyTalent, administratorUser);
                    isNewQuotes(userObj, res, next);
                }).catch(next);
            }).catch(next);
        } else if (userObj.role === ADMIN) {
            res.locals.user = _.merge(userObj, administratorUser);
            next();
        } else if (userObj.role === RECRUITER) {
            Recruiter.findOne({ userId: me.id }, { _id: 0, __v: 0, updatedAt: 0 }).lean().then((recruiterObject) => {
                res.locals.user = _.merge(userObj, recruiterObject, administratorUser);
                next();
            }).catch(next);
        } else if (userObj.role === AMBASSADOR) {
            Ambassador.findOne({ userId: me.id }, { _id: 0, __v: 0, updatedAt: 0 }).lean().then((ambassadorObject) => {
                res.locals.user = _.merge(userObj, ambassadorObject, administratorUser);
                next();
            }).catch(next);
        }
    }).catch(next);
};

module.exports = function (req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_SECRET, (err, tokenDetail) => {
        if (err) {
            const responseObject = Utils.errorResponse();
            responseObject.message = res.__('ACCESS_DENIED');
            res.status(HTTPStatus.UNAUTHORIZED).send(responseObject);
        } else {
            checkUser(tokenDetail, res, next);
            return;
        }
    });
};

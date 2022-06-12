const Utils = require('../util/utilFunctions');
const HTTPStatus = require('../util/http-status');
const { ROLE: { TALENT }, TALENT_REGISTER_TYPE: { FREELANCER, AGENCY } } = require('../util/constants');

module.exports = function (req, res, next) {
    if ((res.locals.user.role === TALENT && res.locals.user.registerType === FREELANCER
        && res.locals.user.signupStep < CONSTANTS.TALENT.ACTIVE_STATUS) ||
        (res.locals.user.role === TALENT && res.locals.user.registerType === AGENCY
            && res.locals.user.signupStep < CONSTANTS.AGENCY.TALENT.ACTIVE_STATUS)) {
        const responseObject = Utils.errorResponse();
        responseObject.message = res.__('ACCESS_DENIED');
        res.status(HTTPStatus.INACTIVE_USER).send(responseObject);
        return;
    } else {
        next();
    }

};


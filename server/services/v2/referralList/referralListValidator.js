const validation = require('../../validation');
const { numberFilter } = require('../../../util/utilFunctions');

/**
 * Class represents validations for referral list with multiple filters.
 */
class ReferralListValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate check status for filter
     * @author CodeMonk
     * @since 07/02/2022
     * @param {string} status status from selection
     */
    checkTalentStatus (status) {
        return numberFilter(CONSTANTS.REFERRAL.REFEREE.STATUS, status);
    }

}

module.exports = ReferralListValidator;

const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');
const AgencyPayDetailsValidator = require('./agencyPayDetailsValidator');

/**
 * Class represents services for agency profile save
 */
class AgencyPayDetailsService {

    /**
     * @desc This function is being used to agency pay details update
     * @author Innovify
     * @since 31/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async updatePayDetails (req, user, local) {
        const Validator = new AgencyPayDetailsValidator(req.body, local);
        await Validator.validatePayDetails();
        let message = local('SUCCESS');
        let updateData = {
            $set: {
                payDetails: {
                    bankName: req.body.bankName,
                    accNumber: req.body.bankAccountNumber,
                    bankCode: req.body.bankCode
                },
                signupStep: CONSTANTS.AGENCY.REGITRATION_STATUS.PAY_DETAIL
            }
        };

        if (user.signupStep >= CONSTANTS.AGENCY.REGITRATION_STATUS.INVITE_TALENT_DETAIL) {
            message = local('PAYOUT_SUCCESS');
            updateData = {
                $set: {
                    payDetails: {
                        bankName: req.body.bankName,
                        accNumber: req.body.bankAccountNumber,
                        bankCode: req.body.bankCode
                    }
                }
            };
        }

        await Agency.updateOne({ userId: mongoose.Types.ObjectId(user._id) }, updateData);

        return { message };
    }
}

module.exports = AgencyPayDetailsService;

const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');
const AgencyCertificateDetailsValidator = require('./agencyCertificateDetailsValidator');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for agency update certificate and credetials
 */
class AgencyCertificateDetailsService {

    /**
     * @desc This function is being used to agency update certificate and credetials
     * @author Innovify
     * @since 02/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async updateCertificate (req, user, local) {
        const Validator = new AgencyCertificateDetailsValidator(req.body, local);
        await Validator.validateCertificateDetails();
        Validator.validateCredentialsUrl();

        await Agency.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: {
                certificateDetails: this.prepareCertificateData(req.body.certificateDetails),
                'socialProfile.linkedInUrl': (req.body.linkedInUrl) ? req.body.linkedInUrl : '',
                'socialProfile.gitHubUrl': (req.body.gitHubUrl) ? req.body.gitHubUrl : '',
                'socialProfile.dribbbleUrl': (req.body.dribbbleUrl) ? req.body.dribbbleUrl : '',
                'socialProfile.clutchUrl': (req.body.clutchUrl) ? req.body.clutchUrl : '',
                'socialProfile.goodfirmsUrl': (req.body.goodfirmsUrl) ? req.body.goodfirmsUrl : '',
                'socialProfile.otherWebsiteUrl': (req.body.otherWebsiteUrl) ? req.body.otherWebsiteUrl : '',
                signupStep: CONSTANTS.AGENCY.REGITRATION_STATUS.CERTIFICATE_DETAIL
            }
        });
    }

    /**
     * @desc This function is being to prepare string date
     *  to date object for agency update certificate and credetials
     * @author Innovify
     * @since 02/09/2020
     * @param {Object} data data
     */
    static prepareCertificateData (certificateDetails) {
        const data = [];
        if (certificateDetails && certificateDetails.length) {
            certificateDetails.map((d) => {
                data.push({
                    name: d.name,
                    dateObtained: Utils.getDateFromDDMMYYY(d.dateObtained),
                    issuedBy: d.issuedBy
                });
            });
        }
        return data;
    }
}

module.exports = AgencyCertificateDetailsService;

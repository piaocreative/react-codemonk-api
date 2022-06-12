const mongoose = require('mongoose');
const Agency = require('../../models/agency.model');
const AgencyCertificateEditValidator = require('./agencyCertificateEditValidator');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for agency edit certificates
 */
class AgencyCertificateEditService {

    /**
     * @desc This function is being used to agency edit certificates
     * @author Innovify
     * @since 06/10/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editCertificates (req, user, local) {
        const Validator = new AgencyCertificateEditValidator(req.body, local);
        await Validator.validateCertificateDetails();

        if (req.body.certificates && req.body.certificates.length) {
            await Agency.updateOne({
                userId: mongoose.Types.ObjectId(user._id)
            }, {
                $set: {
                    certificateDetails: this.prepareCertificateData(req.body.certificates)
                }
            });
        }
    }

    /**
     * @desc This function is being to prepare string date
     *  to date object for agency update certificate and credetials
     * @author Innovify
     * @since 02/09/2020
     * @param {Object} data data
     */
    static prepareCertificateData (certificateDetails) {
        return certificateDetails.map((d) => {
            return {
                name: d.name,
                dateObtained: Utils.getDateFromDDMMYYY(d.dateObtained),
                issuedBy: d.issuedBy
            };
        });
    }
}

module.exports = AgencyCertificateEditService;

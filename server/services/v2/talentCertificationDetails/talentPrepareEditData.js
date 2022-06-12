const mongoose = require('mongoose');
const Utils = require('../../../util/utilFunctions');
const TalentEducationDetailsValidator = require('../talentEducationDetail/talentEducationDetailsValidator');

/**
 * Class represents services for Talent prepare update object for Edit talent details.
 */
class TalentPrepareEditData {
    
    /**
     * @desc This function is being used to validate and prepare certificate details to update
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareCertificateAdd(data, local,certification) {

        const certificateValidator = new TalentEducationDetailsValidator(data, local);
        await certificateValidator.certificateName(data.name);
        certificateValidator.checkDate(data.dateObtained, 'Date obtained');
        await certificateValidator.certificateIssuedBy(data.issuedBy);
        await certificateValidator.certificateId(data.certificateId);
        data.dateObtained = Utils.getDateFromDDMMYYY(data.dateObtained);

        return {
            $push: {
                certificateDetails: {
                    $each: [{
                        name: data.name,
                        dateObtained: data.dateObtained,
                        issuedBy: data.issuedBy,
                        certificateId: data.certificateId,
                        logo:certification.logo
                    }],
                    $position: 0
                }
            }
        };
    }

    /**
     * @desc This function is being used to modify certificate details based on the input operation
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} data certificate Id
     * @return {Object}
     */
    static async prepareCertificateDelete(data, local) {
        const certificateValidator = new TalentEducationDetailsValidator(data, local);
        await certificateValidator.checkId(data._id);
        return {
            $pull: {
                certificateDetails: {
                    _id: mongoose.Types.ObjectId(data._id)
                }
            }
        };
    }

    /**
     * @desc This function is being used to edit a certificate from talent object certificate array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} data certificate Id
     * @return {Object}
     */
    static async prepareCertificateEdit(data, local, certification) {
        const certificateValidator = new TalentEducationDetailsValidator(data, local);
        await certificateValidator.certificateName(data.name);
        certificateValidator.checkDate(data.dateObtained, 'Date obtained');
        await certificateValidator.certificateIssuedBy(data.issuedBy);
        await certificateValidator.certificateId(data.certificateId);
        data.dateObtained = Utils.getDateFromDDMMYYY(data.dateObtained);
        await certificateValidator.checkId(data._id);
        return {
            $set: {
                'certificateDetails.$.name': data.name,
                'certificateDetails.$.dateObtained': data.dateObtained,
                'certificateDetails.$.issuedBy': data.issuedBy,
                'certificateDetails.$.certificateId': data.certificateId,
                'certificateDetails.$.logo':certification.logo
            }
        };
    }

    /**
     * @desc This function is being used to validate talent id for agency edit their details
     * @author Innovify
     * @since 24/11/2020
     * @param {Object} talentId talentId of that user that agency want to update them
     */
    static async checkTalentId(talentId, local) {
        const Validator = new TalentEducationDetailsValidator(null, local);
        await Validator.checkId(talentId);
    }
}

module.exports = TalentPrepareEditData;

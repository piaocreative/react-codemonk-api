const mongoose = require('mongoose');
const Talent = require('../../models/talent.model');
const TalentEducationDetailsValidator = require('./talentEducationDetailsValidator');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for Sign-up.
 */
class TalentEducationDetailsService {
    /**
     * @desc This function is being used to store talent education details
     * @author Innovify
     * @since 15/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async saveTalentEducationDetails (req, user, local) {
        const Validator = new TalentEducationDetailsValidator(req.body, local);
        await Validator.validationEducationDetails();
        const updateData = await TalentEducationDetailsService.prepareCertificateUpdateData(req.body);
        return await Talent.updateOne({
            userId: mongoose.Types.ObjectId(user._id)
        }, {
            $set: updateData
        });
    }

    /**
     * @desc This function is being to prepare string date
     *  to date object for talent certificate details
     * @author Innovify
     * @since 15/06/2020
     * @param {Object} data data
     */
    static prepareCertificateUpdateData (data) {
        if (data.certificateDetails
            && Array.isArray(data.certificateDetails)
            && data.certificateDetails.length) {
            data.certificateDetails.map((d) => {
                d.dateObtained = Utils.getDateFromDDMMYYY(d.dateObtained);
            });
        }

        data.signupStep = CONSTANTS.TALENT.REGITRATION_STATUS.EDUCATION_DETAIL;

        return data;
    }
}

module.exports = TalentEducationDetailsService;

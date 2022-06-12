const mongoose = require('mongoose');
const TalentEducationDetailsValidator = require('../talentEducationDetail/talentEducationDetailsValidator');

/**
 * Class represents services for Talent prepare update object for Edit talent details.
 */
class TalentPrepareEditData {

    /**
     * @desc This function is being used to validate and prepare talent education details to update
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareEducationAdd(data, local, company) {
        const educationValidator = new TalentEducationDetailsValidator(data, local);
        await educationValidator.checkEducationEach([data]);
        return {
            $push: {
                educationDetails: {
                    $each: [{
                        degreeLevel: data.degreeLevel,
                        degreeTitle: data.degreeTitle,
                        collegeName: data.collegeName,
                        country: data.country,
                        startYear: data.startYear,
                        endYear: data.endYear,
                        logo: company.logo
                    }],
                    $position: 0
                }
            }
        };
    }

    /**
     * @desc This function is being used to modify education details based on the input operation
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} data education Id
     * @return {Object}
     */
    static async prepareEducationDelete(data, local) {
        const educationValidator = new TalentEducationDetailsValidator(data, local);
        await educationValidator.checkId(data._id);
        return {
            $pull: {
                educationDetails: {
                    _id: mongoose.Types.ObjectId(data._id)
                }
            }
        };
    }

    /**
     * @desc This function is being used to edit a education from talent object education array
     * @author CodeMonk
     * @since 18/10/2021
     * @param {Object} data education Id
     * @return {Object}
     */
    static async prepareEducationEdit(data, local,company) {
        const educationValidator = new TalentEducationDetailsValidator(null, local);
        await educationValidator.checkEducationEach([data]);
        return {
            $set: {
                'educationDetails.$.degreeLevel': data.degreeLevel,
                'educationDetails.$.degreeTitle': data.degreeTitle,
                'educationDetails.$.collegeName': data.collegeName,
                'educationDetails.$.country': data.country,
                'educationDetails.$.startYear': data.startYear,
                'educationDetails.$.endYear': data.endYear,
                'educationDetails.$.logo':company.logo
            }
        };
    }

    /**
      * @desc This function is being used to validate talent id for agency edit their details
      * @author CodeMonk
      * @since 18/10/2021
      * @param {Object} talentId talentId of that user that agency want to update them
      */
    static async checkTalentId(talentId, local) {
        const Validator = new TalentEducationDetailsValidator(null, local);
        await Validator.checkId(talentId);
    }
}

module.exports = TalentPrepareEditData;

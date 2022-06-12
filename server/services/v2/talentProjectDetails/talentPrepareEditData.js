const mongoose = require('mongoose');
const TalentProjectDetailsValidator = require('../talentProjectDetail/talentProjectDetailsValidator');

/**
 * Class represents services for Talent prepare update object for talent project details.
 */
class TalentPrepareEditData {

    /**
     * @desc This function is being used to validate and prepare talent project details to update
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareProjectAdd(data, local, images) {
        const projectValidator = new TalentProjectDetailsValidator(data, local);
        await projectValidator.checkProjectName(data.name);
        await projectValidator.checkProjectURL(data.url);
        await projectValidator.checkProjectDescription(data.description);
        await projectValidator.checkProjectRole(data.role);
        await projectValidator.checkProjectEmployer(data.employer);
        await projectValidator.checkProjectIndustry(data.industry);
        await projectValidator.checkEmploymentType(data.employmentType);

        //await projectValidator.checkProjectKeyAchievements(data.keyAchievements);
        let arr = [];
        if (data.skills) {
            arr = JSON.parse(data.skills);
        }
        await projectValidator.skills(arr);
        let arr2 = [];
        if (data.images) {
            arr2 = JSON.parse(data.images);
            if (arr2) {
                for (let i of arr2) {
                    i.logo = images[i.name]
                }
            }
        }
        return {
            $push: {
                projectDetails: {
                    $each: [{
                        name: data.name,
                        url: (data.url) ? data.url : '',
                        description: data.description,
                        role: data.role,
                        skills: arr,
                        employer: data.employer,
                        industry: data.industry,
                        images: arr2,
                        employmentType: data.employmentType
                    }],
                    $position: 0
                }
            }
        };
    }

    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} data Project Id
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareProjectDelete(data, local) {
        const projectValidator = new TalentProjectDetailsValidator(null, local);
        await projectValidator.checkId(data._id);
        return {
            $pull: {
                projectDetails: {
                    _id: mongoose.Types.ObjectId(data._id)
                }
            }
        };
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author CodeMonk
     * @since 23/06/2020
     * @param {Object} data Project Id
     * @param {Object} data data
     * @return {Object}
     */
    static async prepareProjectEdit(data, local, images) {
        const projectValidator = new TalentProjectDetailsValidator(null, local);
        await projectValidator.checkProjectName(data.name);
        await projectValidator.checkProjectURL(data.url);
        await projectValidator.checkProjectDescription(data.description);
        await projectValidator.checkProjectRole(data.role);
        await projectValidator.checkProjectEmployer(data.employer);
        await projectValidator.checkProjectIndustry(data.industry);
        await projectValidator.checkEmploymentType(data.employmentType);
        //await projectValidator.checkProjectKeyAchievements(data.keyAchievements);
        await projectValidator.checkId(data._id);
        let arr = [];
        if (data.skills) {
            arr = JSON.parse(data.skills);
        }
        await projectValidator.skills(arr);
        let arr2 = [];
        if (data.images) {
            arr2 = JSON.parse(data.images);
            if (arr2) {
                for (let i of arr2) {
                    if (images[i.name]) {
                        i.logo = images[i.name]
                    }
                }
            }
        }
        return {
            $set: {
                'projectDetails.$.name': data.name,
                'projectDetails.$.url': (data.url) ? data.url : '',
                'projectDetails.$.description': data.description,
                'projectDetails.$.role': data.role,
                'projectDetails.$.skills': arr,
                'projectDetails.$.employer': data.employer,
                'projectDetails.$.industry': data.industry,
                'projectDetails.$.images': arr2,
                'projectDetails.$.employmentType': data.employmentType

            }
        };
    }

    /**
     * @desc This function is being used to validate talent id for agency edit their details
     * @author CodeMonk
     * @since 24/11/2020
     * @param {Object} talentId talentId of that user that agency want to update them
     */
    static async checkTalentId(talentId, local) {
        const Validator = new TalentProjectDetailsValidator(null, local);
        await Validator.checkId(talentId);
    }
}

module.exports = TalentPrepareEditData;

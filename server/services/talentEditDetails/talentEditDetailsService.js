const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Talent = require('../../models/talent.model');
const AgencyTalent = require('../../models/agencyTalent.model');
const TalentPrepareEditData = require('./talentPrepareEditData');
const commonService = require('../commonServices/commonService');
const skillsService = require('../skills/skillServices');
const { addSkill } = require('../skills/skillServices');
const UserProfileService = require('../userProfile/userProfileService');
const Email = require('../../util/sendEmail');


/**
 * Class represents services for Talent Edit Details.
 */
class TalentEditDetailsService {
    /**
     * @desc This function is being used to edit user details that supplied in input
     * @author Innovify
     * @since 19/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user user details from middleware
     */
    static async editTalentProfileDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareEditProfileData(req.body, local);
        const userId = user._id;
        const userWhere = {
            _id: userId
        };
        const talentWhere = await TalentEditDetailsService.getTalentwhere(userId, user.role, req.body.talentId, local);

        if (user.role === CONSTANTS.ROLE.AGENCY) {
            userWhere._id = mongoose.Types.ObjectId(req.body.talentId);
        }

        const userData = await User.findOneAndUpdate(userWhere, updateData.user, { new: true });
        delete userData.__v;
        delete userData._id;

        const talentData = await TalentEditDetailsService.updateTalentData(talentWhere, updateData.talent);
        delete talentData.__v;
        delete talentData._id;
        return _.merge(userData, talentData);
    }

    /**
     * @desc This function is being used to edit talent professional summary brief
     * @author Innovify
     * @since 01/07/2020
     * @param {Object} req Request req.body
     * @param {Object} user user details from middleware
     */
    static async editTalentSummary(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareEditSummaryData(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit talent rate and currency
     * @author Innovify
     * @since 01/07/2020
     * @param {Object} req Request req.body
     * @param {Object} user user details from middleware
     */
    static async editTalentRate(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareEditRate(req.body,  user,local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        const updateDetails = await TalentEditDetailsService.updateTalentData(talentWhere, updateData);

        if (user.signupStep === CONSTANTS.TALENT.REGITRATION_STATUS.PREFERENCE_DETAIL && user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER) {
            commonService.checkAndCompleteFreelancerProfile(updateDetails);
        }

        return updateDetails;
    }

    /**
     * @desc This function is being used to edit skills details that supplied in input
     * @author Innovify
     * @since 19/06/2020
     * @param {Object} req Request req.body
     * @param {function} user user details from middlewhere
     */
    static async editTalentSkillsDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareEditSkillsData(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        addSkill(req.body.skills.map(s => s.name));
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit url details that supplied in input
     * @author Innovify
     * @since 19/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user user details from middleware
     */
    static async editTalentProfessionalUrlDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareEditUrlData(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to add talent project at beginning of project array
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async addTalentProjectDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareProjectAdd(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        const addedProject = await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
        await TalentEditDetailsService.updateTalentSkills(talentWhere);
        return addedProject;
    }

    static async updateTalentSkills(talentWhere) {
        let skills = [];
        const updatedTalent = await Talent.findOne(talentWhere, { projectDetails: 1 });
        updatedTalent.projectDetails.forEach(function (p) {
            skills.forEach(function (s) {
                let foundSkill = p.skills.filter(ps => ps.name === s.name);
                foundSkill.forEach(function (fs) {
                    s.rate = (s.rate  + fs.rate) / 2.0
                });
            });
            skills = skills.concat(p.skills.filter(ps => skills.length == 0 || !skills.some(s => s.name === ps.name)));
        });
        skills.sort((a, b) => {
            return b.rate - a.rate;
        });
        skills.forEach(function (s) {
            s.rate = Math.round(s.rate)
        });
        await Talent.updateOne(talentWhere, {
            $set: {
                skills: skills
            }
        });
        addSkill(skills.map(s => s.name));
    }

    /**
     * @desc This function is being used to delete talent project from talent object project array
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async deleteTalentProjectDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareProjectDelete(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async editTalentProjectDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareProjectEdit(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        talentWhere['projectDetails._id'] = mongoose.Types.ObjectId(req.body._id);
        const editedProject = await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
        const where = { userId: talentWhere.userId }
        await TalentEditDetailsService.updateTalentSkills(where);
        return editedProject;
    }

    /**
     * @desc This function is being used to edit Preference details that supplied in input
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request
     * @param {Object} user user details from middleware
     */
    static async editTalentPreferenceDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.preparePreferenceEdit(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit availability details that supplied in input
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request
     * @param {Object} user user details from middleware
     */
    static async editTalentAvailabilityDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareAvailabilityEdit(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to add talent education at beginning of education array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async addTalentEducationDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareEducationAdd(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to delete talent education from object education array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async deleteTalentEducationDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareEducationDelete(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit a education from talent object education array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async editTalentEducationDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareEducationEdit(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        talentWhere['educationDetails._id'] = mongoose.Types.ObjectId(req.body._id);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to add talent work experience
     *  beginning of workExperience array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async addTalentWorkExperience(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareWorkExperienceAdd(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to delete talent work experience
     *  based on id of workExperience array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async deleteTalentWorkExperience(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareWorkExperienceDelete(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async editTalentWorkExperience(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareWorkExperienceEdit(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        talentWhere['workExperience._id'] = mongoose.Types.ObjectId(req.body._id);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to add talent certificate
     *  at beginning of certificate array
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async addTalentCertificateDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareCertificateAdd(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to delete talent certificate
     *  from object certificate array
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async deleteTalentCertificateDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareCertificateDelete(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit a certificate
     *  from talent object certificate array
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async editTalentCertificateDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareCertificateEdit(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        talentWhere['certificateDetails._id'] = mongoose.Types.ObjectId(req.body._id);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }


    /**
     * @desc This function is being used to edit billing details that supplied in input
     * @author Innovify
     * @since 25/06/2020
     * @param {Object} req Request
     * @param {Object} user user details from middleware
     */
    static async editTalentBillingDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareBillingEdit(req.files, req.body, user, local);
        const updateDetails = await TalentEditDetailsService.updateTalentData({
            userId: mongoose.Types.ObjectId(user._id)
        }, updateData);

        if (user.signupStep === CONSTANTS.TALENT.REGITRATION_STATUS.PREFERENCE_DETAIL && user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER) {
            commonService.checkAndCompleteFreelancerProfile(updateDetails);
        }

        return updateDetails;
    }

    /**
     * @desc This function is being used to edit payment details that supplied in input
     * @author Innovify
     * @since 25/06/2020
     * @param {Object} req Request
     * @param {Object} user user details from middleware
     */
    static async editTalentPaymentDetails(req, user, local) {
        const updateData = await TalentPrepareEditData.preparePaymentEdit(req.body, local);
        await UserProfileService.checkOldPassword(req.body, user, local);
        const updateDetails = await TalentEditDetailsService.updateTalentData({
            userId: mongoose.Types.ObjectId(user._id)
        }, updateData);

        if (user.signupStep === CONSTANTS.TALENT.REGITRATION_STATUS.PREFERENCE_DETAIL && user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.FREELANCER) {
            commonService.checkAndCompleteFreelancerProfile(updateDetails);
        }
        await this.sendPaymentChangeEmail(user);
        return updateDetails;
    }

    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author Innovify
     * @since 22/06/2020
     * @param {String} id Talent user id
     * @param {Object} updateData Prepared data for update
     * @return {Object} userDetails Updated talent object
     */
    static async updateTalentData(where, updateData) {
        return await Talent.findOneAndUpdate(where, updateData, { new: true });
    }

    /**
     * @desc This function is being used to edit languages that supplied in input
     * @author Innovify
     * @since 20/07/2020
     * @param {Object} req Request req.body
     * @param {function} user user details from middlewhere
     */
    static async editTalentLanguages(req, user, local) {
        const updateData = await TalentPrepareEditData.prepareTalentLanguages(req.body, local);
        const talentWhere = await TalentEditDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentEditDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to get update talent where condition
     * @author Innovify
     * @since 24/11/2020
     * @param {ObjectId} userId user id of agency
     * @param {Number} role user role
     * @param {String} talentId talent id on behalf of update performs
     * @return {Object} updateData updateData
     */
    static async getTalentwhere(userId, role, talentId, local) {
        const talentWhere = {
            userId
        };

        if (role === CONSTANTS.ROLE.AGENCY) {
            await TalentEditDetailsService.checkAgencyCanUpdateOnBehalfOfTalent(talentId, userId, local);
            talentWhere.userId = mongoose.Types.ObjectId(talentId);
        }

        return talentWhere;
    }

    /**
     * @desc This function is being used to check talent id belongs to agency
     * @author Innovify
     * @since 24/11/2020
     * @param {ObjectId} userId user id of agency
     * @param {String} talentId talent id on behalf of update performs
     * @return {Object} updateData updateData
     */
    static async checkAgencyCanUpdateOnBehalfOfTalent(talentId, userId, local) {
        await TalentPrepareEditData.checkTalentId(talentId, local);

        const userDetails = await User.findOne({
            _id: mongoose.Types.ObjectId(talentId)
        }, { email: 1 });

        if (!userDetails) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'User'), 400);
        }

        const talentUserDetails = await AgencyTalent.findOne({
            agencyId: userId,
            'talents.email': userDetails.email
        });

        if (!talentUserDetails) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'Talent Details'), 400);
        }
    }

    static async sendPaymentChangeEmail (user) {

        const subject = 'Your payout details have been changed';

        const template = 'emailTemplates/paymentDetailsChange.html';

        const appUrl = process.env.FRONTEND_URL_TALENT;

        const templateVariables = {
            appUrl,
            firstName: user.firstName
        };

        await Email.prepareAndSendEmail([user.email], subject, template, templateVariables);
    }
}

module.exports = TalentEditDetailsService;

const mongoose = require('mongoose');
const User = require('../../../models/user.model');
const Talent = require('../../../models/talent.model');
const AgencyTalent = require('../../../models/agencyTalent.model');
const TalentPrepareEditData = require('./talentPrepareEditData');
const { addSkill } = require('../../skills/skillServices');
const TalentProjectImageValidator = require('./talentProjectImageValidator');
const UploadService = require('../../../util/uploadService');
const utils = require('../../../util/utilFunctions');

/**
 * Class represents services for Talent Project Details.
 */
class TalentProjectDetailsService {

    /**
     * @desc This function is being used to add talent project at beginning of project array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async addTalentProjectDetails (req, user, local) {
        const images = await TalentProjectDetailsService.uploadProjectImages(req, user, local);
        const updateData = await TalentPrepareEditData.prepareProjectAdd(req.body, local, images);
        const talentWhere = await TalentProjectDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        const signupStep = utils.getSignupStep(user, CONSTANTS.TALENT.V2.REGITRATION_STATUS.PROJECT_DETAIL);
        if (signupStep) {
            await Talent.updateOne(talentWhere, { signupStep });
        }

        const addedProject = await TalentProjectDetailsService.updateTalentData(talentWhere, updateData);
        await TalentProjectDetailsService.updateTalentSkills(talentWhere);

        const oldUserStep = user.signupStep;
        await utils.profileEditLog(addedProject, oldUserStep);
        await utils.profileCompleteLog(addedProject, oldUserStep);

        return addedProject;
    }

    static async updateTalentSkills (talentWhere) {
        let skills = [];
        const updatedTalent = await Talent.findOne(talentWhere, { projectDetails: 1 });
        updatedTalent.projectDetails.forEach((p) => {
            skills.forEach((s) => {
                const foundSkill = p.skills.filter(ps => ps.name === s.name);
                foundSkill.forEach((fs) => {
                    s.rate = (s.rate + fs.rate) / 2.0;
                });
            });
            skills = skills.concat(p.skills.filter(ps => skills.length == 0 || !skills.some(s => s.name === ps.name)));
        });
        skills.sort((a, b) => {
            return b.rate - a.rate;
        });
        skills.forEach((s) => {
            s.rate = Math.round(s.rate);
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
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async deleteTalentProjectDetails (req, user, local) {
        const updateData = await TalentPrepareEditData.prepareProjectDelete(req.body, local);
        const talentWhere = await TalentProjectDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        return await TalentProjectDetailsService.updateTalentData(talentWhere, updateData);
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author CodeMonk
     * @since 20/10/2021
     * @param {Object} req Request req.body
     * @param {Object} user User Object who logged in
     */
    static async editTalentProjectDetails (req, user, local) {
        const images = await TalentProjectDetailsService.uploadProjectImages(req, user, local);
        const updateData = await TalentPrepareEditData.prepareProjectEdit(req.body, local, images);
        const talentWhere = await TalentProjectDetailsService.getTalentwhere(user._id, user.role, req.body.talentId, local);
        talentWhere['projectDetails._id'] = mongoose.Types.ObjectId(req.body._id);
        const editedProject = await TalentProjectDetailsService.updateTalentData(talentWhere, updateData);
        const where = { userId: talentWhere.userId };
        await TalentProjectDetailsService.updateTalentSkills(where);
        return editedProject;
    }


    /**
     * @desc This function is being used to modify talent details based on the input operation
     * @author CodeMonk
     * @since 20/10/2021
     * @param {String} id Talent user id
     * @param {Object} updateData Prepared data for update
     * @return {Object} userDetails Updated talent object
     */
    static async updateTalentData (where, updateData) {
        return await Talent.findOneAndUpdate(where, updateData, { new: true });
    }

    /**
     * @desc This function is being used to get update talent where condition
     * @author CodeMonk
     * @since 20/10/2021
     * @param {ObjectId} userId user id of agency
     * @param {Number} role user role
     * @param {String} talentId talent id on behalf of update performs
     * @return {Object} updateData updateData
     */
    static async getTalentwhere (userId, role, talentId, local) {
        const talentWhere = {
            userId
        };

        if (role === CONSTANTS.ROLE.AGENCY) {
            await TalentProjectDetailsService.checkAgencyCanUpdateOnBehalfOfTalent(talentId, userId, local);
            talentWhere.userId = mongoose.Types.ObjectId(talentId);
        }

        return talentWhere;
    }

    /**
     * @desc This function is being used to check talent id belongs to agency
     * @author CodeMonk
     * @since 20/10/2021
     * @param {ObjectId} userId user id of agency
     * @param {String} talentId talent id on behalf of update performs
     * @return {Object} updateData updateData
     */
    static async checkAgencyCanUpdateOnBehalfOfTalent (talentId, userId, local) {
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

    static async uploadProjectImages (req, user, local) {
        const images = {};
        if (req.files && req.files.projectImages) {

            let count = 1;
            for (const pi of req.files.projectImages) {
                const fileName = `${process.env.NODE_ENV}/projectImages/${user._id}/${req.body.name}/image_${count}`;
                const Validator = new TalentProjectImageValidator(pi, local);
                await Validator.validateLogo();
                await UploadService.uploadFile(pi, fileName);
                const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
                images[pi.originalname] = filePath;
                count++;
            }

        }

        return images;
    }
}

module.exports = TalentProjectDetailsService;

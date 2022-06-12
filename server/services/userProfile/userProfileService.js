const request = require('async-request');
const mongoose = require('mongoose');
const User = require('../../models/user.model');
const Project = require('../../models/project.model');

const UserBasicProfileValidator = require('./userProfileValidator');
const UploadService = require('../../util/uploadService');
const crypt = require('../../util/crypt');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for user Basic Profile.
 */
class UserProfileService {

    /**
     * @desc This function is being used to get user details
     * @author Innovify
     * @since 08/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     * @param {function} next exceptionHandler
     */
    static async getUserDetails (user) {
        user.signupStep = (user.role === CONSTANTS.ROLE.TALENT
            && !user.profilePicture
            && user.registerType) ? 0.1 : user.signupStep;

        user.profileURL = `${process.env.BASE_URL}/c/${user.code}`;
        if (user.role === CONSTANTS.ROLE.TALENT) {
            const projects = await Project.find({ 'talents.talentId': user._id }).select('talents.$ status');
            const activeProjectStatus = [CONSTANTS.PROJECT.STATUS.Discovery,
                CONSTANTS.PROJECT.STATUS['Kick-off'],
                CONSTANTS.PROJECT.STATUS['In Progress']];
            const statues = [];
            for (const p of projects) {
                const statusState = activeProjectStatus.includes(p.status);
                let durationState = false;
                for (const t of p.talents) {
                    if (user._id.toString() === t.talentId.toString()) {
                        durationState = await Utils.isBetween(t.startDate, t.endDate);
                    }
                }
                statues.push(statusState && durationState);
            }
            user.hasActiveProject = statues.length > 0 && statues.some(e => e === true);
        }
        delete user.candidateToken;
        if (user.registerType && user.registerType === CONSTANTS.TALENT_REGISTER_TYPE.AGENCY) {
            delete user.ratePerDay;
            delete user.ratePerHour;
            delete user.ratePerMonth;
        }
        return user;
    }

    /**
     * @desc This function is being used to update talent profile picture
     * @author Innovify
     * @since 02/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async updateProfilePicture (req, user, local) {
        let id = user._id;
        const userUpdate = {
            _id: id
        };

        if (user.role === CONSTANTS.ROLE.AGENCY && req.body.talentId) {
            id = req.body.talentId;
            userUpdate._id = id;
        }

        const fileName = `${process.env.NODE_ENV}-proflie-pictures/${id}`;
        const Validator = new UserBasicProfileValidator(req.file, local);
        await Validator.validationProfilePicture();
        await UploadService.uploadFile(req.file, fileName);
        const filePath = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${fileName}`;
        const updateData = {
            profilePicture: filePath
        };
        await User.updateOne(userUpdate, {
            $set: updateData
        });

        return updateData;
    }

    /**
     * @desc This function is being used to delete talent profile picture
     * @author Innovify
     * @since 11/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async deleteProfilePicture (user) {
        try {
            const fileName = `${process.env.NODE_ENV}-proflie-pictures/${user._id}`;
            await UploadService.deleteObject(fileName);
            await User.updateOne({
                _id: mongoose.Types.ObjectId(user._id)
            }, {
                $set: {
                    profilePicture: ''
                }
            });
        } catch (e) {
            console.log(e, 'errorrrrrrrrrrrrr');
        }
    }

    /**
     * @desc This function is being used to check professional details url
     * @author Innovify
     * @since 09/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     * @param {function} next exceptionHandler
     */
    static async checkURL (query, local) {
        if (!query.url) {
            throw new CodeMonkError(local(this.NOT_VALID, 'Interview status'), 400);
        }
        let url = query.url;
        if (url.includes('stackoverflow.com')) {
            const stackUrl = query.url.split('stackoverflow.com')[1]
                .split('/users/')[1]
                .split('/')[0];
            url = `https://api.stackexchange.com/2.2/users/${stackUrl}?&site=stackoverflow`;
        }
        const response = await request(url);
        if (response.statusCode.toString()[0] === '2'
            || response.statusCode.toString()[0] === '3') {
            return response.statusCode;
        } else {
            throw new CodeMonkError(local(this.NOT_VALID, 'Interview status'), 400);
        }
    }

    /**
     * @desc This function is being used to change password of a user profile
     * @author Innovify
     * @since 27/07/2020
     * @param {Object} data RequestBody
     * @param {user} user user Object
     */
    static async changePassword (data, user, local) {
        const Validator = new UserBasicProfileValidator(null, local);
        await Validator.password(data.oldPassword);
        await Validator.password(data.newPassword);
        const userPassword = await User.findOne({ _id: user._id }, { _id: 0, password: 1 }).lean();

        // Wrong username
        if (!userPassword) {
            throw new CodeMonkError(local('ERROR'), 500);
        } else {
            // Wrong Password
            const isMatch = await crypt.comparePassword(data.oldPassword, userPassword.password);
            if (!isMatch) {
                throw new CodeMonkError(local('PASSWORD_NOT_MATCH'), 400);
            } else {
                const hash = await crypt.enCryptPassword(data.newPassword);
                await User.updateOne({ _id: user._id }, { $set: { password: hash } });
            }
        }
    }

    static async checkOldPassword (data, user, local) {
        const Validator = new UserBasicProfileValidator(null, local);
        await Validator.password(data.oldPassword);
        const userPassword = await User.findOne({ _id: user._id }, { _id: 0, password: 1 }).lean();

        // Wrong username
        if (!userPassword) {
            throw new CodeMonkError(local('ERROR'), 500);
        } else {
            // Wrong Password
            const isMatch = await crypt.comparePassword(data.oldPassword, userPassword.password);
            if (!isMatch) {
                throw new CodeMonkError(local('PASSWORD_NOT_MATCH'), 400);
            }
        }
    }
}

module.exports = UserProfileService;

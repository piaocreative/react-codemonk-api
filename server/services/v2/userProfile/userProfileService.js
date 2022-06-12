const Project = require('../../../models/project.model');
const Utils = require('../../../util/utilFunctions');

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
        return user;
    }
}

module.exports = UserProfileService;

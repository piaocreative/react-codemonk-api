const validation = require('../validation');
const Project = require('../../models/project.model');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents validations for agency talent add validation.
 */
class AgencyEditTalentValidator extends validation {
    constructor(body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate edit talent
     * @author Innovify
     * @since 28/09/2020
     */
    async validateEditTalent() {
        await super.firstName(this.body.firstName);
        await super.lastName(this.body.lastName);
        await super.email(this.body.email);
        super.currency(this.body.currency);
        super.ratePerHour(this.body.rate);

    }

    async checkActiveProject(id, adminAllowed = false) {
        if (!adminAllowed) {
            const projects = await Project.find({ 'talents.talentId': id }).select('talents.$ status')
            const activeProjectStatus = [CONSTANTS.PROJECT.STATUS['Discovery'],
            CONSTANTS.PROJECT.STATUS['Kick-off'],
            CONSTANTS.PROJECT.STATUS['In Progress']]
            let statues = []
            for (const p of projects) {
                let statusState = activeProjectStatus.includes(p.status)
                let durationState = false;
                for (const t of p.talents) {
                    if (id.toString() === t.talentId.toString()) {
                        durationState = await Utils.isBetween(t.startDate, t.endDate)
                    }
                }
                statues.push(statusState && durationState)
            }
            const hasActiveProject = statues.length > 0 && statues.some(e => e === true);
            if (hasActiveProject) {
                throw new CodeMonkError(this.__('INVALID_RATE_CHANGE'), 400);
            }
        }
    }
}

module.exports = AgencyEditTalentValidator;

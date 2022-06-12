const CodeMonkError = require('../../util/CodeMonkError');
const { TIMESHEET: { VALID_VALUES } } = require('../../util/constants');
const validation = require('../validation');
const Project = require('../../models/project.model');
const Timesheet = require('../../models/timesheet.model');
const {
    ROLE: { CLIENT },
    TIMESHEET: {
        STATUS: { ACCEPT, IN_REVIEW, SUBMITTED },
        STATUS_STRING
    }
} = require('../../util/constants');
const momemt = require('moment');

/**
 * Class represents validations for adding timesheet
 */
class TimeSheetValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    checkValue (value) {
        if (!VALID_VALUES.includes(value)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Selected value'), 400);
        }
        return value;
    }


    /**
     * @desc This function is being used to validate date in DD/MM/YYYY format
     * @author Innovify
     * @since 16/06/2020
     * @param {Array} expectedStatus Array of expected status
     */
    checkStatus (expectedStatus) {
        if (!expectedStatus.includes(parseInt(this.body.status))) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Status'), 400);
        }
        return this.body.status;
    }

    /**
     *
     * @param {string} currentStatus
     * @param {string} role
     */
    checkStatusUpdate (currentStatus, role) {
        if (role === CLIENT) {
            if (![ACCEPT, IN_REVIEW].includes(this.body.status)) {
                throw new CodeMonkError(this.__(this.NOT_VALID, 'Status'), 400);
            }
            const isValidToChange = ![SUBMITTED, IN_REVIEW].includes(currentStatus);
            if (isValidToChange || currentStatus === ACCEPT) {
                const currentStatusStr = STATUS_STRING[currentStatus];
                const reqStatusStr = STATUS_STRING[this.body.status];
                throw new CodeMonkError(
                    this.__('TIMESHEET_STATUS_DECLINED', currentStatusStr, reqStatusStr),
                    400
                );
            }
        }
        return this.body.status;
    }

    async validateProject () {
        if (!this.body.talentId) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Talent Id'), 400);
        }
        const project = await Project.findOne({
            _id: this.body.projectId
        }, ['talents', 'clientId']);
        if (!project) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Project'), 400);
        }

        await this.validateAlreadyExists();

        const isAssigned = project.talents.some((d)=>{
            return d.talentId.toString() === this.body.talentId.toString() && d.status === 1;
        });

        if (!isAssigned) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Project'), 400);
        }
        return project;
    }

    async validateAlreadyExists () {
        const count = await Timesheet.count({
            projectId: this.body.projectId,
            dateStart: momemt(this.body.dateStart, 'DD/MM/YYYY'),
            status: { $ne: IN_REVIEW },
            talentId: this.body.talentId
        });

        if (count) {
            throw new CodeMonkError(this.__('TIMESHEET_EXISTS'), 400);
        }
    }

    checkWeek () {
        if (!Array.isArray(this.body.week) || this.body.week.length !== 7) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Week'), 400);
        }
        return this.body.week.map((obj) => {
            const date = this.checkDate(obj.date, 'Week day' );
            return {
                date: date.toDate(),
                value: this.checkValue(obj.value)
            };
        });
    }
}


module.exports = TimeSheetValidator;

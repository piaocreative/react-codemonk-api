const validation = require('../validation');
/**
 * Class represents validations for client add interview schedule.
 */
class ClientAddInterviewValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add interview schedule
     * @author Innovify
     * @since 01/10/2020
     */
    async addInterviewSchedule () {
        await this.checkId(this.body.talentId);
        super.projectName(this.body.name);
        super.projectDescription(this.body.description);
        this.timeSlots(this.body.timeSlots);
        if(this.body.jobPostId){
            await this.checkId(this.body.jobPostId);
        }
    }

    /**
     * @desc This function is being used to validate inteview slots
     * @author Innovify
     * @param {array} timeSlots timeSlots
     * @since 01/10/2020
     */
    timeSlots (timeSlots) {
        const { MIN, MAX } = CONSTANTS.INTERVIEW.TIMESLOT;
        if ( !Array.isArray(timeSlots) || MIN > timeSlots.length || MAX < timeSlots.length) {
            throw new CodeMonkError(this.__(this.ARRAY_LENGTH, {
                FIELD: 'Time Slot', MIN, MAX
            } ), 400);
        } else {
            let isError = false;
            timeSlots.forEach(t => {
                if (!MOMENT(t).isSameOrAfter(MOMENT())) {
                    isError = true;
                }
            });

            if (isError) {
                throw new CodeMonkError(this.__(this.NOT_VALID, 'Time Slot'), 400);
            }
        }
    }
}

module.exports = ClientAddInterviewValidator;

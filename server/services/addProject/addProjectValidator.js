const validation = require('../validation');
/**
 * Class represents validations for client add project details.
 */
class AddProjectValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate add project
     * @author Innovify
     * @since 05/08/2020
     */
    addProject () {
        super.projectName(this.body.name);
        super.projectDescription(this.body.description);
        this.buildStatus(this.body.buildStatus);
        this.checkLookingFor();
        this.budget(this.body.budget);
        this.messageToPreSales(this.body.messageToPreSales);
        this.speed(this.body.speed);
        this.teamManageType(this.body.teamManageType);

        if (this.body.buildStatus === 'live') {
            this.projectUrl(this.body.projectUrl);
        }
    }

    /**
     * @desc This function is being used to validate looking for options
     * @author Innovify
     * @since 05/08/2020
     */
    checkLookingFor () {
        let lookingFor = false;
        if (this.body.lookingForDesign
            && Array.isArray(this.body.lookingForDesign)
            && this.body.lookingForDesign.length) {
            lookingFor = true;
            this.lookingForDesign(this.body.lookingForDesign);
        }

        if (this.body.lookingForSoftwareDevelopment
            && Array.isArray(this.body.lookingForSoftwareDevelopment)
            && this.body.lookingForSoftwareDevelopment.length) {
            lookingFor = true;
            this.lookingForSoftwareDevelopment(this.body.lookingForSoftwareDevelopment);
        }

        if (this.body.lookingForDevelopmentTeam
            && Array.isArray(this.body.lookingForDevelopmentTeam)
            && this.body.lookingForDevelopmentTeam.length) {
            lookingFor = true;
            this.lookingForDevelopmentTeam(this.body.lookingForDevelopmentTeam);
        }

        if (this.body.lookingForDataAiMl
            && Array.isArray(this.body.lookingForDataAiMl)
            && this.body.lookingForDataAiMl.length) {
            lookingFor = true;
            this.lookingForDataAiMl(this.body.lookingForDataAiMl);
        }

        if (typeof this.body.lookingForGrowthHacking !== 'undefined') {
            lookingFor = true;
            this.lookingForGrowthHacking(this.body.lookingForGrowthHacking);
        }

        if (typeof this.body.lookingForAgileCoach !== 'undefined') {
            lookingFor = true;
            this.lookingForAgileCoach(this.body.lookingForAgileCoach);
        }

        if (this.body.lookingForOther) {
            lookingFor = true;
        }

        if (!lookingFor) {
            throw new CodeMonkError(this.__(this.SELECT, 'Looking for'), 400);
        }
    }

    /**
     * @desc This function is being used to validate project build status
     * @author Innovify
     * @param {string} buildStatus buildStatus
     * @since 05/08/2020
     */
    buildStatus (buildStatus) {
        if (!buildStatus || CONSTANTS.PROJECT.BUILD_STATUS.indexOf(buildStatus) === -1) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Build Status'), 400);
        }
    }

    /**
     * @desc This function is being used to validate project looking for design options
     * @author Innovify
     * @param {string} lookingForDesign lookingForDesign
     * @since 05/08/2020
     */
    lookingForDesign (lookingForDesign) {
        lookingForDesign.map((d) => {
            if (CONSTANTS.PROJECT.LOOKING_FOR.DESING.indexOf(d) === -1) {
                throw new CodeMonkError(this.__(this.SELECT, 'Roles for Design'), 400);
            }
        });
    }

    /**
     * @desc This function is being used to validate project looking for software development options
     * @author Innovify
     * @param {string} lookingForSoftwareDevelopment lookingForSoftwareDevelopment
     * @since 05/08/2020
     */
    lookingForSoftwareDevelopment (lookingForSoftwareDevelopment) {
        lookingForSoftwareDevelopment.map((d) => {
            if (CONSTANTS.PROJECT.LOOKING_FOR.SOFTWARE_DEVELOPMENT.indexOf(d) === -1) {
                throw new CodeMonkError(this.__(this.SELECT, 'Roles for Software development'), 400);
            }
        });
    }

    /**
     * @desc This function is being used to validate project looking for software development options
     * @author Innovify
     * @param {string} lookingForDevelopmentTeam lookingForDevelopmentTeam
     * @since 05/08/2020
     */
    lookingForDevelopmentTeam (lookingForDevelopmentTeam) {
        lookingForDevelopmentTeam.map((d) => {
            if (CONSTANTS.PROJECT.LOOKING_FOR.DEVELOPMENT_TEAM.indexOf(d) === -1) {
                throw new CodeMonkError(this.__(this.SELECT, 'Roles for Development team'), 400);
            }
        });
    }

    /**
     * @desc This function is being used to validate project looking for  AI Ml options
     * @author Innovify
     * @param {string} lookingForDataAiMl lookingForDataAiMl
     * @since 05/08/2020
     */
    lookingForDataAiMl (lookingForDataAiMl) {
        lookingForDataAiMl.map((d) => {
            if (CONSTANTS.PROJECT.LOOKING_FOR.DATA_AI_ML.indexOf(d) === -1) {
                throw new CodeMonkError(this.__(this.SELECT, 'Roles for AI/ML'), 400);
            }
        });
    }

    /**
     * @desc This function is being used to validate project looking for Growth Hacking options
     * @author Innovify
     * @param {string} lookingForGrowthHacking lookingForGrowthHacking
     * @since 05/08/2020
     */
    lookingForGrowthHacking (lookingForGrowthHacking) {
        if (typeof lookingForGrowthHacking !== 'boolean') {
            throw new CodeMonkError(this.__(this.SELECT, 'Looking for growth hacking'), 400);
        }
    }

    /**
     * @desc This function is being used to validate project looking for agile coach options
     * @author Innovify
     * @param {string} lookingForAgileCoach lookingForAgileCoach
     * @since 05/08/2020
     */
    lookingForAgileCoach (lookingForAgileCoach) {
        if (typeof lookingForAgileCoach !== 'boolean') {
            throw new CodeMonkError(this.__(this.SELECT, 'Looking for agile coach'), 400);
        }
    }

    /**
     * @desc This function is being used to validate project budget
     * @author Innovify
     * @param {string} budget budget
     * @since 05/08/2020
     */
    budget (budget) {
        if (!budget || CONSTANTS.PROJECT.BUDGET.indexOf(budget) === -1) {
            throw new CodeMonkError(this.__(this.SELECT, 'Project budget'), 400);
        }
    }

    /**
     * @desc This function is being used to validate project messageToPreSales
     * @author Innovify
     * @param {string} messageToPreSales messageToPreSales
     * @since 05/08/2020
     */
    messageToPreSales (messageToPreSales) {
        if (!messageToPreSales) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Message to Pre Sales'), 400);
        }
        const count = super.countHTML(messageToPreSales);
        const { MIN, MAX } = CONSTANTS.PROJECT.MESSAGE.LENGTH;
        if (MIN > count
            || MAX < count) {
            throw new CodeMonkError(this.__(this.LENGTH, {
                FIELD: 'Pre Sales', MIN, MAX
            }), 400);
        }
    }

    /**
     * @desc This function is being used to validate project speed
     * @author Innovify
     * @param {string} speed speed
     * @since 05/08/2020
     */
    speed (speed) {
        if (!speed || CONSTANTS.PROJECT.SPEED.indexOf(speed) === -1) {
            throw new CodeMonkError(this.__(this.SELECT, 'Speed'), 400);
        }
    }

    /**
     * @desc This function is being used to validate project team manage type
     * @author Innovify
     * @param {string} teamManageType teamManageType
     * @since 05/08/2020
     */
    teamManageType (teamManageType) {
        if (!teamManageType || CONSTANTS.PROJECT.TEAM_MANAGEMENT.indexOf(teamManageType) === -1) {
            throw new CodeMonkError(this.__(this.SELECT, 'Team Management'), 400);
        }
    }

    /**
     * @desc This function is being used to validate project url incase project is live
     * @author Innovify
     * @param {string} projectUrl projectUrl
     * @since 05/08/2020
     */
    projectUrl (projectUrl) {
        if (!CONSTANTS.REGEX.URL.test(projectUrl)) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Project URL'), 400);
        }
    }

}

module.exports = AddProjectValidator;

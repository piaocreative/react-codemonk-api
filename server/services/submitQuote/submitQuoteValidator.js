const validation = require('../validation');
/**
 * Class represents validations for client submit a quote.
 */
class SubmitQuoteValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate submit a quote.
     * @author Innovify
     * @since 09/11/2020
     */
    async submitQuote () {
        await super.checkId(this.body.quoteId);
        await super.checkId(this.body.projectId);
        this.assumptions(this.body.assumptions);
        this.outOfScope(this.body.outOfScope);
        this.teamStructure(this.body.teamStructure);
        this.totalCost(this.body.totalCost);
        this.otherInfo(this.body.otherInfo);
    }

    assumptions (assumptions) {
        if (!assumptions) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Assumptions'), 400);
        } else {
            const count = super.countHTML(assumptions);
            const { MIN, MAX } = CONSTANTS.QUOTE.ASSUMPTIONS.LENGTH;
            if (MIN > count || MAX < count) {
                throw new CodeMonkError(this.__(this.LENGTH, {
                    FIELD: 'Assumptions', MIN, MAX
                }), 400);
            }
        }
    }

    outOfScope (outOfScope) {
        if (!outOfScope) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Out of Stock'), 400);
        } else {
            const count = super.countHTML(outOfScope);
            const { MIN, MAX } = CONSTANTS.QUOTE.OUT_OF_SCOPE.LENGTH;
            if (MIN > count || MAX < count) {
                throw new CodeMonkError(this.__(this.LENGTH, {
                    FIELD: 'Out of Stock', MIN, MAX
                }), 400);
            }
        }
    }

    teamStructure (teamStructure) {
        if (!teamStructure) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Team Structure'), 400);
        } else {
            const count = super.countHTML(teamStructure);
            const { MIN, MAX } = CONSTANTS.QUOTE.TEAM_STRUCTURE.LENGTH;
            if (MIN > count || MAX < count) {
                throw new CodeMonkError(this.__(this.LENGTH, {
                    FIELD: 'Team Structure', MIN, MAX
                }), 400);
            }
        }
    }

    totalCost (totalCost) {
        if (!totalCost || isNaN(totalCost) || totalCost <= 0) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Total cost'), 400);
        }
    }

    otherInfo (otherInfo) {
        if (!otherInfo) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Other Info'), 400);
        } else {
            const count = super.countHTML(otherInfo);
            const { MIN, MAX } = CONSTANTS.QUOTE.OTHER_INFO.LENGTH;
            if (MIN > count || MAX < count) {
                throw new CodeMonkError(this.__(this.LENGTH, {
                    FIELD: 'Other Info', MIN, MAX
                }), 400);
            }
        }
    }
}

module.exports = SubmitQuoteValidator;

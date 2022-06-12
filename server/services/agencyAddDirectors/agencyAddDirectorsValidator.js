const validation = require('../validation');

/**
 * Class represents validations for agency agency directors/shareholders validation.
 */
class AgencyPayDetailsValidator extends validation {
    constructor (body, local) {
        super(local);
        this.body = body;
    }

    /**
     * @desc This function is being used to validate directors/shareholders details and credetials
     * @author Innovify
     * @since 03/09/2020
     */
    async validateDirectorDetails () {
        if (!this.body.directors || !Array.isArray(this.body.directors) || !this.body.directors.length) {
            throw new CodeMonkError(this.__(this.REQUIRED, 'Directors'), 400);
        }

        await this.directorDetails(this.body.directors);
    }

    /**
     * @desc This function is being used to validate director(s) details
     * @author Innovify
     * @since 03/09/2020
     * @param {Array} directorDetails directorDetails of user
     */
    async directorDetails (directorDetails) {
        let holdingPercent = 0;
        await Promise.all(directorDetails.map(async (d) => {
            await super.firstName(d.firstName);
            await super.lastName(d.lastName);
            super.checkDate(d.dob, 'Director DOB');
            await super.postcode(d.postcode);
            await super.addressLineOne(d.addressLineOne);
            await super.city(d.city);
            await super.country(d.country);
            holdingPercent += (d.holdingPercent) ? d.holdingPercent : 0;
            this.roleInCompany(d.isDirector, d.isShareHolder, d.holdingPercent);
        }));

        if (holdingPercent > 100) {
            throw new CodeMonkError(this.__(this.NOT_VALID, 'Holding Percentage'), 400);
        }
    }

    /**
     * @desc This function is being used to validate director or share holder details
     * @author Innovify
     * @since 03/09/2020
     * @param {Boolean} isDirector isDirector is true, false or undefined
     * @param {Boolean} isShareHolder isShareHolder is true, false or undefined
     * @param {Number} holdingPercent holdingPercent in numbers
     */
    roleInCompany (isDirector, isShareHolder, holdingPercent) {
        let isAtleastOneOptionChoosen = isDirector !== undefined && isDirector;

        if (isShareHolder !== undefined && isShareHolder) {
            if (holdingPercent === undefined || holdingPercent > 100 || holdingPercent < 20) {
                throw new CodeMonkError(this.__(this.ARRAY_LENGTH, {
                    FIELD: 'Holding Percentage', MIN: 20, MAX: 100
                }), 400);
            }
            isAtleastOneOptionChoosen = true;
        }

        if (!isAtleastOneOptionChoosen) {
            throw new CodeMonkError(this.__(this.SELECT, 'Role in company'), 400);
        }
    }

}

module.exports = AgencyPayDetailsValidator;

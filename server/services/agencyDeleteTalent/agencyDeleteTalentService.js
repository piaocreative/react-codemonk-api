const AgencyTalent = require('../../models/agencyTalent.model.js');
const AgencyDeleteTalentsValidator = require('./agencyDeleteTalentValidator');
const User = require('../../models/user.model.js');
const Talent = require('../../models/talent.model.js');
const Constants = require('../../util/constants');


/**
 * Class represents services for agency profile save
 */
class AgencyDeleteTalentsService {

    /**
     * @desc This function is being used to agency delete a talent
     * @author Innovify
     * @since 28/08/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalent (req, user, local) {
        const Validator = new AgencyDeleteTalentsValidator(req.body, local);
        await Validator.validateDeleteTalent();

        await AgencyTalent.findOneAndUpdate({
            agencyId: user._id,
            'talents.email': req.body.email
        }, {
            $pull: {
                talents: {
                    email: req.body.email
                }
            }
        });
        const userData = await User.findOneAndUpdate({
            email: req.body.email
        }, {
            $set: {
                requestChangeEmail: 1
            }
        });

        userData && await Talent.findOneAndUpdate({
            userId: userData._id
        }, {
            $set: {
                registerType: Constants.TALENT_REGISTER_TYPE.FREELANCER
            }
        });
    }
}

module.exports = AgencyDeleteTalentsService;

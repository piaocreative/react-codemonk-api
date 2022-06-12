
const TalentEditDetailsService = require('./talentEditDetailsService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for Talent Edit Details.
 */
class TalentEditDetailsController {

    /**
     * @desc This function is being used to edit talent details
     * @author Innovify
     * @since 18/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentProfileDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentProfileDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit talent professional summary brief
     * @author Innovify
     * @since 01/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentSummary (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentSummary(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit talent rate and currency
     * @author Innovify
     * @since 01/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentRate (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentRate(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit skills details
     * @author Innovify
     * @since 19/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentSkillsDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentSkillsDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit url details
     * @author Innovify
     * @since 19/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentProfessionalUrlDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentProfessionalUrlDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to add talent project at beginning of project array
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalentProjectDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.addTalentProjectDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete talent project from talent object project array
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalentProjectDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.deleteTalentProjectDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit a project from talent object project array
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentProjectDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentProjectDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit Preference details
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentPreferenceDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentPreferenceDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit availability details
     * @author Innovify
     * @since 22/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentAvailabilityDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentAvailabilityDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to add talent education
     *  at beginning of education array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalentEducationDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.addTalentEducationDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete talent education
     *  from talent object education array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalentEducationDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.deleteTalentEducationDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit a education
     *  from talent object education array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentEducationDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentEducationDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to add talent work experience
     *  beginning of workExperience array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalentWorkExperience (req, res) {
        try {
            const data = await TalentEditDetailsService.addTalentWorkExperience(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete talent work experience
     *  based on id of workExperience array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalentWorkExperience (req, res) {
        try {
            const data = await TalentEditDetailsService.deleteTalentWorkExperience(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit a talent work experience
     *  based on id of workExperience array
     * @author Innovify
     * @since 23/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentWorkExperience (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentWorkExperience(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to add talent certificate at
     *  beginning of certificate array
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async addTalentCertificateDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.addTalentCertificateDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to delete talent certificate
     *  from object certificate array
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteTalentCertificateDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.deleteTalentCertificateDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit a  certificate
     *  from talent object certificate array
     * @author Innovify
     * @since 24/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentCertificateDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentCertificateDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit billing details
     * @author Innovify
     * @since 25/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentBillingDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentBillingDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('BILLING_SUCCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit payment details
     * @author Innovify
     * @since 25/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentPaymentDetails (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentPaymentDetails(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('PAYMENT_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to edit languages
     * @author Innovify
     * @since 20/07/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async editTalentLanguages (req, res) {
        try {
            const data = await TalentEditDetailsService.editTalentLanguages(req, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

}

module.exports = TalentEditDetailsController;

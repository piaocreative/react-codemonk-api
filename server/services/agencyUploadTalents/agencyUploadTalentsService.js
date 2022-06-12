const mongoose = require('mongoose');
const User = require('../../models/user.model');
const AgencyTalent = require('../../models/agencyTalent.model.js');
const AgencyUploadTalentsValidator = require('./agencyUploadTalentsValidator');
const AgencyCreateTalentsService = require('../agencyCreateTalents/agencyCreateTalentsService');
var XLSX = require('node-xlsx');

/**
 * Class represents services for agency upload multiple talents
 */
class AgencyUploadTalentsService {

    /**
     * @desc This function is being used to agency upload multiple talents
     * @author Innovify
     * @since 30/09/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async uploadTalentList (req, user, local) {
        const Validator = new AgencyUploadTalentsValidator(null, local);
        await Validator.validateUploadTalentsFile(req.file);
        const parsedData = AgencyUploadTalentsService.getFileParsedData(req.file.buffer);

        if (parsedData.totalCount) {
            const validTalents = Validator.getValidTalents(parsedData.talentInputArray);
            if (!validTalents.length) {
                throw new CodeMonkError( local('UPLOAD_TALENT_ERROR'), 400);
            }
            const emails = [];
            validTalents.filter(d => {
                emails.push(d.email);
            });

            const existingUser = await User.find({ email: { $in: emails } }, { _id: 0, email: 1 });

            let finalArray = validTalents;
            finalArray = _.differenceBy(finalArray, existingUser, 'email');
            finalArray = _.differenceBy(finalArray, user.talents, 'email');

            if (user.signupStep && user.signupStep >= CONSTANTS.AGENCY.REGITRATION_STATUS.INVITE_TALENT_DETAIL) {
                finalArray.map(async t => {
                    await AgencyTalent.updateOne({
                        agencyId: mongoose.Types.ObjectId(user._id)
                    }, {
                        $addToSet: {
                            talents: t
                        }
                    });
                    const agencyTalent = await AgencyTalent.findOne({
                        agencyId: mongoose.Types.ObjectId(user._id),
                        'talents.email': t.email
                    }, {
                        _id: 0,
                        talents: { $elemMatch: { email: t.email } }
                    });
                    await AgencyCreateTalentsService.createAgencyTalent(t, user, agencyTalent.talents[0]._id);
                });
            } else {
                await AgencyTalent.findOneAndUpdate({
                    agencyId: mongoose.Types.ObjectId(user._id)
                }, {
                    $addToSet: {
                        talents: finalArray
                    }
                }, { upsert: true, new: true });
            }

            return {
                totalCount: parsedData.totalCount,
                addedCount: finalArray.length
            };
        } else {
            throw new CodeMonkError(local('UPLOAD_TALENT_ERROR'), 400);
        }
    }

    static getFileParsedData (buffer) {
        const fileData = XLSX.parse(buffer, { type: 'buffer' });
        const talentInputArray = [];
        let totalCount = 0;

        fileData.filter(d => {
            const parseData = d.data.slice(1);
            if (parseData.length) {
                parseData.filter(i => {
                    if (i.length) {
                        totalCount += 1;
                        talentInputArray.push({
                            firstName: i[0],
                            lastName: i[1],
                            email: i[2].toLowerCase(),
                            currency: i[3],
                            rate: i[4]
                        });
                    }
                });
            }
        });

        return {
            totalCount,
            talentInputArray
        };
    }
}

module.exports = AgencyUploadTalentsService;

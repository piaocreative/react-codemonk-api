const mongoose = require('mongoose');
const Talent = require('../../models/talent.model');
const Eventlog = require('../../models/eventlog.model');
const Utils = require('../../util/utilFunctions');
const TalentListValidator = require('./talentListValidator');

/**
 * Class represents services for talent list based in name search
 */
class TalentListService {
    /**
     * @desc This function is being used to get talent list based status query
     * @author Innovify
     * @since 26/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async list (req, local) {
        const options = {
            sort: TalentListService.validateSort(req.query.sort, 'name'),
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit)
        };

        const aggregateParams = Utils.getCommonUserSearchAggregateParams(req.query.status, true);
        const statusSearch = { $match: {} };
        TalentListService.commonTalentListCondition(req.query, statusSearch, local);

        aggregateParams.push(statusSearch);
        TalentListService.orFilterOnTalentList(req.query, aggregateParams, local);
        aggregateParams.push({
            $addFields: {
                workExperience2: {
                    $filter: {
                        input: '$workExperience',
                        cond: { $eq: ['$$this.startDate', { $max: '$workExperience.startDate' }] }
                    }
                }
            }
        },
            {
                $addFields: {
                    workExperience2: { $arrayElemAt: ['$workExperience2', 0] }
                }
            });
        aggregateParams.push({
            $project: {
                talentUserId: '$userId',
                name: { $concat: ['$firstName', ' ', '$lastName'] },
                email: 1,
                profilePicture: 1,
                phoneNumber: { $concat: ['+', '$countryCode', ' ', '$phoneNumber'] },
                registerType: 1,
                status: Utils.getUserStatus(true),
                skills: 1,
                workExperience: 1,
                assignments: 1,
                workPreference: 1,
                timeZone: 1,
                firstName: '$firstName',
                lastName: '$lastName',
                city: 1,
                country: 1,
                primaryRole: 1,
                yearsOfExperience: { $arrayElemAt: [{ $split: ['$yearsOfExperience', '-'] }, 0] },
                experienceOrder: 1,
                formerEmployer: '$workExperience2.employer',
                teamPreference: 1,
                verifiedProfile: 1
            }
        });

        if (req.query.q) {
            const query = new RegExp(req.query.q, 'i');
            aggregateParams.push({
                $match: {
                    $or: [
                        { primaryRole: { $regex: query } },
                        { 'skills.name': { $regex: query } },
                        { name: { $regex: query } },
                        { email: { $regex: query } }
                    ]
                }
            });
        }

        const aggregate = Talent.aggregate(aggregateParams);
        return await Talent.aggregatePaginate(aggregate, options);
    }

    static commonTalentListCondition (params, aggregateParams, local) {
        const Validator = new TalentListValidator(params, local);
        const role = Validator.checkProjectRole(params.role);
        if (role.length) {
            aggregateParams.$match.primaryRole =
            {
                $in: role
            };
        }

        const expArray = Validator.yearsOfExperience(params.yearsOfExperience);
        if (expArray.length) {
            aggregateParams.$match.yearsOfExperience = {
                $in: expArray
            };
        }

        const teamArray = Validator.teamPreference(params.teamPreference);
        if (teamArray.length) {
            aggregateParams.$match.teamPreference = {
                $in: teamArray
            };
        }

        const workArray = Validator.workPreference(params.workPreference);
        if (workArray.length) {
            aggregateParams.$match.workPreference = {
                $in: workArray
            };
        }

        const assignmentArray = Validator.assignment(params.assignment);
        if (assignmentArray.length) {
            aggregateParams.$match.assignments = {
                $in: assignmentArray
            };
        }

        if (params.availability && params.availability !== 'all') {
            if (params.availability === 'yes') {
                aggregateParams.$match.availability = true;
            } else if (params.availability === 'no') {
                aggregateParams.$match.availability = false;
            }
        }

        if (params.location) {
            aggregateParams.$match.country = {
                $in: params.location.split(',')
            };
        }

        const degreeLevel = Validator.degreeLevel(params.degreeLevel);
        if (degreeLevel) {
            aggregateParams.$match['educationDetails.degreeLevel'] = params.degreeLevel.replace('\'', '’');
        }

        if (params.language) {
            aggregateParams.$match['language.name'] = {
                $in: params.language.split(',')
            };
        }

        if (params.skills) {
            aggregateParams.$match['skills.name'] = {
                $in: params.skills.split(',')
            };
        }

        if (params.type && params.type !== 'all') {

            aggregateParams.$match.registerType = {
                $in: params.type.split(',')
            };
        }

        const dayRate = Validator.dayRate(params.dayRate);
        if (dayRate) {
            aggregateParams.$match.ratePerHour = {
                $gte: parseInt(params.dayRate.split(',')[0]),
                $lte: parseInt(params.dayRate.split(',')[1])
            };
        }

        const currencyArray = Validator.currency(params.currency);
        if (currencyArray.length) {
            aggregateParams.$match.currency = {
                $in: currencyArray
            };
        }

        return aggregateParams;
    }

    static orFilterOnTalentList (params, aggregateParams, local) {
        const orArray = [];
        const Validator = new TalentListValidator(params, local);


        const industryArray = Validator.industry(params.industry);
        if (industryArray.length) {
            // aggregateParams.$match['industries'] = {
            //     $in: industryArray
            // };

            orArray.push({
                industries: {
                    $exists: false
                }
            });
            orArray.push({
                industries: {
                    $in: industryArray
                }
            });
        }
        const discProfileArray = Validator.discProfile(params.discProfile);
        if (discProfileArray.length) {
            // aggregateParams.$match['discProfiles'] = {
            //     $in: discProfileArray
            // };

            orArray.push({
                discProfiles: {
                    $exists: false
                }
            });
            orArray.push({
                discProfiles: {
                    $in: discProfileArray
                }
            });
        }
        const teamWorkingArray = Validator.teamWorking(params.teamWorking);
        if (teamWorkingArray.length) {
            // aggregateParams.$match['teamWorking'] = {
            //     $in: teamWorkingArray
            // };

            orArray.push({
                teamWorking: {
                    $exists: false
                }
            });
            orArray.push({
                teamWorking: {
                    $in: teamWorkingArray
                }
            });
        }
        const valuesArray = Validator.values(params.companyCultures);
        if (valuesArray.length) {
            // aggregateParams.$match['companyCultures'] = {
            //     $in: valuesArray
            // };

            orArray.push({
                companyCultures: {
                    $exists: false
                }
            });
            orArray.push({
                companyCultures: {
                    $in: valuesArray
                }
            });
        }
        const certificationArray = Validator.certification(params.certification);
        if (certificationArray.length) {
            // aggregateParams.$match['certifications'] = {
            //     $in: certificationArray
            // };
            orArray.push({
                certifications: {
                    $exists: false
                }
            });
            orArray.push({
                certifications: {
                    $in: certificationArray
                }
            });
        }
        if (orArray && orArray.length && orArray.length > 0) {

            aggregateParams.push({
                $match: {
                    $or: orArray
                }
            });
        }

    }

    /**
     * @desc This function is being used to validate sort variable for listing
     * @author Innovify
     * @since 17/12/2020
     * @param {string} sort sort object
     */
    static validateSort (sort, key = '_id') {
        if (sort) {
            return JSON.parse(sort);
        } else {
            return { [key]: 1 };
        }
    }

    static async log(req, local) {
        const userId = mongoose.Types.ObjectId(req.params.id);
        const log = await Eventlog.find({ userId }, ['createdAt', 'content'], { sort: { createdAt: -1 } });
        return log;
    }
}

module.exports = TalentListService;

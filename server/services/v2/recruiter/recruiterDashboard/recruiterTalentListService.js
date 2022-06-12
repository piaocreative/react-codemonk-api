const Referral = require('../../../../models/referral.model');
const Utils = require('../../../../util/utilFunctions');
const ReferralListValidator = require('../../referralList/referralListValidator');
const SortParser = require('sort-parser');
const sp = new SortParser(
    { format: SortParser.mongodb,
        fields: ['_id', 'email', 'referrer.firstName', 'referrer.lastName', 'referee.firstName', 'referee.lastName',
            'status', 'referredOn', 'daysOfRefereeActivated', 'daysOfRefereeVerified', 'daysOfRefereeHired'
        ],
        strict: true
    });
const { Types: { ObjectId } } = require('mongoose');

/**
 * Class represents services for referral list
 */
class RecruiterTalentListService {
    /**
     * @desc This function is being used to get referral list based status query
     * @author CodeMonk
     * @since 07/02/2022
     * @param {Object} req Request
     * @param {Object} req.query RequestQuery
     * @param {function} res Response
     */
    static async getInvitedTalents (req, user, local) {
        const options = {
            sort: RecruiterTalentListService.validateSort(req.query.sort, 'name'),
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true
        };

        const aggregateParams = [];
        const statusSearch = { $match: {} };
        RecruiterTalentListService.commonTalentListCondition(user._id, statusSearch);

        aggregateParams.push(statusSearch);
        aggregateParams.push( {
            $lookup: {
                from: 'users',
                localField: 'referrerUserId',
                foreignField: '_id',
                as: 'referrerUser'
            }
        });

        aggregateParams.push( {
            $lookup: {
                from: 'users',
                localField: 'refereeUserId',
                foreignField: '_id',
                as: 'refereeUser'
            }
        });

        aggregateParams.push({
            $lookup: {
                from: 'talents',
                let: { t: '$refereeUserId' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$userId', '$$t'] } } },
                    {
                        $project: {
                            talentId: '$_id',
                            registerType: 1,
                            isActive: 1,
                            signupStep: 1,
                            verifiedProfile: 1,
                            isHiredFirst: 1
                        }
                    }],
                as: 'refereeTalent'
            }
        });

        aggregateParams.push({
            $lookup: {
                from: 'recruiters',
                let: { t: '$referrerUserId' },
                pipeline: [
                    { $match: { '$expr': { '$eq': ['$userId', '$$t'] } } },
                    {
                        $project: {
                            recruiterId: '$_id',
                            registerType: 1
                        }
                    }],
                as: 'referrerRecruiter'
            }
        });
        aggregateParams.push({
            $project: {
                referrerUserId: 1,
                refereeUserId: 1,
                email: { $ifNull: [{ $arrayElemAt: ['$refereeUser.email', 0] }, '$refereeEmailId'] },
                fullNameOfReferee: 1,
                referredOn: 1,
                daysOfRefereeActivated: 1,
                daysOfRefereeVerified: 1,
                daysOfRefereeHired: 1,
                'referrer.firstName': { $arrayElemAt: ['$referrerUser.firstName', 0] },
                'referrer.lastName': { $arrayElemAt: ['$referrerUser.lastName', 0] },
                'referrer.profilePicture': { $arrayElemAt: ['$referrerUser.profilePicture', 0] },
                'referrer.recruiterId': { $arrayElemAt: ['$referrerRecruiter.recruiterId', 0] },
                'referee.firstName': { $arrayElemAt: ['$refereeUser.firstName', 0] },
                'referee.lastName': { $arrayElemAt: ['$refereeUser.lastName', 0] },
                'referee.profilePicture': { $arrayElemAt: ['$refereeUser.profilePicture', 0] },
                'referee.talentId': { $arrayElemAt: ['$refereeTalent.talentId', 0] },
                'status': {
                    $switch: {
                        branches: [
                            RecruiterTalentListService.invitedStatus( 'Invited'),
                            RecruiterTalentListService.registeredStatus('Registered'),
                            RecruiterTalentListService.hiredStatus('Hired'),
                            RecruiterTalentListService.verifiedStatus('Verified'),
                            RecruiterTalentListService.activeStatus('Active')
                        ],
                        default: '-'
                    }
                }
            }
        });
        const statusSearch2 = { $match: {} };
        RecruiterTalentListService.commonTalentListCondition2(req.query, statusSearch2, local);

        aggregateParams.push(statusSearch2);
        const aggregate = Referral.aggregate(aggregateParams);
        return await Referral.aggregatePaginate(aggregate, options);
    }

    static commonTalentListCondition (referrerUserId, aggregateParams) {
        aggregateParams.$match.referrerUserId = ObjectId(referrerUserId);

        return aggregateParams;
    }

    static commonTalentListCondition2 (params, aggregateParams, local) {
        const Validator = new ReferralListValidator(params, local);
        const status = Validator.checkTalentStatus(params.status);
        if (status.length) {
            aggregateParams.$match.status = {
                $in: status
            };
        }
        return aggregateParams;
    }

    /**
     * @desc This function is being used to validate sort variable for listing
     * @author CodeMonk
     * @since 07/02/2022
     * @param {string} sort sort object
     */
    static validateSort (sort, key = '_id') {
        if (sort) {
            try {
                return sp(sort);
            } catch (error) {
                CONSOLE_LOGGER.error('Wrong Sorting Parameter');
                CONSOLE_LOGGER.error(error);
            }
        }
        return { [key]: 1 };
    }

    static invitedStatus (result) {
        return {
            case:  { $eq: [{ $ifNull: ['$refereeUserId', ''] }, ''] },
            then: result
        };
    }

    static registeredStatus (result) {
        return {
            case: {
                $and: [
                    {
                        $or: [
                            {
                                $and: [
                                    { $lt: [{ $arrayElemAt: ['$refereeTalent.signupStep', 0] }, CONSTANTS.AGENCY.TALENT.ACTIVE_STATUS] },
                                    { $eq: [{ $arrayElemAt: ['$refereeTalent.registerType', 0] }, 'agency'] }

                                ]
                            },
                            {
                                $and: [
                                    { $lt: [{ $arrayElemAt: ['$refereeTalent.signupStep', 0] }, CONSTANTS.TALENT.ACTIVE_STATUS] },
                                    { $eq: [{ $arrayElemAt: ['$refereeTalent.registerType', 0] }, 'freelancer'] }

                                ]
                            }
                        ]
                    }
                ]
            },
            then: result
        };
    }

    static activeStatus (result) {
        return {
            case: {
                $and: [
                    RecruiterTalentListService.IsActiveCondition(),
                    RecruiterTalentListService.signupStepCondition()
                ]
            },
            then: result
        };
    }

    static signupStepCondition () {
        return {
            $or: [
                {
                    $and: [
                        { $gte: [{ $arrayElemAt: ['$refereeTalent.signupStep', 0] }, CONSTANTS.AGENCY.TALENT.ACTIVE_STATUS] },
                        { $eq: [{ $arrayElemAt: ['$refereeTalent.registerType', 0] }, 'agency'] }
                    ]
                },
                {
                    $and: [
                        { $gte: [{ $arrayElemAt: ['$refereeTalent.signupStep', 0] }, CONSTANTS.TALENT.ACTIVE_STATUS] },
                        { $eq: [{ $arrayElemAt: ['$refereeTalent.registerType', 0] }, 'freelancer'] }
                    ]
                }
            ]
        };
    }

    static IsActiveCondition () {
        return { $eq: [{ $arrayElemAt: ['$refereeTalent.isActive', 0] }, 1] };
    }

    static verifiedCondition () {
        return { $eq: [{ $arrayElemAt: ['$refereeTalent.verifiedProfile', 0] }, true] };
    }

    static hiredCondition () {
        return { $eq: [{ $arrayElemAt: ['$refereeTalent.isHiredFirst', 0] }, true] };
    }

    static verifiedStatus (result) {
        return {
            case: {
                $and: [
                    RecruiterTalentListService.IsActiveCondition(),
                    RecruiterTalentListService.signupStepCondition(),
                    RecruiterTalentListService.verifiedCondition()
                ]
            },
            then: result
        };
    }

    static hiredStatus (result) {
        return {
            case: {
                $and: [
                    RecruiterTalentListService.IsActiveCondition(),
                    RecruiterTalentListService.signupStepCondition(),
                    RecruiterTalentListService.hiredCondition()
                ]
            },
            then: result
        };
    }


}

module.exports = RecruiterTalentListService;

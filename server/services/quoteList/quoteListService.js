const Quote = require('../../models/quote.model');
const Utils = require('../../util/utilFunctions');
const User = require('../../models/user.model');
const { Types: { ObjectId } } = require('mongoose');
const { ROLE: { AGENCY, ADMIN } } = require('../../util/constants');

/**
 * Class represents services for talent job post list based on status
 */
class QuoteListService {
    /**
     * @desc This function is being used to get talent quote list based on status
     * @author Innovify
     * @since 09/11/2020
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async list (req, user, isNew) {
        const aggregate = Quote.aggregate();

        if (user.role === ADMIN) {
            const match = QuoteListService.statusFilter(req.query.status);
            aggregate.match(match);
            aggregate.lookup({
                from: 'projects',
                localField: 'projectId',
                foreignField: '_id',
                as: 'project'
            });
        } else {
            const match = { status: 1, isArchived: false };
            aggregate.match(match);
        }

        const project = {
            projectId: 1,
            name: 1,
            description: 1,
            quoteUrl: 1,
            isArchived: 1
        };

        if (user.role === AGENCY) {
            project.isApplied = {
                $cond: {
                    if: { $in: [user._id, '$agencies.agencyId'] },
                    then: true,
                    else: false
                }
            };
        } else {
            project.projectName = { $arrayElemAt: ['$project.name', 0] };
        }

        aggregate.project(project);
        QuoteListService.searchQuery(req.query.q, aggregate);
        const data = await Quote.aggregatePaginate(aggregate, {
            sort: { _id: -1 },
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit),
            lean: true
        });

        await QuoteListService.resetQuoteView(user, isNew);
        return data;
    }

    static statusFilter (status) {
        const match = {};
        switch (status) {
            case '1':
                match.agencies = { $size: 0 };
                match.isArchived = false;
                break;
            case '2':
                match['agencies.0'] = { $exists: true };
                match.isArchived = false;
                break;
            case '3':
                match.status = 2;
                match.isArchived = false;
                break;
            case '4':
                match.isArchived = true;
                break;
            default:
                break;
        }
        return match;
    }

    static async resetQuoteView (user, isNew) {
        if (user.role === AGENCY && isNew) {
            await User.updateOne({
                _id: ObjectId(user._id)
            }, {
                quoteLastVisited: MOMENT()
            });
        }
    }

    static searchQuery (q, aggregate) {
        if (q) {
            const query = new RegExp(q, 'i');
            aggregate.match({
                $or: [{
                    name: { $regex: query }
                },
                {
                    description: { $regex: query }
                },
                {
                    projectName: { $regex: query }
                }]
            });
        }
    }
}

module.exports = QuoteListService;

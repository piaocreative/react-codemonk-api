const JobPost = require('../../../../models/jobPost.model');
const { getPageNumber, getLimit, splitAndAddFields } = require('../../../../util/utilFunctions');
const { ROLE: { TALENT, AGENCY, RECRUITER } } = require('../../../../util/constants');
const moment = require('moment');
const SortParser = require('sort-parser');
const sp = new SortParser(
    { format: SortParser.mongodb,
        fields: ['_id', 'name'],
        strict: true
    });
/**
 * Class represents services for talent job post list based on status
 */
class JobPostListService {
    /**
     * @desc This function is being used to get talent job post list based on status
     * @author CodeMonk
     * @since 14/02/2022
     * @param {Object} req Request
     * @param {Object} req.query query
     * @param {function} res Response
     */
    static async list (req, user) {
        const options = {
            sort: this.sortData(req.query),
            page: getPageNumber(req.query.page),
            limit: getLimit(req.query.limit),
            lean: true
        };

        const aggregate = JobPost.aggregate();
        JobPostListService.addFilters(req.query, user, aggregate);
        const project = {
            name: 1,
            description: 1,
            role: 1,
            hardSkills: 1,
            ratePerHour: 1,
            currency: 1,
            skills: 1,
            workPreference: 1,
            teamPreference: 1,
            assignments: 1,
            expertise: 1,
            duration: 1,
            isArchived: 1,
            timeZone: 1,
            jobId: 1,
            employmentType: 1,
            currencyAnnualRate: 1,
            annualRate: 1
        };

        this.searchQuery(aggregate, req.query.q, user.role);
        aggregate.project(project);
        const data = await JobPost.aggregatePaginate(aggregate, options);
        return data;
    }

    static sortData (queryParam) {
        let sort = { '_id': -1 };
        if (queryParam.sort) {
            try {
                sort = sp(queryParam.sort);
            } catch (error) {
                CONSOLE_LOGGER.error('Wrong Sorting Parameter');
                CONSOLE_LOGGER.error(error);
            }
        }
        return sort;
    }

    /**
     * Add filters in Brief list
     * @param {object} filters req object
     * @param {object} user user object
     * @param {object} aggregate
     */
    static addFilters (filters, user, aggregate) {
        let match = {};
        const filterFields = [
            'expertise', 'role', 'skills', 'hardSkills',
            'workPreference', 'assignments', 'teamPreference'
        ];

        const isAnyFilter = filterFields.some((field) => {
            return Object.keys(filters).includes(field);
        });
        if (isAnyFilter) {
            const condition = splitAndAddFields(filters, filterFields);
            match = { ...match, ...condition };
        }

        if (user.role === TALENT || user.role === AGENCY || user.role === RECRUITER) {
            match.isArchived = false;
            match.status = CONSTANTS.BRIEF.STATUS.ACTIVE;
        }

        switch (filters.datePosted) {
            case 'Last 24 hours':
                match = { createdAt: { $gte: moment().subtract(24, 'hours').toDate() } };
                break;
            case 'Last 7 days':
                match = { createdAt: { $gte: moment().subtract(7, 'days').toDate() } };
                break;
            case 'Last 14 days':
                match = { createdAt: { $gte: moment().subtract(14, 'days').toDate() } };
                break;
            case 'Last 30 days':
                match = { createdAt: { $gte: moment().subtract(30, 'days').toDate() } };
                break;
            default:
                break;
        }
        if (Object.keys(match).length) {
            aggregate.match(match);
        }
    }

    /**
     * Add search in brief list
     * @param {object} aggregate
     * @param {string} q
     */
    static searchQuery (aggregate, q) {
        if (!q) {
            return;
        }
        const query = new RegExp(q, 'i');
        const condition = [
            { 'name': { $regex: query } },
            { 'description': { $regex: query } }
        ];

        aggregate.match({
            $or: condition
        });
    }
}

module.exports = JobPostListService;

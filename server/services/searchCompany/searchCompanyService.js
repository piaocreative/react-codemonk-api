const Company = require('../../models/company.model')


class SearchCompanyService {

    static async searchCompany(req, local) {
        if (!req.query.q) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'Filter'), 400);
        }
        const query = new RegExp(req.query.q, 'i');

        const aggregate = [{  $match: { name: { $regex: query }, isActive: 1 } },
        { $sort: { name: 1 } }]
        return await Company.aggregate(aggregate);
    }
}

module.exports = SearchCompanyService

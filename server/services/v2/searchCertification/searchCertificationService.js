const Certification = require('../../../models/certification.model')


class SearchCertificationService {

    static async searchCertification(req, local) {
        if (!req.query.q) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'Filter'), 400);
        }
        const query = new RegExp(req.query.q, 'i');

        const aggregate = [{  $match: { name: { $regex: query }, active: true } },
        { $sort: { name: 1 } }]
        return await Certification.aggregate(aggregate);
    }
}

module.exports = SearchCertificationService

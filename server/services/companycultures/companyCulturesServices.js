const CompanyCultures = require('../../models/companyCulture.model');

const { EventEmitter } = require('events');

class CompanyCulturesService extends EventEmitter {

    static async companyCultures(req) {
        let result = [];
        const companyCulturesArray = await CompanyCultures.aggregate([
            {
                $group: {
                    _id: null,
                    CompanyCultures: {
                        $push: '$name'
                    }
                }
            }
        ]);
        if (companyCulturesArray.length) {
            result = result.concat(companyCulturesArray[0].CompanyCultures);
        }
        if (req.query.q) {
            const searchQuery = new RegExp(req.query.q, 'i');
            result = result.filter((r) => {
                return searchQuery.test(r);
            });
        }
        return [...new Set(result)].sort((a, b) => {
            return a - b;
        });
    }
}

module.exports = CompanyCulturesService;

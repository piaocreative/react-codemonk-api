const Industries = require('../../models/industry.model');
const { EventEmitter } = require('events');

class IndustriesService extends EventEmitter {

   static async industries(req) {
        let result = [];
        const industriesArray = await Industries.aggregate([
            {
                $group: {
                    _id: null,
                    industries: {
                        $push: '$name'
                    }
                }
            }
        ]);
        if (industriesArray.length) {
            result = result.concat(industriesArray[0].industries);
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

module.exports = IndustriesService;

const Certification = require('../../models/certification.model');
const { EventEmitter } = require('events');

class CertificationsService extends EventEmitter {

    static async certifications(req) {
        let result = [];
        const certificationsArray = await Certification.aggregate([
            {
                $group: {
                    _id: null,
                    certifications: {
                        $push: '$name'
                    }
                }
            }
        ]);
        if (certificationsArray.length) {
            result = result.concat(certificationsArray[0].certifications);
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

module.exports = CertificationsService;

const Timesheet = require('../../../../models/timesheet.model');
const Utils = require('../../../../util/utilFunctions');
const mongoose = require('mongoose');

/**
 * Class represents services for timesheet logs
 */
class LogsService {
    /**
     * @desc This function is being used to get timesheet logs
     * @author CodeMonk
     * @since 03/02/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async logs (req) {
        const timesheetId = req.params.id;

        const options = {
                sort :{createdAt:-1},
            page: Utils.getPageNumber(req.query.page),
            limit: Utils.getLimit(req.query.limit)
        };
        const aggregateParams = [];
        aggregateParams.push({
            $match: { _id: mongoose.Types.ObjectId(timesheetId) }
        });
        aggregateParams.push({ "$unwind" : "$histories"},);

        aggregateParams.push({
            $project: {
               dateStart:'$histories.dateStart',
               status:'$histories.status',
               billId:'$histories.billId',
               createdAt:'$histories.createdAt',
               historyId:'$histories._id',
               _id:0
            }
        });

        const aggregate = Timesheet.aggregate([aggregateParams]);
        return await Timesheet.aggregatePaginate(aggregate, options);
    }

    static getCommonUserSearchAggregateParams (status, isTalent = false, isRecruiter = false, isAmbassador = false) {
        let aggregateParams = [];
        

        aggregateParams.push({
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: ['$histories', '$$ROOT']
                }
            }
        });

       

        return aggregateParams;
    }
}

module.exports = LogsService;

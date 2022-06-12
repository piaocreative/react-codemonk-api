/* eslint-disable no-trailing-spaces */

/**
 * Class represents services for admin edit job post details.
 */

const Talent = require('../../models/talent.model');
const Client = require('../../models/client.model');
const Agency = require('../../models/agency.model');

const Brief = require('../../models/jobPost.model');
const Quote = require('../../models/quote.model');
const moment = require('moment');
const Interview = require('../../models/interview.model');
const Project = require('../../models/project.model');
const { activeUserQuery } = require('../../util/utilFunctions');
const Utils = require('../../util/utilFunctions');

class DashboardService {

    /**
     * @desc This function is being used to get KPIs
     * @author Innovify
     * @since 03/11/2020
     * @param {Object} req Request
     * @param {Object} time time Filter
     */
    static async adminKPIs (req) {
        const time = req.query.time;
        const query = activeUserQuery();
        const aggregateParams = Utils.getCommonUserSearchAggregateParams(false);
        const clientList = await Client.aggregate([...aggregateParams, 
            { $count: 'clients' }
        ]);

        const activeAggregateParams = Utils.getCommonUserSearchAggregateParams('1');
        const activeClientList = await Client.aggregate([...activeAggregateParams, 
            { $count: 'clients' }
        ]);

        const result = {
            agencies: await Agency.countDocuments(),
            activeAgencies: await Agency.countDocuments(query),
            talents: await Talent.countDocuments(),
            activeTalents: await Talent.countDocuments(activeUserQuery(true)),
            clients: clientList[0].clients,
            activeClients: activeClientList[0].clients
        };
        await DashboardService.appKPIS(result, time);
        return result;
    }

    static async appKPIS (result, time) {
        result.briefs = await Brief.count({});
        result.projects = await Project.count({});
        result.interviews = await Interview.count({});
        result.qoutes = await Quote.count({});
        let date;
        switch (time) {
            case 'all':
                result.newBriefs = result.briefs;
                result.newProjects = result.projects;
                result.newInterviews = result.interviews;
                result.newQuote = result.qoutes;
                break;
            case 'today':
                date = moment();
                break;
            case 'week':
                date = moment().subtract(7, 'days');
                break;
            case 'month':
                date = moment().subtract(1, 'months');
                break;
            default:
                break;
        }
        if (date) {
            const query = {
                createdAt: {
                    $gte: date.set({
                        millisecond: 0,
                        hour: 0,
                        minute: 0,
                        second: 0
                    })
                }
            };
            result.newBriefs = await Brief.count(query);
            result.newProjects = await Project.count(query);
            result.newInterviews = await Interview.count(query);
            result.newQuote = await Quote.count(query);
        }
    }
}

module.exports = DashboardService;

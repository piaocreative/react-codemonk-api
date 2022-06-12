const mongoose = require('mongoose');
const got = require('got');
const Project = require('../../models/project.model');
const AddProjectValidator = require('./addProjectValidator');
const Email = require('../../util/sendEmail');
const EngageBay = require('../engageBay/engageBay');
const Utils = require('../../util/utilFunctions');
const CodeMonkError = require('../../util/CodeMonkError');

/**
 * Class represents services for client add project details.
 */
class AddProjectService {

    /**
     * @desc This function is being used to add client project details
     * @author Innovify
     * @since 05/06/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in client user data
     */
    static async addProject (req, user, local) {
        const Validator = new AddProjectValidator(req.body, local);
        Validator.addProject();
        await AddProjectService.checkSameProjectExisted(user._id, req.body.name, local);
        const name = req.body.name;
        const description = req.body.description;
        const buildStatus = req.body.buildStatus;
        const url = (req.body.projectUrl) ? req.body.projectUrl : undefined;
        const design = (req.body.lookingForDesign) ? req.body.lookingForDesign : undefined;
        const softwareDevelopment = (req.body.lookingForSoftwareDevelopment) ? req.body.lookingForSoftwareDevelopment : undefined;
        const developmentTeam = (req.body.lookingForDevelopmentTeam) ? req.body.lookingForDevelopmentTeam : undefined;
        const dataAiMl = (req.body.lookingForDataAiMl) ? req.body.lookingForDataAiMl : undefined;
        const isGrowthHacking = (typeof req.body.lookingForGrowthHacking !== 'undefined') ? req.body.lookingForGrowthHacking : false;
        const isAgileCoach = (typeof req.body.lookingForAgileCoach !== 'undefined') ? req.body.lookingForAgileCoach : false;
        const other = (req.body.lookingForOther) ? req.body.lookingForOther : undefined;
        const budget = req.body.budget;
        const messageToPreSales = req.body.messageToPreSales;
        const speed = req.body.speed;
        const teamManageType = req.body.teamManageType;
        const project = {
            clientId: mongoose.Types.ObjectId(user._id),
            status: 0,
            name,
            description,
            buildStatus,
            url,
            lookingFor: {
                design,
                softwareDevelopment,
                developmentTeam,
                dataAiMl,
                isGrowthHacking,
                isAgileCoach,
                other
            },
            budget: budget,
            messageToPreSales: messageToPreSales,
            speed: speed,
            teamManageType: teamManageType
        };
        await Project.create(project);
        AddProjectService.projectDetailsSendToSales(project, user);
    }

    /**
     * @desc This function is being used to send project details to sale team email and engagebay
     * @author Innovify
     * @since 23/09/2020
     * @param {Object} project project details
     * @param {Object} user client details
     */
    static async projectDetailsSendToSales (project, user) {
        const html = await Utils.perpareProjectTemplate(project);
        const buffer = await Utils.createPDF(html);
        AddProjectService.sendDealEmailToSales(project, user, buffer);
        if (process.env.NODE_ENV !== 'testing') {
            AddProjectService.creatDealAtEngageBay(project, user);
        }
    }

    /**
     * @desc This function is being used to check that same project is existing for same client
     * @author Innovify
     * @since 18/09/2020
     * @param {strong} userId client id
     * @param {Object} name name of the project
     */
    static async checkSameProjectExisted (userId, name, local) {
        const isProjectExists = await Project.findOne({
            clientId: userId,
            name
        });

        if (isProjectExists) {
            throw new CodeMonkError(local('PROJECT_EXISTS_CLIENT'), 400);
        }
    }

    /**
     * @desc This function is being used send email to sale team
     * @author Innovify
     * @since 18/09/2020
     * @param {Object} project project details
     * @param {Object} user client details
     */
    static async sendDealEmailToSales (project, user, buffer) {
        const templateVariables = {
            projectName: project.name,
            clientName: `${user.firstName} ${user.lastName}`,
            projectUrl: process.env.ENGAGEBAY_DEAL_URL
        };
        const attachments = [{
            filename: `${project.name}.pdf`,
            content: buffer,
            contentType: 'application/pdf'
        }];
        const subject = 'You have a new project request on CodeMonk';
        const template = 'emailTemplates/projectInquiry.html';
        await Email.prepareAndSendEmailWithAttachment(CONSTANTS.PROJECT.TEAM_SALES[process.env.NODE_ENV],
            subject, template, templateVariables, attachments);
    }

    /**
     * @desc This function is being used to generare a deal for sale team on engagebay
     * @author Innovify
     * @since 18/09/2020
     * @param {Object} project project details
     * @param {Object} user client details
     */
    static async creatDealAtEngageBay (project, user) {
        const contact = await EngageBay.getEngageBayContact(user.email);
        await AddProjectService.createEngageBayDeal(contact[0].id, project.name, project.budget);
    }

    /**
     * @desc This function is being used to create deal for sale team on engagebay
     * @author Innovify
     * @since 18/09/2020
     * @param {String} contactId Engagebay contant id number
     * @param {String} name Name of deal
     * @param {String} budget choosen string
     */
    static async createEngageBayDeal (contactId, name, budget) {
        const deal = {
            name: name,
            amount: AddProjectService.getMinimumAmount(budget),
            track_name: 'Default',
            milestoneLabelName: 'New',
            currency_type: 'USD-$',
            contact_ids: [contactId]
        };

        const { body } = await got.post(CONSTANTS.ENGAGEBAY.DEAL_URL, {
            json: deal,
            headers: {
                Authorization: process.env.ENGAGEBAY_KEY,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            responseType: 'json'
        });

        return body;
    }

    /**
     * @desc This function is being used to get minimum amount from budet option
     * @author Innovify
     * @since 18/09/2020
     * @param {STring} budget choosed budget option
     */
    static getMinimumAmount (budget) {
        let amount = 0;
        switch (budget) {
            case '<$50K':
                amount = 10;
                break;
            case '$50k-$150k':
                amount = 50;
                break;
            case '$150k-$500k':
                amount = 150;
                break;
            case '$500k+':
                amount = 500;
                break;
        }
        return amount;
    }

    /**
     * Find project with name if it's not exist then this function will add new project
     * @param {string} clientId Client Id
     * @param {string} name Project Name
     * @param {string} description Project Description
     * @returns projectId
     */
    static async findOrCreateProjectByName (clientId, name, description = '') {
        const isId = AddProjectService.isValidObjectId(name);
        const existingProject = await Project.findOne({
            [isId ? '_id' : 'name']: name
        }, {
            _id: 1
        });
        if (existingProject) {
            return existingProject._id;
        } else {
            const project = await Project.create({
                clientId,
                name,
                description
            });
            return project._id;
        }
    }

    static async findOrCreateProjectByNameAndClient (clientId, name, description = '') {
        const isId = AddProjectService.isValidObjectId(name);
        const existingProject = await Project.findOne({
            [isId ? '_id' : 'name']: name,
            clientId
        }, {
            _id: 1
        });
        if (existingProject) {
            return existingProject._id;
        } else {
            const project = await Project.create({
                clientId,
                name,
                description
            });
            return project._id;
        }
    }

    static isValidObjectId (id) {
        if (mongoose.Types.ObjectId.isValid(id)) {
            if ((String)(new mongoose.Types.ObjectId(id)) === id)
                return true;
            return false;
        }
        return false;
    }
}

module.exports = AddProjectService;

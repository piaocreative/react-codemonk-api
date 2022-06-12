const fs = require('fs');
const mongoose = require('mongoose');
const Quote = require('../../models/quote.model');
const QuoteApplication = require('../../models/quoteApplication.model');
const Project = require('../../models/project.model');
const SubmitQuoteValidator = require('./submitQuoteValidator');
const UploadService = require('../../util/uploadService');
const Email = require('../../util/sendEmail');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents services for admin submit a quote by admin.
 */
class SubmitQuoteService {

    /**
     * @desc This function is being used to submit a quote by agency
     * @author Innovify
     * @since 09/11/2020
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {object} user Logged in admin user data
     */
    static async submitQuote (req, user, local) {
        const Validator = new SubmitQuoteValidator(req.body, local);
        await Validator.submitQuote();
        const projectPlanFile = req.files.projectPlan;
        const effrotsBreakdownFile = req.files.effrotsBreakdown;

        Validator.checkSubmitQuoteFileSize(projectPlanFile[0].size);
        Validator.checkSubmitQuoteFileSize(effrotsBreakdownFile[0].size);
        const quoteId = mongoose.Types.ObjectId(req.body.quoteId);
        const projectId = mongoose.Types.ObjectId(req.body.projectId);

        const project = await Project.findOne({ _id: projectId }, { name: 1 }).lean();

        if (!project) {
            throw new CodeMonkError(local('FIELD_NOT_VALID', 'Project'), 400);
        }

        const projectPlanFileName = projectPlanFile[0].originalname;
        const projectPlanFilePath = `${process.env.NODE_ENV}-quote-application/${quoteId}-project-plan/${projectPlanFileName}`;
        const projectPlanUrl = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${projectPlanFilePath}`;
        await UploadService.uploadFileFromFile(projectPlanFile[0], projectPlanFilePath);

        const effrotsBreakdownFileName = effrotsBreakdownFile[0].originalname;
        const effrotsBreakdownFilePath = `${process.env.NODE_ENV}-quote-application/${quoteId}-efforts/${effrotsBreakdownFileName}`;
        const effrotsBreakdownUrl = `${CONSTANTS.AWS_S3_URL}${CONSTANTS.AWS_S3_PUBLIC_BUCKET}/${effrotsBreakdownFilePath}`;
        await UploadService.uploadFileFromFile(effrotsBreakdownFile[0], effrotsBreakdownFilePath);

        await Quote.updateOne({
            _id: quoteId
        }, {
            $addToSet: {
                agencies: {
                    agencyId: user._id,
                    status: 1
                }
            }
        });

        const agencyQuote = {
            quoteId,
            projectId,
            assumptions: req.body.assumptions,
            outOfScope: req.body.outOfScope,
            teamStructure: req.body.teamStructure,
            totalCost: req.body.totalCost,
            otherInfo: req.body.otherInfo,
            projectPlan: projectPlanUrl,
            efforts: effrotsBreakdownUrl,
            status: 1
        };
        await QuoteApplication.create(agencyQuote);
        const html = await Utils.perpareQuoteTemplate(agencyQuote, project.name);
        const pdfBuffer = await Utils.createPDF(html);
        SubmitQuoteService.sendQuoteSumitEmailToSales(project, user, projectPlanFile, effrotsBreakdownFile, pdfBuffer);
    }

    /**
     * @desc This function is being used send email to sale team
     * @author Innovify
     * @since 10/11/2020
     * @param {Object} project project details
     * @param {Object} user client details
     */
    static async sendQuoteSumitEmailToSales (project, user, projectPlanFile, effrotsBreakdownFile, infoPdf) {
        const projectName = project.name;
        const agencyName = `${user.firstName} ${user.lastName}`;
        const templateVariables = {
            projectName,
            agencyName,
            quoteUrl: 1
        };

        const attachments = [{
            filename: `${project.name}.pdf`,
            content: infoPdf,
            contentType: 'application/pdf'
        },
        {
            filename: projectPlanFile[0].originalname,
            content: fs.readFileSync(projectPlanFile[0].path),
            contentType: projectPlanFile[0].mimetype
        },
        {
            filename: effrotsBreakdownFile[0].originalname,
            content: fs.readFileSync(effrotsBreakdownFile[0].path),
            contentType: effrotsBreakdownFile[0].mimetype
        }];

        const subject = `Quote received from ${agencyName} for ${project.name}`;
        const template = 'emailTemplates/quoteSubmit.html';
        await Email.prepareAndSendEmailWithAttachment(CONSTANTS.PROJECT.TEAM_SALES[process.env.NODE_ENV],
            subject, template, templateVariables, attachments);
    }
}

module.exports = SubmitQuoteService;

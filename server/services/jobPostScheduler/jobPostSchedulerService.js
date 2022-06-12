const JobPost = require("../../models/jobPost.model");
const Client = require('../../models/client.model');
const User = require('../../models/user.model');
const Project = require('../../models/project.model');
const Email = require('../../util/sendEmail');
const { BRIEF :{ TALENT : {STATUS : {HIRED, REJECTED}}} } = require('../../util/constants');

module.exports = async function () {
  try {
    const todayDate = Date.now();
    JobPost.updateMany(
      {
        createdAt: { $lt: new Date().setDate(new Date().getDate() - 60) },
        isArchived: false
      },
      { isArchived: true, archivedDate: todayDate }, { new: true },
      async function (err, docs) {
        if (err) {
          CONSOLE_LOGGER.error(err);
        } else {
          const jobPosts = await JobPost.find({ isArchived: true, archivedDate: todayDate },
            { name: 1, applications: 1, clientId: 1, projectId:1 });
          jobPosts.forEach(async function (jobPost) {
            const client = await Client.findOne({ userId: jobPost.clientId });
            let companyName = "";
            if (client) {
              if (client.billing && client.billing.companyDetails && client.billing.companyDetails.name) {
                companyName = client.billing.companyDetails.name;
              }
              const jobTitle = jobPost.name;
              if (jobPost.applications.length > 0) {
                for (let i = 0; i < jobPost.applications.length; i++) {
                    if (![HIRED, REJECTED].includes(jobPost.applications[i].status)) {
                    const talentId = jobPost.applications[i].talentId;
                    const talent = await User.findById(talentId, ['firstName', 'email']);
                    const firstName = `${talent.firstName}`;
                    const subject = `You have not been selected for ${jobTitle} role at ${companyName}`;
                    const template = 'emailTemplates/talentRejected.html';
                    const appUrl = process.env.FRONTEND_URL + '/talent';
                    const templateVariables = {
                      appUrl,
                      firstName,
                      jobTitle,
                      companyName,
                      actionUrl: appUrl + '/job-briefs'
                    };
                    await Email.prepareAndSendEmail([talent.email], subject, template, templateVariables);
                  }
                }
              }
            }
          })
        }
      }
    );


  } catch (error) {
    CONSOLE_LOGGER.error(error);
  }
};

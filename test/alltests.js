const dotenv = require('dotenv');
const env = process.env.NODE_ENV || 'testing';
dotenv.config({ path: process.env.PWD + '/' + env + '.env' });
global.logger = require('../server/util/logger');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
chai.use(chaiHttp);
const request = require('supertest');
request(app);

// Start testing
require('./init.test');

// Auth
require('../server/services/signup/test/signup.test');
require('../server/services/signin/test/signin.test');
require('../server/services/forgotPasswordDetails/test/forgotPassword.test');
require('../server/services/unregisteredUser/test/unregisteredUser.test');

// User
require('../server/services/userProfile/test/userProfile.test');
require('../server/services/userDocuments/test/userDocuments.test');
require('../server/services/changeEmailRequest/test/changeEmailRequest.test');
require('../server/services/resendOTPChangeEmailRequest/test/resendOTPChangeEmailRequest.test');
require('../server/services/changeEmail/test/changeEmail.test');

// Talent
require('../server/services/talentRegisterType/test/talentRegisterType.test');
require('../server/services/talentSaveLater/test/talentSaveLater.test.js');
require('../server/services/talentBasicProfile/test/talentBasicProfile.test');
require('../server/services/talentProfessionalDetails/test/talentProfessionalProfile.test');
require('../server/services/talentProjectDetails/test/talentProjectDetails.test');
require('../server/services/talentWorkExperienceDetails/test/talentWorkExperienceDetails.test');
require('../server/services/talentEducationDetails/test/talentEducationDetails.test');
require('../server/services/talentPreferenceDetails/test/talentPreferenceDetails.test');
require('../server/services/talentPayDetails/test/talentPayDetails.test.js');
require('../server/services/talentDashboard/test/talentDashboard');
require('../server/services/talentProjectList/test/talentProjectList.test');
require('../server/services/talentEditDetails/test/talentEditDetails.test');
require('../server/services/talentUploadCV/test/talentUploadCV.test');
require('../server/services/talentList/test/talentList.test');
require('../server/services/talentStatusChange/test/talentStatusChange.test');
require('../server/services/skills/test/skill.test');
require('../server/services/certifications/test/certifications.test');
require('../server/services/industries/test/industries.test');
require('../server/services/companycultures/test/companycultures.test');

// Job Posts
require('../server/services/addJobPost/test/addJobPost.test');
require('../server/services/editJobPost/test/editJobPost.test');
require('../server/services/jobPostDetails/test/jobPostDetails.test');
require('../server/services/jobPostApply/test/jobPostapply.test');
require('../server/services/jobPostList/test/jobPostList.test');
require('../server/services/addJobPostBasicDetails/test/addJobPostBasicDetails.test');
require('../server/services/addJobPostPreferredCandidates/test/addJobPostPreferredCandidates.test');
require('../server/services/editJobPostBasicDetails/test/editJobPostBasicDetails.test');
require('../server/services/editJobPostPreferredCandidates/test/editJobPostPreferredCandidates.test');

// Quotes
require('../server/services/addQuote/test/addQuote.test');
require('../server/services/editQuote/test/editQuote.test');
require('../server/services/quoteList/test/quoteList.test');
require('../server/services/quoteDetails/test/quoteDetails.test');
require('../server/services/submitQuote/test/submitQuote.test');

// Client
require('../server/services/clientProfile/test/clientSignUp.test');
// require('../server/services/clientProfile/test/clientBasicProfile.test');  // old version
require('../server/services/talentSearch/test/talentSearch.test');
require('../server/services/talentDetails/test/talentDetails.test');
require('../server/services/clientAddInterviewSchedule/test/clientAddInterviewSchedule.test');
require('../server/services/clientProjectSearchByName/test/clientProjectSearchByName.test');
require('../server/services/clientProjectList/test/clientProjectList.test');
require('../server/services/clientInterviewList/test/clientInterviewtList.test');
require('../server/services/clientTalentList/test/clientTalentList.test');
require('../server/services/clientProjectsCount/test/clientProjectsCount.test');
require('../server/services/clientTalentsCount/test/clientTalentsCount.test');
require('../server/services/clientTalentsRoleWiseCount/test/clientTalentsRoleWiseCount.test');
require('../server/services/clientDetails/test/clientDetails.test');

// Project
require('../server/services/addProject/test/addProject.test');
require('../server/services/editProject/test/editProject.test');
require('../server/services/projectDetails/test/projectDetails.test');
require('../server/services/projectStatusChange/test/projectStatusChange.test');
require('../server/services/talentStatusChangeForProject/test/talentStatusChangeForProject.test');

// Agency
require('../server/services/agencySaveLater/test/agencySaveLater.test');
require('../server/services/agencyProfile/test/agencyProfile.test');
require('../server/services/agencyCertificateDetails/test/agencyCertificateDetails.test');
require('../server/services/agencyPayDetails/test/agencyPayDetails.test');
require('../server/services/agencyAddDirectors/test/agencyAddDirectors.test');
require('../server/services/agencyDocuments/test/agencyDocuments.test');
require('../server/services/agencyCreateTalents/test/agencyCreateTalents.test');
require('../server/services/agencyEditTalent/test/agencyEditTalent.test');
require('../server/services/agencyDeleteTalent/test/agencyDeleteTalent.test');
require('../server/services/agencyUploadTalents/test/agencyUploadTalents.test');
require('../server/services/agencyAddTalents/test/agencyAddTalents.test');

require('../server/services/agencyTalentList/test/agencyTalentList.test');
require('../server/services/agencyList/test/agencyList.test');
require('../server/services/agencyCertificateEdit/test/agencyCertificateEdit.test');
require('../server/services/agencyCredentialsEdit/test/agencyCredentialsEdit.test');
require('../server/services/agencyProjectList/test/agencyProjectList.test');
require('../server/services/agencyProjectsCount/test/agencyProjectsCount.test');
require('../server/services/agencyTalentsCount/test/agencyTalentsCount.test');
require('../server/services/agencyTalentsRoleWiseCount/test/agencyTalentsRoleWiseCount.test');
require('../server/services/agencyDetails/test/agencyDetails.test');
require('../server/services/agencyStatusChange/test/agencyStatusChange.test');

// Admin
require('../server/services/clientList/test/clientList.test');
require('../server/services/projectList/test/projectList.test');
require('../server/services/clientSearchByName/test/clientSearchByName.test');
require('../server/services/talentSearchByName/test/talentSearchByName.test');
require('../server/services/addProjectByAdmin/test/addProjectByAdmin.test');
require('../server/services/addTalentToProjectByAdmin/test/addTalentToProjectByAdmin.test');
require('../server/services/adminInterviewList/test/adminInterviewtList.test');
require('../server/services/adminInterviewChangeStatus/test/adminInterviewChangeStatus.test');
require('../server/services/adminInterviewChangeTalentStatus/test/adminInterviewChangeTalentStatus.test');
require('../server/services/clientStatusChange/test/clientStatusChange.test');
require('../server/services/proxyLogin/test/proxyLogin.test');
require('../server/services/dashboard/test/dashboard.test');

// Interview
require('../server/services/interviewDetails/test/interviewDetails.test');

// Other
require('../server/services/getTalentRolesCount/test/getTalentRolesCount.test');
require('../server/services/addNewsLetterSubscription/test/addNewsLetterSubscription.test');
require('../server/services/featureJobPosts/test/featureJobPosts.test');
require('../server/services/featureTalents/test/featureTalents.test');
require('../server/services/talentCountryWise/test/talentCountryWise.test');

// Timesheet
require('../server/services/timesheet/test/timesheet.test');
require('../server/services/addTimesheet/test/addTimesheet.test');
require('../server/services/v1/timesheet/timesheetLogs/test/logs.test');

// Notification
require('../server/services/addNotification/test/addNotification.test');
require('../server/services/notificationList/test/notificationList.test');
require('../server/services/readNotification/test/readNotification.test');

// sharing
require('../server/services/sharing/test/sharing.test');

// Version 2(v2)

// Auth
require('../server/services/v2/signupTalent/test/signupTalent.test');

// Talent
require('../server/services/v2/talentUploadCV/test/talentUploadCV.test');
require('../server/services/v2/talentSaveLater/test/talentSaveLater.test');
require('../server/services/talentAboutYou/test/talentAboutYou.test');
require('../server/services/v2/talentEducationDetails/test/talentEducationDetails.test');
require('../server/services/v2/talentCertificationDetails/test/talentCertificationDetails.test');
require('../server/services/v2/talentWorkExperienceDetails/test/talentWorkExperienceDetails.test');
require('../server/services/v2/talentProjectDetails/test/talentProjectDetails.test');
require('../server/services/v2/talentPreferenceDetails/test/talentPreferenceDetails.test');
require('../server/services/v2/talentPayDetails/test/talentPayDetails.test.js');
require('../server/services/v2/talentUploadDocuments/test/talentUploadDocuments.test');


// Job Posts
require('../server/services/v2/jobPostManagement/test/jobPost.test');
require('../server/services/v2/jobPostApply/test/jobPostapply.test');
require('../server/services/v2/addJobPostRole/test/addJobPostRole.test');
require('../server/services/v2/addJobPostPreferredCandidates/test/addJobPostPreferredCandidates.test');
require('../server/services/v2/addJobPostEngagement/test/addJobPostEngagement.test');
require('../server/services/v2/editJobPostRole/test/editJobPostRole.test');
require('../server/services/v2/editJobPostPreferredCandidates/test/editJobPostPreferredCandidates.test');
require('../server/services/v2/editJobPostEngagement/test/editJobPostEngagement.test');
require('../server/services/v2/jobPost/talentStatusChange/test/talentStatusChange.test');
require('../server/services/v2/jobPost/talentStatusAdd/test/talentStatusAdd.test');

// Project
require('../server/services/v2/projectDetails/test/projectDetails.test');



require('../server/services/v2/downloadTalentDocs/test/downloadTalentDocs.test');
require('../server/services/v2/verifyTalentProfile/test/verifyTalentProfile.test');


// Recruiter
require('../server/services/v2/signupRecruiter/test/signupRecruiter.test');
require('../server/services/v2/recruiter/recruiterProfile/test/recruiterProfile.test');
require('../server/services/v2/recruiter/recruiterDashboard/test/recruiterDashboard.test');
// // Job Posts
require('../server/services/v2/recruiter/jobPostList/test/jobPostList.test');
require('../server/services/v2/recruiter/jobPostDetails/test/jobPostDetails.test');

require('../server/services/v2/recruiter/recruiterDetails/test/recruiterDetails.test');
require('../server/services/v2/recruiter/recruiterList/test/recruiterList.test');
require('../server/services/v2/recruiter/recruiterStatusChange/test/recruiterStatusChange.test');

//HubSpot
require('../server/services/hubSpot/test/hubSpot.test');


// Ambassador
require('../server/services/v2/ambassador/dashboard/test/dashboard.test');
require('../server/services/v2/ambassador/details/test/details.test');
require('../server/services/v2/ambassador/list/test/list.test');
require('../server/services/v2/ambassador/statusChange/test/statusChange.test');

//Ambassador
require('../server/services/ambassador/signUp/test/ambassadorSignUp.test');
require('../server/services/ambassador/profile/test/profile.test');

// End Testing
require('./end.test');

describe('Stop server in end', () => {
    it('Server should stop manually to get code coverage', done => {
        app.close();
        done();
    });
});

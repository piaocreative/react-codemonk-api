const swaggerUi = require('swagger-ui-express');
let swaggerJson = require('../public/swagger.json');

// Auth
swaggerJson = require('../services/signup/signUpSwagger')(swaggerJson);
swaggerJson = require('../services/signin/signInSwagger')(swaggerJson);
swaggerJson = require('../services/forgotPasswordDetails/forgotPasswordSwagger')(swaggerJson);
swaggerJson = require('../services/unregisteredUser/unregisteredUserSwagger')(swaggerJson);
swaggerJson = require('../services/ambassador/signUp/amassadorSignUpSwagger')(swaggerJson);

// User
swaggerJson = require('../services/userProfile/userProfileSwagger')(swaggerJson);
swaggerJson = require('../services/userDocuments/userDocumentsSwagger')(swaggerJson);
swaggerJson = require('../services/changeEmailRequest/changeEmailRequestSwagger')(swaggerJson);
swaggerJson = require('../services/resendOTPChangeEmailRequest/resendOTPChangeEmailRequestSwagger')(swaggerJson);
swaggerJson = require('../services/changeEmail/changeEmailSwagger')(swaggerJson);

// Talent
swaggerJson = require('../services/talentRegisterType/talentRegisterTypeSwagger')(swaggerJson);
swaggerJson = require('../services/talentBasicProfile/talentBasicProfileSwagger')(swaggerJson);
swaggerJson = require('../services/talentProfessionalDetails/talentProfessionalProfileSwagger')(swaggerJson);
swaggerJson = require('../services/talentProjectDetails/talentProjectDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/talentEducationDetails/talentEducationDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/talentPreferenceDetails/talentPreferenceDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/talentPayDetails/talentPayDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/talentWorkExperienceDetails/talentWorkExperienceDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/talentSaveLater/talentSaveLaterSwagger')(swaggerJson);
swaggerJson = require('../services/talentEditDetails/talentEditDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/talentDashboard/talentDashboardSwagger')(swaggerJson);
swaggerJson = require('../services/talentProjectList/talentProjectListSwagger')(swaggerJson);
swaggerJson = require('../services/talentUploadCV/talentUploadCVSwagger')(swaggerJson);
swaggerJson = require('../services/talentList/talentListSwagger')(swaggerJson);
swaggerJson = require('../services/talentSearch/talentSearchSwagger')(swaggerJson);
swaggerJson = require('../services/talentStatusChange/talentStatusChangeSwagger')(swaggerJson);
swaggerJson = require('../services/skills/skillsSwagger')(swaggerJson);
swaggerJson = require('../services/industries/industriesSwagger')(swaggerJson);

swaggerJson = require('../services/companycultures/companyCulturesSwagger')(swaggerJson);
swaggerJson = require('../services/certifications/certificationsSwagger')(swaggerJson);

// Job Post
swaggerJson = require('../services/jobPostList/jobPostListSwagger')(swaggerJson);
swaggerJson = require('../services/jobPostDetails/jobPostDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/jobPostApply/jobPostApplySwagger')(swaggerJson);
swaggerJson = require('../services/addJobPostBasicDetails/addJobPostBasicDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/addJobPostPreferredCandidates/addJobPostPreferredCandidatesSwagger')(swaggerJson);
swaggerJson = require('../services/editJobPostBasicDetails/editJobPostBasicDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/editJobPostPreferredCandidates/editJobPostPreferredCandidatesSwagger')(swaggerJson);

// Quote
swaggerJson = require('../services/addQuote/addQuoteSwagger')(swaggerJson);
swaggerJson = require('../services/quoteList/quoteListSwagger')(swaggerJson);
swaggerJson = require('../services/quoteDetails/quoteDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/submitQuote/submitQuoteSwagger')(swaggerJson);

// Client
swaggerJson = require('../services/clientProfile/clientProfileSwagger')(swaggerJson);
swaggerJson = require('../services/talentDetails/talentDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/clientAddInterviewSchedule/clientAddInterviewScheduleSwagger')(swaggerJson);
swaggerJson = require('../services/clientProjectSearchByName/clientProjectSearchByNameSwagger')(swaggerJson);
swaggerJson = require('../services/clientProjectList/clientProjectListSwagger')(swaggerJson);
swaggerJson = require('../services/clientInterviewList/clientInterviewListSwagger')(swaggerJson);
swaggerJson = require('../services/clientTalentList/clientTalentListSwagger')(swaggerJson);
swaggerJson = require('../services/addNewsLetterSubscription/addNewsLetterSubscriptionSwagger')(swaggerJson);
swaggerJson = require('../services/clientProjectsCount/clientProjectsCountSwagger')(swaggerJson);
swaggerJson = require('../services/clientTalentsCount/clientTalentsCountSwagger')(swaggerJson);
swaggerJson = require('../services/clientTalentsRoleWiseCount/clientTalentsRoleWiseCountSwagger')(swaggerJson);
swaggerJson = require('../services/clientStatusChange/clientStatusChangeSwagger')(swaggerJson);
swaggerJson = require('../services/clientDetails/clientDetailsSwagger')(swaggerJson);

// Project
swaggerJson = require('../services/addProject/addProjectSwagger')(swaggerJson);
swaggerJson = require('../services/projectDetails/projectDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/addJobPost/addJobPostSwagger')(swaggerJson);

// Aency
swaggerJson = require('../services/agencySaveLater/agencySaveLaterSwagger')(swaggerJson);
swaggerJson = require('../services/agencyProfile/agencyProfileSwagger')(swaggerJson);
swaggerJson = require('../services/agencyAddTalents/agencyAddTalentsSwagger')(swaggerJson);
swaggerJson = require('../services/agencyCertificateDetails/agencyCertificateDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/agencyPayDetails/agencyPayDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/agencyAddDirectors/agencyAddDirectorsSwagger')(swaggerJson);
swaggerJson = require('../services/agencyDocuments/agencyDocumentsSwagger')(swaggerJson);
swaggerJson = require('../services/agencyCreateTalents/agencyCreateTalentsSwagger')(swaggerJson);
swaggerJson = require('../services/agencyTalentList/agencyTalentListSwagger')(swaggerJson);
swaggerJson = require('../services/agencyCertificateEdit/agencyCertificateEditSwagger')(swaggerJson);
swaggerJson = require('../services/agencyCredentialsEdit/agencyCredentialsEditSwagger')(swaggerJson);
swaggerJson = require('../services/agencyProjectList/agencyProjectListSwagger')(swaggerJson);
swaggerJson = require('../services/agencyProjectsCount/agencyProjectsCountSwagger')(swaggerJson);
swaggerJson = require('../services/agencyTalentsCount/agencyTalentsCountSwagger')(swaggerJson);
swaggerJson = require('../services/agencyTalentsRoleWiseCount/agencyTalentsRoleWiseCountSwagger')(swaggerJson);
swaggerJson = require('../services/agencyDetails/agencyDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/agencyList/agencyListSwagger')(swaggerJson);
swaggerJson = require('../services/agencyStatusChange/agencyStatusChangeSwagger')(swaggerJson);

// Admin
swaggerJson = require('../services/clientList/clientListSwagger')(swaggerJson);
swaggerJson = require('../services/projectList/projectListSwagger')(swaggerJson);
swaggerJson = require('../services/clientSearchByName/clientSearchByNameSwagger')(swaggerJson);
swaggerJson = require('../services/talentSearchByName/talentSearchByNameSwagger')(swaggerJson);
swaggerJson = require('../services/addProjectByAdmin/addProjectByAdminSwagger')(swaggerJson);
swaggerJson = require('../services/addTalentToProjectByAdmin/addTalentToProjectByAdminSwagger')(swaggerJson);
swaggerJson = require('../services/projectStatusChange/projectStatusChangeSwagger')(swaggerJson);
swaggerJson = require('../services/talentStatusChangeForProject/talentStatusChangeForProjectSwagger')(swaggerJson);
swaggerJson = require('../services/adminInterviewList/adminInterviewListSwagger')(swaggerJson);
swaggerJson = require('../services/adminInterviewChangeStatus/adminInterviewChangeStatusSwagger')(swaggerJson);
swaggerJson = require('../services/adminInterviewChangeTalentStatus/adminInterviewChangeTalentStatusSwagger')(swaggerJson);
swaggerJson = require('../services/proxyLogin/proxyLoginSwagger')(swaggerJson);
swaggerJson = require('../services/dashboard/dashboardSwagger')(swaggerJson);

// Interview
swaggerJson = require('../services/interviewDetails/interviewDetailsSwagger')(swaggerJson);

// Other
swaggerJson = require('../services/getTalentRolesCount/getTalentRolesCountSwagger')(swaggerJson);
swaggerJson = require('../services/talentCountryWise/talentCountryWiseSwagger')(swaggerJson);
swaggerJson = require('../services/featureJobPosts/featureJobPostsSwagger')(swaggerJson);
swaggerJson = require('../services/featureTalents/featureTalentsSwagger')(swaggerJson);

// Timesheet
swaggerJson = require('../services/timesheet/timesheet.swagger')(swaggerJson);
swaggerJson = require('../services/addTimesheet/addTimesheet.swagger')(swaggerJson);
swaggerJson = require('../services/downloadBill/downloadBill.swagger')(swaggerJson);
swaggerJson = require('../services/v1/timesheet/timesheetLogs/logsSwagger')(swaggerJson);

// Notification
swaggerJson = require('../services/addNotification/addNotificationSwagger')(swaggerJson);
swaggerJson = require('../services/notificationList/notificationListSwagger')(swaggerJson);
swaggerJson = require('../services/readNotification/readNotificationSwagger')(swaggerJson);


// Algo Server
swaggerJson = require('../services/algoProxyServer/algoProxyServerSwaggers/testUrlSwagger')(swaggerJson);
swaggerJson = require('../services/algoProxyServer/algoProxyServerSwagger')(swaggerJson);
swaggerJson = require('../services/algoProxyServer/algoProxyServerSwaggers/getRecCandidatesFromJobIdSwagger')(swaggerJson);
swaggerJson = require('../services/algoProxyServer/algoProxyServerSwaggers/getRecJobsFromTalentIdSwagger')(swaggerJson);

// Tests
swaggerJson = require('../services/EnlistTestsForTalent/enlistTestForTalentSwagger')(swaggerJson);
swaggerJson = require('../services/startTestsForTalent/startTestForTalentSwagger')(swaggerJson);
swaggerJson = require('../services/extractTalentTestResult/extractTalentTestResultSwagger')(swaggerJson);
swaggerJson = require('../services/callbackOfTestFortalent/callbackOfTestForTalentSwagger')(swaggerJson);



// Version 2


// Auth
swaggerJson = require('../services/v2/signupTalent/signUpTalentSwagger')(swaggerJson);
swaggerJson = require('../services/v2/signupRecruiter/signUpRecruiterSwagger')(swaggerJson);

// Talent sign up
swaggerJson = require('../services/talentAboutYou/talentAboutYouSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentEducationDetail/talentEducationDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentWorkExperienceDetail/talentWorkExperienceDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentProjectDetail/talentProjectDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentCertificationDetails/talentCertificationDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentEducationDetails/talentEducationDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentWorkExperienceDetails/talentWorkExperienceDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentProjectDetails/talentProjectDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentSaveLater/talentSaveLaterSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentUploadCV/talentUploadCVSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentPreferenceDetails/talentPreferenceDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentPayDetails/talentPayDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/talentUploadDocuments/talentUploadDocumentsSwagger')(swaggerJson);


// Configuration
// Company
swaggerJson = require('../services/searchCompany/searchCompanySwagger')(swaggerJson);
swaggerJson = require('../services/v2/searchCertification/searchCertificationSwagger')(swaggerJson);


// Job Post
swaggerJson = require('../services/v2/jobPostApply/jobPostApplySwagger')(swaggerJson);
swaggerJson = require('../services/v2/addJobPostRole/addJobPostRoleSwagger')(swaggerJson);
swaggerJson = require('../services/v2/addJobPostPreferredCandidates/addJobPostPreferredCandidatesSwagger')(swaggerJson);
swaggerJson = require('../services/v2/addJobPostEngagement/addJobPostEngagementSwagger')(swaggerJson);
swaggerJson = require('../services/v2/editJobPostRole/editJobPostRoleSwagger')(swaggerJson);
swaggerJson = require('../services/v2/editJobPostPreferredCandidates/editJobPostPreferredCandidatesSwagger')(swaggerJson);
swaggerJson = require('../services/v2/editJobPostEngagement/editJobPostEngagementSwagger')(swaggerJson);
swaggerJson = require('../services/v2/jobPost/talentStatusChange/talentStatusChangeSwagger')(swaggerJson);
swaggerJson = require('../services/v2/jobPost/talentStatusAdd/talentStatusAddSwagger')(swaggerJson);
swaggerJson = require('../services/v2/jobPostManagement/jobPostSwagger')(swaggerJson);

// Project
swaggerJson = require('../services/v2/projectDetails/projectDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/userProfile/userProfileSwagger')(swaggerJson);


swaggerJson = require('../services/sendJobPostNotification/sendJobPostNotificationSwagger')(swaggerJson);
swaggerJson = require('../services/v2/referralList/referralListSwagger')(swaggerJson);
swaggerJson = require('../services/v2/verifyTalentProfile/verifyTalentProfileSwagger')(swaggerJson);


swaggerJson = require('../services/v2/downloadTalentDocs/downloadTalentDocsSwagger')(swaggerJson);

// Recruiter
// Job Post(v2)
swaggerJson = require('../services/v2/recruiter/jobPostList/jobPostListSwagger')(swaggerJson);
swaggerJson = require('../services/v2/recruiter/jobPostDetails/jobPostDetailsSwagger')(swaggerJson);

swaggerJson = require('../services/v2/recruiter/recruiterDetails/recruiterDetailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/recruiter/recruiterList/recruiterListSwagger')(swaggerJson);
swaggerJson = require('../services/v2/recruiter/recruiterStatusChange/recruiterStatusChangeSwagger')(swaggerJson);

swaggerJson = require('../services/v2/recruiter/recruiterProfile/recruiterProfileSwaggers/aboutYouSwagger')(swaggerJson);
swaggerJson = require('../services/v2/recruiter/recruiterProfile/recruiterProfileSwaggers/aboutCompanySwagger')(swaggerJson);
swaggerJson = require('../services/v2/recruiter/recruiterProfile/recruiterProfileSwaggers/saveLaterSwagger')(swaggerJson);
swaggerJson = require('../services/v2/recruiter/recruiterDashboard/recruiterDashboardSwaggers/recruiterDashboardSwagger')(swaggerJson);
swaggerJson = require('../services/v2/recruiter/recruiterDashboard/recruiterDashboardSwaggers/recruiterTalentListServiceSwagger')(swaggerJson);

//Ambassador
swaggerJson = require('../services/ambassador/profile/profileSwaggers/aboutYouSwagger')(swaggerJson);
swaggerJson = require('../services/ambassador/profile/profileSwaggers/aboutCompanySwagger')(swaggerJson);
swaggerJson = require('../services/ambassador/profile/profileSwaggers/saveLaterSwagger')(swaggerJson);
swaggerJson = require('../services/v2/ambassador/dashboard/dashboardSwaggers/dashboardSwagger')(swaggerJson);
swaggerJson = require('../services/v2/ambassador/dashboard/dashboardSwaggers/talentListServiceSwagger')(swaggerJson);
swaggerJson = require('../services/v2/ambassador/details/detailsSwagger')(swaggerJson);
swaggerJson = require('../services/v2/ambassador/list/listSwagger')(swaggerJson);
swaggerJson = require('../services/v2/ambassador/statusChange/statusChangeSwagger')(swaggerJson);
const baseURL = process.env.BASE_URL.split('://');
swaggerJson.host = baseURL[1];
swaggerJson.info.description = `HostName / URL : ${swaggerJson.host}`;
swaggerJson.schemes[0] = baseURL[0];

module.exports = function (router) {
    router.get('/swagger', (req, res) => {
        res.json(swaggerJson);
    });
    router.use('/api-docs', swaggerUi.serve);
    router.get('/api-docs', swaggerUi.setup(swaggerJson));
};

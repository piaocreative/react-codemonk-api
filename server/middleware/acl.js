const Utils = require('../util/utilFunctions');
const HTTPStatus = require('../util/http-status');
const { ROLE: { TALENT, CLIENT, AGENCY, ADMIN, RECRUITER, AMBASSADOR } } = require('../util/constants');
module.exports = function (req, res, next) {
    const accessList = getAPIList(res.locals.user.role);
    let reqURLPattern = req.baseUrl;
    if (!req.route) {
        reqURLPattern = req.baseUrl + req.path;
    } else {
        reqURLPattern = req.route.path === '/' ? req.baseUrl : req.baseUrl + req.route.path;
    }
    const isAllowed = accessList.some((acl) => {
        return acl.method === req.method && reqURLPattern === acl.path;
    });
    if (isAllowed) {
        next();
    } else {
        const responseObject = Utils.errorResponse();
        responseObject.message = res.__('ACCESS_DENIED');
        res.status(HTTPStatus.NOT_ACCEPTABLE).send(responseObject);
        return;
    }
};

const ACL = {
    [TALENT]: [
        { method: 'POST', path: '/algo-api/test-url' },
        { method: 'PUT', path: '/talent/register-type' },
        { method: 'PUT', path: '/talent/personal-details' },
        { method: 'PUT', path: '/talent/professional-details' },
        { method: 'PUT', path: '/talent/project-details' },
        { method: 'PUT', path: '/talent/workexperience-details' },
        { method: 'PUT', path: '/talent/education-details' },
        { method: 'PUT', path: '/talent/preference-details' },
        { method: 'PUT', path: '/talent/pay-details' },
        { method: 'PUT', path: '/talent/save-later' },
        { method: 'PUT', path: '/talent/profile' },
        { method: 'PUT', path: '/talent/summary' },
        { method: 'PUT', path: '/talent/rate' },
        { method: 'PUT', path: '/talent/skills' },
        { method: 'PUT', path: '/talent/professional-url' },
        { method: 'PUT', path: '/talent/preferences' },
        { method: 'PUT', path: '/talent/availability' },
        { method: 'PUT', path: '/talent/billing' },
        { method: 'PUT', path: '/talent/payment' },
        { method: 'PUT', path: '/talent/languages' },
        { method: 'POST', path: '/talent/project' },
        { method: 'DELETE', path: '/talent/project' },
        { method: 'PUT', path: '/talent/project' },
        { method: 'POST', path: '/talent/education' },
        { method: 'DELETE', path: '/talent/education' },
        { method: 'PUT', path: '/talent/education' },
        { method: 'POST', path: '/talent/work-experience' },
        { method: 'DELETE', path: '/talent/work-experience' },
        { method: 'PUT', path: '/talent/work-experience' },
        { method: 'POST', path: '/talent/certificate' },
        { method: 'DELETE', path: '/talent/certificate' },
        { method: 'PUT', path: '/talent/certificate' },
        { method: 'POST', path: '/talent/invite' },
        { method: 'POST', path: '/client/news-letter' },
        { method: 'GET', path: '/talent/project/list' },
        { method: 'GET', path: '/job-post/list' },
        { method: 'POST', path: '/job-post/apply' },
        { method: 'POST', path: '/v2/job-post/apply' },
        { method: 'PUT', path: '/talent/cv' },
        { method: 'GET', path: '/job-post/:id' },
        { method: 'POST', path: '/timesheet' },
        { method: 'POST', path: '/v2/timesheet' },
        { method: 'GET', path: '/timesheet/:id' },
        { method: 'PUT', path: '/timesheet/:id' },
        { method: 'PUT', path: '/v2/timesheet/:id' },
        { method: 'GET', path: '/v2/timesheet/:id/download/bill' },
        { method: 'GET', path: '/talent/project/search' },
        { method: 'GET', path: '/project/:id/timesheets' },
        { method: 'POST', path: '/notification' },
        { method: 'GET', path: '/notification/list' },
        { method: 'PUT', path: '/notification/mark-read' },
        { method: 'GET', path: '/talent/download/' },
        { method: 'GET', path: '/talent/download' },
        { method: 'GET', path: '/talent/tests' },
        { method: 'POST', path: '/talent/start-test' },
        { method: 'GET', path: '/talent/tests/:id' },
        { method: 'POST', path: '/v2/talent/signup/' },
        { method: 'POST', path: '/v2/talent/signup' },
        { method: 'PUT', path: '/v2/talent/about-you' },
        { method: 'PUT', path: '/v2/talent/education-details' },
        { method: 'PUT', path: '/v2/talent/workexperience-details' },
        { method: 'PUT', path: '/v2/talent/project-details' },
        { method: 'POST', path: '/v2/talent/certificate' },
        { method: 'DELETE', path: '/v2/talent/certificate' },
        { method: 'PUT', path: '/v2/talent/certificate' },
        { method: 'POST', path: '/v2/talent/education' },
        { method: 'DELETE', path: '/v2/talent/education' },
        { method: 'PUT', path: '/v2/talent/education' },
        { method: 'POST', path: '/v2/talent/work-experience' },
        { method: 'DELETE', path: '/v2/talent/work-experience' },
        { method: 'PUT', path: '/v2/talent/work-experience' },
        { method: 'POST', path: '/v2/talent/project' },
        { method: 'DELETE', path: '/v2/talent/project' },
        { method: 'PUT', path: '/v2/talent/project' },
        { method: 'PUT', path: '/v2/talent/save-later' },
        { method: 'PUT', path: '/v2/talent/cv' },
        { method: 'PUT', path: '/v2/talent/preference-details' },
        { method: 'PUT', path: '/v2/talent/pay-details' },
        { method: 'PUT', path: '/v2/talent/upload-documents' },
        { method: 'GET', path: '/v2/talent/download/document' }
    ],
    [CLIENT]: [
        { method: 'POST', path: '/algo-api/test-url' },
        { method: 'PUT', path: '/client/phone-number' },
        { method: 'PUT', path: '/client/verify-phone-number' },
        { method: 'PUT', path: '/client/profile' },
        { method: 'PUT', path: '/client/save-later' },
        { method: 'POST', path: '/project' },
        { method: 'GET', path: '/talent/search' },
        { method: 'GET', path: '/talent/details' },
        { method: 'POST', path: '/client/interview' },
        { method: 'GET', path: '/client/project/list' },
        { method: 'GET', path: '/client/projects' },
        { method: 'GET', path: '/client/interviews' },
        { method: 'PUT', path: '/project' },
        { method: 'POST', path: '/client/news-letter' },
        { method: 'GET', path: '/client/talents' },
        { method: 'PUT', path: '/project/talent/status' },
        { method: 'GET', path: '/client/projects/count' },
        { method: 'GET', path: '/client/project/talents/count' },
        { method: 'GET', path: '/client/project/team/count' },
        { method: 'POST', path: '/job-post' },
        { method: 'POST', path: '/job-post/basic-details' },
        { method: 'POST', path: '/job-post/preferred-candidates' },
        { method: 'PUT', path: '/job-post/basic-details' },
        { method: 'PUT', path: '/job-post/preferred-candidates' },
        { method: 'PUT', path: '/job-post' },
        { method: 'GET', path: '/job-post/list' },
        { method: 'GET', path: '/job-post/:id' },
        { method: 'GET', path: '/talent/details/:id' },
        { method: 'GET', path: '/talent/download/:id' },
        { method: 'PATCH', path: '/job-post/archive/:id' },
        { method: 'GET', path: '/client/project/search' },
        { method: 'PATCH', path: '/timesheet/:id' },
        { method: 'POST', path: '/notification' },
        { method: 'GET', path: '/notification/list' },
        { method: 'GET', path: '/client/by-name' },
        { method: 'POST', path: '/project/admin' },
        { method: 'PUT', path: '/notification/mark-read' },
        { method: 'GET', path: '/algo-api/job-brief/:id/recommended-candidates' },
        { method: 'GET', path: '/algo-api/talent/:id/top-skills' },
        { method: 'GET', path: '/talent/by-name' },
        { method: 'PUT', path: '/client/about-you' },
        { method: 'PUT', path: '/client/about-company' },
        { method: 'POST', path: '/client/company-location' },
        { method: 'PUT', path: '/client/company-location' },
        { method: 'DELETE', path: '/client/company-location' },
        { method: 'POST', path: '/v2/job-post' },
        { method: 'PUT', path: '/v2/job-post' },
        { method: 'POST', path: '/v2/job-post/role' },
        { method: 'POST', path: '/v2/job-post/preferred-candidates' },
        { method: 'POST', path: '/v2/job-post/engagement' },
        { method: 'PUT', path: '/v2/job-post/role' },
        { method: 'PUT', path: '/v2/job-post/preferred-candidates' },
        { method: 'PUT', path: '/v2/job-post/engagement' },
        { method: 'POST', path: '/v2/job-post/talent/status' },
        { method: 'PUT', path: '/v2/job-post/talent/status' },
    ],
    [AGENCY]: [
        { method: 'POST', path: '/algo-api/test-url' },
        { method: 'PUT', path: '/agency/save-later' },
        { method: 'PUT', path: '/agency/profile' },
        { method: 'POST', path: '/agency/talents' },
        { method: 'PUT', path: '/agency/certificate-details' },
        { method: 'PUT', path: '/agency/pay-details' },
        { method: 'PUT', path: '/agency/directors' },
        { method: 'PUT', path: '/agency/documents' },
        { method: 'DELETE', path: '/agency/documents' },
        { method: 'POST', path: '/agency/talents-invite' },
        { method: 'POST', path: '/agency/talent' },
        { method: 'PUT', path: '/talent/register-type' },
        { method: 'PUT', path: '/agency/talent' },
        { method: 'DELETE', path: '/agency/talent' },
        { method: 'GET', path: '/agency/talent/list' },
        { method: 'PUT', path: '/agency/talents' },
        { method: 'PUT', path: '/agency/certificates' },
        { method: 'PUT', path: '/agency/credentials' },
        { method: 'POST', path: '/client/news-letter' },
        { method: 'GET', path: '/agency/project/list' },
        { method: 'GET', path: '/agency/projects/count' },
        { method: 'GET', path: '/agency/project/talents/count' },
        { method: 'GET', path: '/agency/project/team/count' },
        { method: 'GET', path: '/quote/list' },
        { method: 'POST', path: '/agency/quote/submit' },
        { method: 'PUT', path: '/talent/profile' },
        { method: 'PUT', path: '/talent/summary' },
        { method: 'PUT', path: '/talent/rate' },
        { method: 'PUT', path: '/talent/skills' },
        { method: 'PUT', path: '/talent/professional-url' },
        { method: 'PUT', path: '/talent/preferences' },
        { method: 'PUT', path: '/talent/availability' },
        { method: 'PUT', path: '/talent/languages' },
        { method: 'POST', path: '/talent/project' },
        { method: 'DELETE', path: '/talent/project' },
        { method: 'PUT', path: '/talent/project' },
        { method: 'POST', path: '/talent/education' },
        { method: 'DELETE', path: '/talent/education' },
        { method: 'PUT', path: '/talent/education' },
        { method: 'POST', path: '/talent/work-experience' },
        { method: 'DELETE', path: '/talent/work-experience' },
        { method: 'PUT', path: '/talent/work-experience' },
        { method: 'POST', path: '/talent/certificate' },
        { method: 'DELETE', path: '/talent/certificate' },
        { method: 'PUT', path: '/talent/certificate' },
        { method: 'GET', path: '/talent/details/:id' },
        { method: 'GET', path: '/talent/download/:id' },
        { method: 'GET', path: '/quote/:id' },
        { method: 'PUT', path: '/timesheet/:id' },
        { method: 'PUT', path: '/v2/timesheet/:id' },
        { method: 'GET', path: '/v2/timesheet/:id/download/bill' },
        { method: 'GET', path: '/project/:id/timesheets' },
        { method: 'GET', path: '/talent/by-name' },
        { method: 'POST', path: '/timesheet' },
        { method: 'POST', path: '/v2/timesheet' },
        { method: 'GET', path: '/talent/project/search' },
        { method: 'POST', path: '/notification' },
        { method: 'GET', path: '/notification/list' },
        { method: 'PUT', path: '/notification/mark-read' },
        { method: 'PUT', path: '/notification/kpis' },
        { method: 'POST', path: '/v2/talent/education' },
        { method: 'DELETE', path: '/v2/talent/education' },
        { method: 'PUT', path: '/v2/talent/education' },
        { method: 'POST', path: '/v2/talent/certificate' },
        { method: 'DELETE', path: '/v2/talent/certificate' },
        { method: 'PUT', path: '/v2/talent/certificate' },
        { method: 'POST', path: '/v2/talent/work-experience' },
        { method: 'DELETE', path: '/v2/talent/work-experience' },
        { method: 'PUT', path: '/v2/talent/work-experience' },
        { method: 'POST', path: '/v2/talent/project' },
        { method: 'DELETE', path: '/v2/talent/project' },
        { method: 'PUT', path: '/v2/talent/project' }
    ],
    [ADMIN]: [
        { method: 'POST', path: '/algo-api/test-url' },
        { method: 'GET', path: '/client/list' },
        { method: 'GET', path: '/algo-api/users' },
        { method: 'GET', path: '/project/list' },
        { method: 'GET', path: '/client/by-name' },
        { method: 'GET', path: '/talent/by-name' },
        { method: 'POST', path: '/project/admin' },
        { method: 'PUT', path: '/project/talent' },
        { method: 'PUT', path: '/project/status' },
        { method: 'PUT', path: '/project/talent/status' },
        { method: 'GET', path: '/admin/interviews' },
        { method: 'PUT', path: '/admin/interview/status' },
        { method: 'PUT', path: '/admin/interview/talent/status' },
        { method: 'PUT', path: '/project' },
        { method: 'POST', path: '/job-post' },
        { method: 'POST', path: '/job-post/basic-details' },
        { method: 'POST', path: '/job-post/preferred-candidates' },
        { method: 'PUT', path: '/job-post/basic-details' },
        { method: 'PUT', path: '/job-post/preferred-candidates' },
        { method: 'PUT', path: '/job-post' },
        { method: 'POST', path: '/quote' },
        { method: 'PUT', path: '/quote' },
        { method: 'PUT', path: '/client/status' },
        { method: 'PUT', path: '/agency/status' },
        { method: 'PUT', path: '/talent/status' },
        { method: 'GET', path: '/agecny' },
        { method: 'GET', path: '/agency/list' },
        { method: 'POST', path: '/admin/proxy-login' },
        { method: 'GET', path: '/job-post/:id' },
        { method: 'GET', path: '/talent/search' },
        { method: 'GET', path: '/talent/details/:id' },
        { method: 'GET', path: '/talent/download/:id' },
        { method: 'GET', path: '/client/:id' },
        { method: 'GET', path: '/agency/:id' },
        { method: 'GET', path: '/job-post/list' },
        { method: 'GET', path: '/client/project/list' },
        { method: 'PATCH', path: '/job-post/archive/:id' },
        { method: 'PATCH', path: '/quote/archive/:id' },
        { method: 'PATCH', path: '/timesheet/:id' },
        { method: 'GET', path: '/project/:id/timesheets' },
        { method: 'PUT', path: '/timesheet/:id' },
        { method: 'PUT', path: '/v2/timesheet/:id' },
        { method: 'GET', path: '/v2/timesheet/:id/download/bill' },
        { method: 'GET', path: '/project/:id/timesheets' },
        { method: 'POST', path: '/notification' },
        { method: 'GET', path: '/notification/list' },
        { method: 'PUT', path: '/notification/mark-read' },
        { method: 'GET', path: '/quote/list' },
        { method: 'GET', path: '/quote/:id' },
        { method: 'GET', path: '/algo-api/job-brief/:id/recommended-candidates' },
        { method: 'GET', path: '/algo-api/talent/:id/top-skills' },
        { method: 'POST', path: '/v2/talent/signup' },
        { method: 'GET', path: '/admin/kpis' },
        { method: 'GET', path: '/talent/list' },
        { method: 'POST', path: '/v2/job-post' },
        { method: 'PUT', path: '/v2/job-post' },
        { method: 'POST', path: '/v2/job-post/role' },
        { method: 'POST', path: '/v2/job-post/preferred-candidates' },
        { method: 'POST', path: '/v2/job-post/engagement' },
        { method: 'PUT', path: '/v2/job-post/role' },
        { method: 'PUT', path: '/v2/job-post/preferred-candidates' },
        { method: 'PUT', path: '/v2/job-post/engagement' },
        { method: 'GET', path: '/v2/referral/list' },
        { method: 'GET', path: '/talent/log/:id' },
        { method: 'PATCH', path: '/v2/talent/:id/verified-profile' },
        { method: 'GET', path: '/v2/recruiter/list' },
        { method: 'PUT', path: '/v2/recruiter/status' },
        { method: 'GET', path: '/v2/recruiter/:id' },
        { method: 'POST', path: '/v2/job-post/talent/status' },
        { method: 'PUT', path: '/v2/job-post/talent/status' },
        { method: 'GET', path: '/v2/ambassador/list' },
        { method: 'PUT', path: '/v2/ambassador/status' },
        { method: 'GET', path: '/v2/ambassador/:id' },
        { method: 'GET', path: '/timesheet/:id/logs' }
    ],
    [RECRUITER]: [
        { method: 'POST', path: '/algo-api/test-url' },
        { method: 'GET', path: '/v2/recruiter/job-post/:id' },
        { method: 'GET', path: '/v2/recruiter/job-post/list' },
        { method: 'PUT', path: '/v2/recruiter/about-you' },
        { method: 'PUT', path: '/v2/recruiter/about-company' },
        { method: 'PUT', path: '/v2/recruiter/save-later' },
        { method: 'POST', path: '/v2/recruiter/talent-invite' },
        { method: 'GET', path: '/v2/recruiter/talent/list' }
    ],
    [AMBASSADOR]: [
        { method: 'POST', path: '/algo-api/test-url' },
        { method: 'PUT', path: '/ambassador/about-you' },
        { method: 'PUT', path: '/ambassador/about-company' },
        { method: 'PUT', path: '/ambassador/save-later' },
        { method: 'POST', path: '/v2/ambassador/talent-invite' },
        { method: 'GET', path: '/v2/ambassador/talent/list' },
        { method: 'POST', path: '/v2/ambassador/client-invite' },
        { method: 'GET', path: '/v2/ambassador/client/list' }
    ]
};

function getAPIList (role = -1) {
    const commanApis = [
        { method: 'GET', path: '/user/details' },
        { method: 'PUT', path: '/user/picture' },
        { method: 'DELETE', path: '/user/picture' },
        { method: 'GET', path: '/user/checkurl' },
        { method: 'PUT', path: '/user/password' },
        { method: 'PUT', path: '/user/documents' },
        { method: 'DELETE', path: '/user/documents' },
        { method: 'PUT', path: '/user/email' },
        { method: 'PUT', path: '/user/email/resend-otp' },
        { method: 'PUT', path: '/user/email/change' },
        { method: 'GET', path: '/interview/:id' },
        { method: 'GET', path: '/project/:id' },
        { method: 'GET', path: '/v2/project/:id' },
        { method: 'GET', path: '/timesheet' },
        { method: 'GET', path: '/v2/timesheet' },
        { method: 'POST', path: '/v2/user/details/' }
    ];
    return [].concat(ACL[role], commanApis);
}
const CallAPI = require('../../util/callAPI');
const JobPost = require('../../models/jobPost.model');

const ALGO_SERVER_URL = process.env.ALGO_SERVER_URL || 'http://10.1.24.85:8000'
class AlgoServerService {

    static async getSkillsByTalentId(req, user, local) {
        const headers = {
            Authorization: 'Bearer ' + req.headers.authorization,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        const response = await CallAPI.get('https://jsonplaceholder.typicode.com' + '/users', 'json', headers)
        return response.body;
    }


    static async getRecommandedCandidatesFromJobRole(req, user, local) {
        const token = req.headers.authorization;
        const jobPostId = req.params.id;
        const jobPost = await JobPost.findById(jobPostId, ['role']);
        const role = jobPost.role;
        const headers = {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if (user.role === CONSTANTS.ROLE.CLIENT) {
            const response = await CallAPI.get(process.env.BASE_URL + '/talent/search?role=' + role, 'json', headers)
            return response.body.data;
        }
        const response = await CallAPI.get(process.env.BASE_URL + '/talent/list?role=' + role, 'json', headers)
        if (!response || !Object.keys(response.body).length <= 0) {
            return {};
        }
        return response.body.data;
    }

    static async getRecommandedCandidatesFromJobRoleWithPage(userRole, token, role, page = 1, limit = 20) {
        const headers = {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        if (userRole === CONSTANTS.ROLE.CLIENT) {
            const response = await CallAPI.get(process.env.BASE_URL + '/talent/search?role=' + role + '&page=' + page + '&limit=' + limit + '&allowedEmail=PythonAPI', 'json', headers)
            return response;
        }
        const response = await CallAPI.get(process.env.BASE_URL + '/talent/list?status=active&role=' + role + '&page=' + page + '&limit=' + limit, 'json', headers)

        if (!response || !Object.keys(response.body).length <= 0) {
            return {};
        }
        return response.body;
    }

    static async getRecJobsFromTalentId(req, local) {
        try {
            const token = req.headers.authorization;
            const headers = {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
            const apiUrl = `${ALGO_SERVER_URL}/job-post/${req.params.id}/recommended-jobs`;
            const response = await CallAPI.getWithTimeout(apiUrl, 'json', headers);
            if (!(response && response.body && Object.keys(response.body).length > 0)) {
                return {};
            }
            return response.body;
        } catch (e) {
            CONSOLE_LOGGER.info(e.message);
            return {};
        }

    }

    static async getRecCandidatesFromJobId(req, local) {
        try {
            const token = req.headers.authorization;
            const headers = {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
            const apiUrl = `${ALGO_SERVER_URL}/recruiter/${req.params.id}/rec_candidates`;
            const response = await CallAPI.getWithTimeout(apiUrl, 'json', headers);
            if (!(response && response.body && Object.keys(response.body).length > 0)) {
                return {};
            }
            return response.body;
        } catch (e) {
            CONSOLE_LOGGER.info(e.message);
            return {};
        }
    }

    static async testUrl(req, local) {
        try {
            const token = req.headers.authorization;
            const headers = {
                Authorization: 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
            let pythonUrl = req.body.pythonUrl;
            if( pythonUrl[0] === '/'){
                pythonUrl = pythonUrl.substring(1);
            }
            const apiUrl = `${ALGO_SERVER_URL}/${pythonUrl}`;
            CONSOLE_LOGGER.info(`_____ Requested Url : ${apiUrl}`);
            const response = await CallAPI.get(apiUrl, 'json', headers);
            return response.body;
        } catch (e) {
            CONSOLE_LOGGER.info(e.message);
            return {};
        }
    }

}

module.exports = AlgoServerService;

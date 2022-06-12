const CallAPI = require('../../util/callAPI');
const Credential = require('../../models/credential.model');
const Talent = require('../../models/talent.model');
const TestResult = require('../../models/testResult.model');
const mongoose = require('mongoose');

const MOCK_TEST_SERVER_URL = process.env.MOCK_TEST_SERVER_URL || 'https://api.conceptninjas.com'
class callbackOfTestForTalentService {

    static async callbackTest(req, user, local) {
        console.log(req.body)
        if (req && req.body ) {
            const r = req.body;
            const existTestResult = TestResult.findOne({ talentId: mongoose.Types.ObjectId(r.candidateId), evaluationId: r.evaluationId }).select('evaluationId').lean()
                
            if (!(existTestResult && existTestResult.evaluationId)) {
                const testResult = {
                    "testId": r.testId,
                    "status": r.status,
                    "rating": r.rating,
                    "submitReason": r.submitReason,
                    "timeTaken": r.timeTaken,
                    "attemptTime": r.attemptTime,
                    talentId: r.candidateId,
                    evaluationId: r.evaluationId
                };

                const a = await TestResult.create(testResult)
            }
        }



        return 'success';
    }

}

module.exports = callbackOfTestForTalentService;

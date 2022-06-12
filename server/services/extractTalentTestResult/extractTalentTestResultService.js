const CallAPI = require('../../util/callAPI');
const Credential = require('../../models/credential.model');
const Talent = require('../../models/talent.model');
const TestResult = require('../../models/testResult.model');
const mongoose = require('mongoose');

const MOCK_TEST_SERVER_URL = process.env.MOCK_TEST_SERVER_URL || 'https://api.conceptninjas.com'
class ExtractTestForTalentService {

    static async extractTest(req, user, local) {
        let objectMap = {};
        const credential = await Credential.findOne({ key: 'CONCEPT_NINJA' }).select('key value').lean()
        const headers = {
            Authorization: `Bearer ${credential.value}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }

        const response = await CallAPI.get(MOCK_TEST_SERVER_URL + '/ninjascreen/tests', 'json', headers)
        if (response && response.body && response.body.length > 0) {
            objectMap = new Map(response.body.map(obj => [obj.testId, obj.testName]));
        }


        const talent = await Talent.findOne({ userId: user._id }).select('candidateToken').lean()
        if (talent && talent.candidateToken) {
            const headers = {
                Authorization: `Bearer ${talent.candidateToken}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }

            const response = await CallAPI.get(MOCK_TEST_SERVER_URL + '/ninjascreen/performance?testId=' + req.params.id, 'json', headers)
            if (response && response.body && response.body.length > 0) {
                for (const r of response.body) {
                    const existTestResult = TestResult.findOne({ talentId: mongoose.Types.ObjectId(r.candidateId), evaluationId: r.evaluationId }).select('evaluationId').lean()
                    
                    if (!(existTestResult && existTestResult.evaluationId)) {
                        const testResult = {
                            "testId": r.testId,
                            "name": objectMap[r.testId],
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
                return response.body.map(r => {
                    return {
                        "name": objectMap[r.testId],
                        "status": r.status,
                        "rating": r.rating,
                        "submitReason": r.submitReason,
                        "timeTaken": r.timeTaken,
                        "attemptTime": MOMENT(r.attemptTime * 1000).format("D MMM YYYY h:mm:ss A")

                    }
                });
            }

        }



        return [];
    }

}

module.exports = ExtractTestForTalentService;

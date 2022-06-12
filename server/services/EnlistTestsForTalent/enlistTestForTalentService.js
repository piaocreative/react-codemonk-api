const CallAPI = require('../../util/callAPI');
const Credential = require('../../models/credential.model');

const MOCK_TEST_SERVER_URL = process.env.MOCK_TEST_SERVER_URL || 'https://api.conceptninjas.com'
class EnlistTestForTalentService {

    static async enlistTests(req, user, local) {
       const credential = await Credential.findOne({key:'CONCEPT_NINJA'}).select('key value').lean()
        const headers = {
            Authorization: `Bearer ${credential.value}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        const response = await CallAPI.get(MOCK_TEST_SERVER_URL + '/ninjascreen/tests' , 'json', headers)
        if(response && response.body && response.body.length>0){
            return response.body.map(t=>{
                return {id:t.testId, name:t.testName,duration:t.testDuration,url:t.testURL,description:t.testDescription}
            })   
        }
        return [];
    }

}

module.exports = EnlistTestForTalentService;

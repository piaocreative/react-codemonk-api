const CallAPI = require('../../util/callAPI');
const Credential = require('../../models/credential.model');

const MOCK_TEST_SERVER_URL = process.env.MOCK_TEST_SERVER_URL || 'https://api.conceptninjas.com'
class AddTestForTalentService {

    static async registerCandidate(id, name, email) {
       const credential = await Credential.findOne({key:'CONCEPT_NINJA'}).select('key value').lean()
        const headers = {
            Authorization: `Bearer ${credential.value}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
        const body = { candidateId: id, candidateName: name, candidateEmail: email }
        const response = await CallAPI.post(MOCK_TEST_SERVER_URL + '/ninjascreen/registerCandidate',body , 'json', headers)
        return response;
    }

}

module.exports = AddTestForTalentService;

const CallAPI = require('../../util/callAPI');
const Talent = require('../../models/talent.model');

class StartTestForTalentService {

    static async startTest(req, user, local) {
       const talent = await Talent.findOne({userId:user._id}).select('candidateToken').lean()
        if(talent && talent.candidateToken){
            return {redirectUrl:`${req.body.url}?candidateToken=${talent.candidateToken}`}  
        }
        return 'No record found.';
    }

}

module.exports = StartTestForTalentService;

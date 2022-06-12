const JobPost = require('../../models/jobPost.model');
const AutoGenerator = require('../../models/autoGenerator.model');

module.exports = function () {
    try {
        AutoGenerator.updateOne({
            type: 'job-post'
        },
            { number: 1 }, function (err, docs) {
                if (err) {
                    CONSOLE_LOGGER.error(err)
                }
                else {
                    console.log("Updated autogenerator job-post : ", docs);
                }
            });
    } catch (error) {
        CONSOLE_LOGGER.error(error);
    }
};

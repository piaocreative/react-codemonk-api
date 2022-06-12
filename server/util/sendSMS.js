const AWS = require('aws-sdk');

class SmsService {
    static async sendSMS (to, message) {
        if (process.env.NODE_ENV !== 'testing') {
            var params = {
                Message: message,
                PhoneNumber: '+' + to
            };
            return await new AWS.SNS({ apiVersion: '2010-03-31',region:'eu-west-2' }).publish(params).promise();
        } else {
            return true;
        }
    }
}

module.exports = SmsService;

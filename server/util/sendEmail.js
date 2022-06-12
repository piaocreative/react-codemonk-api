const AWS = require('aws-sdk');
const fs = require('fs');
const { promisify } = require('util');
const Constants = require('./constants');
const readFileAsync = promisify(fs.readFile);
const ses = new AWS.SES({ apiVersion: '2010-12-01' });
const MailComposer = require('nodemailer/lib/mail-composer');

class EmailService {

    static async prepareAndSendEmail (email, subject, template, templateVariables) {
        if (process.env.NODE_ENV !== 'testing') {
            let htmlMessage = await readFileAsync(template, 'utf8');
            templateVariables.year = MOMENT().year();
            for (const [key, value] of Object.entries(templateVariables)) {
                htmlMessage = htmlMessage.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
            }

            const params = {
                Destination: {
                    ToAddresses: email
                },
                Message: {
                    Body: {
                        Html: {
                            Charset: 'UTF-8',
                            Data: htmlMessage
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: subject
                    }
                },
                ReturnPath: Constants.DEVELOPERS_EMAIL,
                Source: Constants.DEVELOPERS_EMAIL
            };
            ses.sendEmail(params).promise();
        }
    }

    static async prepareAndSendEmailWithAttachment (email, subject, template, templateVariables, attachments) {
        if (process.env.NODE_ENV !== 'testing') {
            let htmlMessage = await readFileAsync(template, 'utf8');
            templateVariables.year = MOMENT().year();
            for (const [key, value] of Object.entries(templateVariables)) {
                htmlMessage = htmlMessage.replace(new RegExp(`##${key.toUpperCase()}`, 'g'), value);
            }

            const mailOptions = {
                from: Constants.DEVELOPERS_EMAIL,
                sender: Constants.DEVELOPERS_EMAIL,
                to: email,
                replyTo: Constants.DEVELOPERS_EMAIL,
                subject: subject,
                html: htmlMessage,
                attachments: attachments
            };

            const mail = new MailComposer(mailOptions);
            mail.compile().build((err, message) => {
                const params = {
                    RawMessage: {
                        Data: message
                    },
                    Source: Constants.DEVELOPERS_EMAIL
                };
                ses.sendRawEmail(params).promise();
            });
        }
    }
}

module.exports = EmailService;

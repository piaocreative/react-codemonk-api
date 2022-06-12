const fs = require('fs');
const AWS = require('aws-sdk');
const Constants = require('../util/constants');
const s3 = new AWS.S3({
    Bucket: Constants.AWS_S3_PUBLIC_BUCKET
});

class UploadService {
    static async uploadFile(file, filename) {
        const data = {
            Key: filename,
            Bucket: Constants.AWS_S3_PUBLIC_BUCKET,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        if (process.env.NODE_ENV !== 'testing' && process.env.NODE_ENV !== 'local') {
            return await s3.putObject(data).promise();
        } else {
            return Promise.resolve();
        }
    }

    static async uploadPublicReadFile(file, filename) {
        const data = {
            Key: filename,
            Bucket: Constants.AWS_S3_PUBLIC_BUCKET,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL:'public-read'
        };
        if (process.env.NODE_ENV !== 'testing' && process.env.NODE_ENV !== 'local') {
            return await s3.putObject(data).promise();
        } else {
            return Promise.resolve();
        }
    }

    static async uploadPdf(file, filename) {
        if (process.env.NODE_ENV !== 'testing') {
            await s3.putObject({
                Key: filename,
                Bucket: Constants.AWS_S3_PUBLIC_BUCKET,
                Body: file,
                ContentType: 'application/pdf'
            }).promise();
            return s3.getSignedUrl('getObject', {
                Key: filename,
                Bucket: Constants.AWS_S3_PUBLIC_BUCKET,
                Expires: 60 * 5
            });
        } else {
            return Promise.resolve();
        }
    }

    static async getSignedUrl(filename) {
        if (process.env.NODE_ENV !== 'testing') {
            return await s3.getSignedUrl('getObject', {
                Key: filename,
                Bucket: Constants.AWS_S3_PUBLIC_BUCKET,
                Expires: 60 * 5
            });
        } else {
            return Promise.resolve();
        }
    }

    static async deleteObject(filename) {
        const data = {
            Key: filename,
            Bucket: Constants.AWS_S3_PUBLIC_BUCKET
        };
        if (process.env.NODE_ENV !== 'testing') {
            return await s3.deleteObject(data).promise();
        } else {
            return Promise.resolve();
        }
    }

    static async uploadFileFromFile(file, filename) {
        const data = {
            Key: filename,
            Bucket: Constants.AWS_S3_PUBLIC_BUCKET,
            Body: fs.readFileSync(file.path),
            ContentType: file.mimetype
        };
        if (process.env.NODE_ENV !== 'testing') {
            return await s3.putObject(data).promise();
        } else {
            return Promise.resolve();
        }
    }

    static bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
    }
}

module.exports = UploadService;

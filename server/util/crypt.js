const crypto = require('crypto');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
const JWT = require('./jwt');

class Crypt {
    static enCryptPassword (password) {
        return new Promise((resolve) => {
            const iv = crypto.randomBytes(IV_LENGTH);
            const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(password);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            resolve((iv.toString('hex') + ':' + encrypted.toString('hex')));
        });
    }

    static async comparePassword (compare, original) {
        try {
            if(!original){
                return false;
            }
            const textParts = original.split(':');
            const iv = Buffer.from(textParts.shift(), 'hex');
            const encryptedText = Buffer.from(textParts.join(':'), 'hex');
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return (compare === (decrypted.toString()));
        } catch (error) {
            CONSOLE_LOGGER.error('Login ERROR', error);
            return false;
        }
    }

    /**
     * This function is being used to save user detail before login
     * @author Innovify
     * @param {Object} user user
     * @param {function} callback callback
     * @since 01/01/2020
     */
    static async getUserToken (user) {
        const token = JWT.generate({
            id: user._id,
            email: user.email
        });

        return {
            token: token
        };
    }

    static async getUserProxyToken (user,adminId) {
        const token = JWT.generate({
            id: user._id,
            email: user.email,
            adminId: adminId
        });
        return {
            token: token
        };
    }

    static async generateCode() {
        return crypto.randomBytes(4).toString('hex');
    }
}

module.exports = Crypt;

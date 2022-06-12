const crypt = require('../server/util/crypt');
module.exports = {
    async up (db) {
        await db.collection('users').insert({
            email: 'super@codemonk.ai',
            password: await crypt.enCryptPassword('b91f592240fcdf85bed868a0e3b32a97343c1d4b09c075b3062ef3c52c0e7235'),
            role: 4,
            isActive: 1,
            firstName: 'Codemonk',
            lastName: 'Admin'
        });
    }
};

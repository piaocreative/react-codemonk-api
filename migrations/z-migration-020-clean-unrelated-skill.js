const crypto = require('crypto');

function generateCode(codes) {
    const code = crypto.randomBytes(4).toString('hex');
    if (codes.includes(code)) {
        return generateCode(code);
    }
    codes.push(code);
    return code;
}

module.exports = {
    async up(db) {
        console.log('code migration 20-clean unrelated skilss');


        await db.collection('talents').updateMany({
            'skills': { $exists: true }, 'skills.name': { $regex: '.{40,}' }
        },
            { $pull: { 'skills': { name: { $regex: '.{40,}' } } } },
            { multi: true });
    }
};

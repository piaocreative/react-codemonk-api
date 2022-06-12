const crypto = require('crypto');

function generateCode (codes) {
    const code = crypto.randomBytes(4).toString('hex');
    if (codes.includes(code)) {
        return generateCode(code);
    }
    codes.push(code);
    return code;
}

module.exports = {
    async up (db) {
        const users = await db.collection('talents').find({
            code: { $exists: false }
        }).toArray();
        const codes = [];
        const bulkOperation = [];
        for (let index = 0; index < users.length; index++) {
            const code = generateCode(codes);
            const user = users[index];
            bulkOperation.push({
                updateOne:
                    {
                        filter: { _id: user._id },
                        update: { $set: { code } }
                    }
            });
        }
        await db.collection('talents').bulkWrite(bulkOperation);
    }
};

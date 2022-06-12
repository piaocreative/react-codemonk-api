module.exports = {
    async up (db, client) {
        await db.collection('talents').update({}, { $set: { isActive: 1 } }, { multi: true });
        await db.collection('clients').update({}, { $set: { isActive: 1 } }, { multi: true });
    },
    async down (db, client) {
    }
};

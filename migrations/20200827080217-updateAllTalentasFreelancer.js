module.exports = {
    async up (db, client) {
        await db.collection('talents').update({}, { $set: { registerType: 'freelancer' } }, { multi: true });
    }
};

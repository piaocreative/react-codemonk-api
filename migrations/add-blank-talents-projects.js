module.exports = {
    async up (db, client) {
        await db.collection('projects').update({ talents: { $exists: false } }, { $set: { talents: [] } }, { multi: true });
    }
};

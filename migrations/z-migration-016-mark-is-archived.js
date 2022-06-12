

module.exports = {
    async up (db) {
        await db.collection('quotes').updateMany({}, { $set: { isArchived: false } });
    }
};

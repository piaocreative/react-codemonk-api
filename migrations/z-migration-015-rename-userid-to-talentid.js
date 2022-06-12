

module.exports = {
    async up (db) {
        await db.collection('timesheets').updateMany({}, { $rename: { userId: 'talentId' } });
    }
};

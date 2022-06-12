module.exports = {
    async up (db) {
        await db.collection('talents').find({ workPreference: { $exists: true } }).forEach(async (d) => {
            await db.collection('talents').update({ _id: d._id },
                { $set: { workPreference: [d.workPreference] } }
            );
        });
    }
};

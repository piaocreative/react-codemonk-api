

module.exports = {
    async up (db) {
        const data = await db.collection('jobposts').find();
        const bulkUpdate = [];
        for (const j of (await data.toArray())) {
            const _data = await db.collection('projects')
                .findOne({ _id: j.projectId }, { clientId: 1 });
            if (!_data) {
                continue;
            }
            const { clientId } = _data;
            bulkUpdate.push({
                updateOne: {
                    filter: { _id: j._id },
                    update: { $set: { clientId } },
                    upsert: false
                }
            });
        }
        await db.collection('jobposts').bulkWrite(bulkUpdate);
    }
};

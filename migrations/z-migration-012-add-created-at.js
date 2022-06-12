

module.exports = {
    async up (db) {
        const list = await db.listCollections();
        for (const iterator of (await list.toArray())) {
            const data = await db.collection(iterator.name).find();
            const bulkUpdate = [];
            for (const j of (await data.toArray())) {
                bulkUpdate.push({
                    updateOne: {
                        filter: { _id: j._id },
                        update: { $set: { createdAt: j._id.getTimestamp() } },
                        upsert: false
                    }
                });
            }
            await db.collection(iterator.name).bulkWrite(bulkUpdate);
        }
    }
};



module.exports = {
    async up (db) {
        const brief = await db.collection('jobposts')
            .find({}, { _id: true })
            .sort({ $natural: -1 } )
            .limit(1).toArray();

        if (brief.length) {
            const timestamp = brief[0]._id.toString().substring(0, 8);
            const date = new Date( parseInt( timestamp, 16 ) * 1000 );
            await db.collection('visithistory').updateOne({}, {
                $set: {
                    briefId: brief[0]._id,
                    briefPublishedDate: date
                }
            }, {
                upsert: true
            });
        }
    }
};

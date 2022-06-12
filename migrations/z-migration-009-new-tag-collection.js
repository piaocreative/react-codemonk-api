

module.exports = {
    async up (db, client) {
        const quote = await db.collection('quotes')
            .find({}, { _id: true })
            .sort({ $natural: -1 } )
            .limit(1).toArray();

        if (quote.length) {
            const timestamp = quote[0]._id.toString().substring(0, 8);
            const date = new Date( parseInt( timestamp, 16 ) * 1000 );
            await db.collection('visithistory').updateOne({}, {
                $set: {
                    quoteId: quote[0]._id,
                    quotePublishedDate: date
                }
            }, {
                upsert: true
            });
        }
    }
};

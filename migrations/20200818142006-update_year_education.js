module.exports = {
    async up (db, client) {
        db.collection('talents').find({
            'educationDetails.startDate': { $type: 9 },
            'educationDetails.startYear': { $exists: false }
        }).forEach((data) => {
            data.educationDetails.forEach((d) => {
                console.log(d.startDate);
                d.startYear = new Date(d.startDate).getFullYear();
                console.log(d.startYear);
                console.log(d.endDate);
                d.endYear = new Date(d.endDate).getFullYear();
                console.log(d.endYear);
            });

            console.log(data.educationDetails);

            db.collection('talents').update({ _id: data._id }, { $set: { educationDetails: data.educationDetails } });
        });
    },

    async down (db, client) {
        // TODO write the statements to rollback your migration (if possible)
        // Example:
        // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    }
};

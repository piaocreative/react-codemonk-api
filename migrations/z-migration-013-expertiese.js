

module.exports = {
    async up (db) {
        await db.collection('jobposts').updateMany({
            expertise: 'junior'
        }, {
            $set: {
                expertise: 'Beginner - 0 - 2 yrs',
                expertiseOrder: 0
            }
        });
        await db.collection('jobposts').updateMany({
            expertise: 'mid-level'
        }, {
            $set: {
                expertise: 'Intermediate - 5 - 8 yrs',
                expertiseOrder: 2
            }
        });

        await db.collection('jobposts').updateMany({
            expertise: 'senior'
        }, {
            $set: {
                expertise: 'Senior - 8 - 12 yrs',
                expertiseOrder: 3
            }
        });

        await db.collection('jobposts').updateMany({
            expertise: 'expert'
        }, {
            $set: {
                expertise: 'Distinguished - 15+',
                expertiseOrder: 5
            }
        });
    }
};

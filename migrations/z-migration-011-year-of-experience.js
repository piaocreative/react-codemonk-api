

module.exports = {
    async up (db) {
        await db.collection('talents').updateMany({
            yearsOfExperience: '0-1 years'
        }, {
            $set: {
                yearsOfExperience: 'Beginner - 0 - 2 yrs',
                experienceOrder: 0
            }
        });

        await db.collection('talents').updateMany({
            yearsOfExperience: '2-4 years'
        }, {
            $set: {
                yearsOfExperience: 'Junior - 2 - 5 yrs',
                experienceOrder: 1
            }
        });

        await db.collection('talents').updateMany({
            yearsOfExperience: '5-9 years'
        }, {
            $set: {
                yearsOfExperience: 'Intermediate - 5 - 8 yrs',
                experienceOrder: 2
            }
        });

        await db.collection('talents').updateMany({
            yearsOfExperience: '10+ years'
        }, {
            $set: {
                yearsOfExperience: 'Senior - 8 - 12 yrs',
                experienceOrder: 3
            }
        });
    }
};

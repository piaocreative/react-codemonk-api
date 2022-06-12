module.exports = {
    async up (db) {
        await db.createCollection('skillsview', {
            viewOn: 'talents',
            pipeline: [
                { $project: { skills: 1 } },
                { $unwind: '$skills' },
                { $group: { _id: '$skills.name' } }
            ]
        });
    }
};

module.exports = {
  async up(db, client) {
    const cultures = [
      'Creativity', 'Variety', 'Self-Development', 'Structure', 'Security', 'Influence', 'Prestige', 'Performance', 'Financial Reward', 'Work-Life Balance', 'Working Conditions', 'Work Relationships', 'Altruism', 'Autonomy'
    ]

    const culturesArr = cultures.map((i) => {
      return {
        name: i, active: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    // Bulk insert
    var bulk = db.collection('companycultures').initializeOrderedBulkOp();
    for (let i = 0; i < culturesArr.length; i++) {
      bulk.insert(culturesArr[i]);
    }
    bulk.execute();
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};

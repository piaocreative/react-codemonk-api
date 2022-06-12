module.exports = {
  async up(db, client) {
    const cultures = ['Accountability','Commitment to Customers','Constant Improvement','Continuous Learning','Diversity','Fun','Honesty','Humility','Innovation','Integrity','Leadership','Ownership','Passion','Quality','Teamwork','Trust'];
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
  }
};

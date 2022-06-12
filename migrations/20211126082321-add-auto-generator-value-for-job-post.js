module.exports = {
  async up(db, client) {
    const culturesArr = [{
      type: 'job-post', prefix: '',
      length: 4,
      number: 1
    }];

    // Bulk insert
    var bulk = db.collection('autogenerators').initializeOrderedBulkOp();
    for (let i = 0; i < culturesArr.length; i++) {
      bulk.insert(culturesArr[i]);
    }
    bulk.execute();
  },

  async down(db, client) {
  }
};

module.exports = {
  async up(db, client) {
    const culturesArr = [{
      type: 'bill', prefix: 'BILL-',
      length: 10,
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

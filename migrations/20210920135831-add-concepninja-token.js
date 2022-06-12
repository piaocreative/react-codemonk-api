module.exports = {
  async up(db, client) {
    const credentialArr = [{
      name: 'Concept Ninja', 
      key: 'CONCEPT_NINJA', 
      active: 1,
      value: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb3Jwb3JhdGVJZCI6NTg0fQ.WpXxTNkCoIOQtXNjeDtxBLfb-KcvQWcuxBFsxVW4RR0',
      createdAt: new Date(),
      updatedAt: new Date()
    }];

    // Bulk insert
    var bulk = db.collection('credentials').initializeOrderedBulkOp();
    for (let i = 0; i < credentialArr.length; i++) {
      bulk.insert(credentialArr[i]);
    }
    bulk.execute();
  }
};

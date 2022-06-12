module.exports = {
  async up(db, client) {


    const users = await db.collection('talents').find(
      {
        'ratePerHour': { $exists: true }, 'ratePerHour': { $gt: 0 }
      }, { ratePerHour: 1 }
    ).toArray();

    let bulkOperation = [];
    console.log('code User length' + users.length);
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      bulkOperation.push({
        updateOne:
        {
          filter: { _id: user._id },
          update: { $set: { ratePerHourBackUp: user.ratePerHour } }
        }
      });

      if (bulkOperation.length === 500) {
        //Execute per 500 operations and re-init
        await db.collection('talents').bulkWrite(bulkOperation);
        bulkOperation = [];
      }
    }

    if(bulkOperation.length > 0) {
      await db.collection('talents').bulkWrite(bulkOperation);
    }

  },


};

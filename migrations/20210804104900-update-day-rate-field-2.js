


const round = (number, decimalDigits) =>
  Math.round((number + Number.EPSILON) * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits);

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
      if (user.ratePerHour && user.ratePerHour > 0) {
        const rate = user.ratePerHour / 7.5;

        const ratePerHour = round(rate, 2);
        const ratePerDay = round(rate * 7.5, 2);
        const ratePerMonth = round(rate * 157.5, 2);

        bulkOperation.push({
          updateOne:
          {
            filter: { _id: user._id },
            update: { $set: { ratePerHour, ratePerDay, ratePerMonth } }
          }
        });
      }

      if (bulkOperation.length === 500) {
        //Execute per 500 operations and re-init
        await db.collection('talents').bulkWrite(bulkOperation);
        bulkOperation = [];
      }
    }

    if (bulkOperation.length > 0) {
      await db.collection('talents').bulkWrite(bulkOperation);
    }

  }


};

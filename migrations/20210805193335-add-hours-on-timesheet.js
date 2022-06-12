


const round = (number, decimalDigits = 0) =>
Math.round((number + Number.EPSILON) * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits);

module.exports = {





async up(db, client) {




  const timesheets = await db.collection('timesheets').find(
    {
      'week': { $exists: true }
    }, { week: 1 }
  ).toArray();

  let bulkOperation = [];
  console.log('No of Time sheets length' + timesheets.length);
  for (let index = 0; index < timesheets.length; index++) {
    const timesheet = timesheets[index];
    if (timesheet.week) {
      const week = timesheet.week;
      week.forEach((w) =>{
        w.hours = round(w.value * 8);
        w.minutes = 0;
      })
      bulkOperation.push({
        updateOne:
        {
          filter: { _id: timesheet._id },
          update: { $set: { week } }
        }
      });
    }

    if (bulkOperation.length === 500) {
      //Execute per 500 operations and re-init
      await db.collection('timesheets').bulkWrite(bulkOperation);
      bulkOperation = [];
    }
  }

  if (bulkOperation.length > 0) {
    await db.collection('timesheets').bulkWrite(bulkOperation);
  }

}


};

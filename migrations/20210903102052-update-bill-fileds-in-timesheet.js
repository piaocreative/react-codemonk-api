


const round = (number, decimalDigits = 0) => {
  if (isNaN(number)) {
    return number;
  }
  const num = number * 1.0;
  return Math.round((num + Number.EPSILON) * Math.pow(10, decimalDigits)) / Math.pow(10, decimalDigits);
}
const CONSTANTS = require('../server/util/constants')
module.exports = {





  async up(db, client) {




    const timesheets = await db.collection('timesheets').find(
      {
        'week': { $exists: true }
      }, { week: 1, talentId: 1 }
    ).toArray();

    let bulkOperation = [];
    console.log('No of Time sheets length' + timesheets.length);
    for (let index = 0; index < timesheets.length; index++) {
      const timesheet = timesheets[index];
      if (timesheet.week) {
        const week = timesheet.week;
        const talent = await db.collection('talents').findOne(
          {
            userId: timesheet.talentId
          }, { currency: 1, ratePerHour: 1, ratePerDay: 1 }
        );
        const currency = talent.currency;
        const ratePerHour = talent.ratePerHour;
        const ratePerDay = talent.ratePerDay;
        let subTotal = 0;
        for (const w of week) {
          const hours = parseInt(w.hours, 10)
          const minutes = parseInt(w.minutes, 10)
          if (hours > 0 || minutes > 0) {
            if ((hours + (minutes / 60)) < CONSTANTS.TIMESHEET.DAY.HOURS) {
              //hours
              subTotal += (hours + (minutes / 60)) * ratePerHour;
            } else {
              //day
              subTotal += ratePerDay;
            }
          }
        }
        const earning = round(subTotal, 2);
        const talentVat = 0;
        const commission = round(subTotal * (CONSTANTS.RATE_MULTIPLIER - 1), 2);
        const clientVat = 0;
        const cost = round(earning + commission, 2);
        bulkOperation.push({
          updateOne:
          {
            filter: { _id: timesheet._id },
            update: {
              $set: {
                currency,
                ratePerHour,
                ratePerDay,
                earning,
                talentVat,
                commission,
                clientVat,
                cost
              }
            }
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

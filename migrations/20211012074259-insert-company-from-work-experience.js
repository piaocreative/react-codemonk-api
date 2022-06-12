
module.exports = {

  async up(db, client) {
    const destinationDocument = 'companies';
    db.collection(destinationDocument).createIndex({ name: 1, country: 1 }, { unique: true })

    const query = { 'workExperience.0': { $exists: true } };
    const sourceDocument = 'talents';
    const countTalent = await countSourceDocuments(db, sourceDocument, query);
    const limit = 50;
    const totalPage = countTalent / limit
    let bulkOperation = [];
    let totalFetchSourceDoc = 0;
    let totalInsertDoc = 0;
    for (let page = 0; page < totalPage; page++) {
      const sourceDocs = await fetchSourceDocuments(db, sourceDocument, query, limit, page);
      totalFetchSourceDoc += sourceDocs.length;
      console.log(`No of sourceDocs(${sourceDocument}) length`, sourceDocs.length);
      for (let index = 0; index < sourceDocs.length; index++) {
        prepareBulkOperation(sourceDocs[index], bulkOperation);

        if (bulkOperation.length > 500) {
          totalInsertDoc += bulkOperation.length;
          console.log(`Bulk insert(${destinationDocument}) length `, bulkOperation.length)
          //Execute per 500 operations and re-init
          await db.collection(destinationDocument).bulkWrite(bulkOperation);
          bulkOperation = [];
        }
      }
    }

    if (bulkOperation.length > 0) {
      totalInsertDoc += bulkOperation.length;
      console.log(`Last bulk insert(${destinationDocument}) length `, bulkOperation.length)
      await db.collection(destinationDocument).bulkWrite(bulkOperation);
    }

    console.log(`Total fetch docs : ${totalFetchSourceDoc} and total inserted doc are ${totalInsertDoc}`)

  }


};


async function countSourceDocuments(db, sourceDocument, query) {
  const countTalent = await db.collection(sourceDocument).countDocuments(query);
  console.log(`Number of  ${sourceDocument}: ${countTalent}`);
  return countTalent;
}

async function fetchSourceDocuments(db, sourceDocument, query, limit, page, select = { workExperience: 1 }, sort = { 'createdAt': -1 }) {
  return await db.collection(sourceDocument).find(query, select).sort(sort)
    .limit(limit).skip(page * limit).toArray();
}

function prepareBulkOperation(talent, bulkOperation) {
  if (talent.workExperience) {
    const workExperience = talent.workExperience;
    for (const w of workExperience) {
      if (w.employer && w.country) {
        bulkOperation.push({
          updateOne: {
            "filter": { name: w.employer, country: w.country },
            update: { $set : {name: w.employer, country: w.country, isActive: 1, type: 'Company', createdAt: new Date(), updatedAt: new Date()} },
            "upsert": true
          }
        });
      }
    }
  }
}





let totalFetchSourceDoc = 0;
let totalInsertDoc = 0;
module.exports = {

    async up (db, client) {
        const destinationDocument = 'talents';
        const query = { 'employmentType.0': { $exists: false } };
        const sourceDocument = 'talents';

        let bulkOperation = [];

        let countTalent = await countSourceDocuments(db, sourceDocument, query);
        const limit = 50;
        let totalPage = countTalent / limit;
        for (let page = 0; page < totalPage; page++) {
            const sourceDocs = await fetchSourceDocuments(db, sourceDocument, query, limit, page);
            totalFetchSourceDoc += sourceDocs.length;
            console.log(`No of sourceDocs(${sourceDocument}) length`, sourceDocs.length);
            for (let index = 0; index < sourceDocs.length; index++) {
                prepareBulkOperation(sourceDocs[index], bulkOperation);

                if (bulkOperation.length >= 500) {
                    totalInsertDoc += bulkOperation.length;
                    console.log(`Bulk insert(${destinationDocument}) length `, bulkOperation.length);
                    // Execute per 500 operations and re-init
                    await db.collection(destinationDocument).bulkWrite(bulkOperation);
                    bulkOperation = [];
                    page = -1;
                    countTalent = await countSourceDocuments(db, sourceDocument, query);
                    totalPage = countTalent / limit;
                    break;
                }
            }
        }

        if (bulkOperation.length > 0) {
            totalInsertDoc += bulkOperation.length;
            console.log(`Last bulk insert(${destinationDocument}) length `, bulkOperation.length);
            await db.collection(destinationDocument).bulkWrite(bulkOperation);
        }

        console.log(`Total fetch docs : ${totalFetchSourceDoc} and total inserted doc are ${totalInsertDoc}`);

    }


};


async function countSourceDocuments (db, sourceDocument, query) {
    const countTalent = await db.collection(sourceDocument).countDocuments(query);
    console.log(`Number of  ${sourceDocument}: ${countTalent}`);
    return countTalent;
}

async function fetchSourceDocuments (db, sourceDocument, query, limit, page, select = { employmentType: 1 }, sort = { 'createdAt': -1 }) {
    return await db.collection(sourceDocument).find(query, select).sort(sort)
        .limit(limit).skip(page * limit).toArray();
}

function prepareBulkOperation (talent, bulkOperation) {
    if (talent._id) {
        bulkOperation.push({
            updateOne: {
                'filter': { _id: talent._id },
                update: { $set: { employmentType: ['freelancer-consultant'] } }
            }
        });
    }
}

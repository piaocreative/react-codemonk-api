module.exports = {
    async up (db, client) {
        await db.collection('agencies').update({}, { $rename: { 'agency.pincode': 'agency.postcode' } }, { multi: true });
        await db.collection('clients').update({}, { $rename: { 'billing.companyDetails.pincode': 'billing.companyDetails.postcode' } }, { multi: true });
        await db.collection('talents').update({}, { $rename: { 'billing.companyDetails.pincode': 'billing.companyDetails.postcode' } }, { multi: true });
    }
};

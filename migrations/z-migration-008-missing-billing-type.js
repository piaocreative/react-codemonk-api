module.exports = {
    async up (db, client) {
        let clients = await db.collection('clients').find({
            signupStep: { $gte: 2 }, 'billing.type': { $exists: false }
        });
        clients = await clients.toArray();
        for (let index = 0; index < clients.length; index++) {
            await db.collection('clients').updateOne({
                _id: clients[index]._id
            }, {
                $set: {
                    'billing.type': clients[index].registerType
                }
            });
        }
    }
};

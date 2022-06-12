module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    if (process.env.NODE_ENV === 'production') {
      await db.collection('users').find(
        {
          'email': { $exists: true }, $or: [
            { email: { $regex: 'yopmail.com' } }
            , { email: { $regex: 'mailinator.com' } }
            , { email: { $regex: 'test' } }
            , { firstName: { $regex: 'test' } }
            , { lastName: { $regex: 'test' } }
            , { email: 'maulik.sailor@yahoo.com' }
            , { email: 'maulikthesailor@yahoo.com' }
          ]
        }
      ).forEach(async (data) => {
        await db.collection('users').update({ _id: data._id }, { $set: { 'isDelete': 1 } });
      });
    }

  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};

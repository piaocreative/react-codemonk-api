module.exports = {
  async up(db, client) {
    await db.collection('talents').updateMany({
      'skills': { $exists: true }, 'skills.name': { $regex: '.{40,}', $options: 's' }
    },
      { $pull: { 'skills': { name: { $regex: '.{40,}', $options: 's' } } } },
      { multi: true });
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};

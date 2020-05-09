const mongoose = require('mongoose');

const initDB = () => {
  const URI = process.env.MONGODBURI || 'mongodb://localhost:27017/elearn-app';
  mongoose.connect(URI, 
    { 
      useFindAndModify: true,
      useNewUrlParser: true
    }, 
    (err, db) => {
    if (err ) return console.log(`Failed to connect to DB::`, err);

    console.log(`DB connected successfully :: `, db.client.s.url)
  });
};

module.exports = initDB;
const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'solo-project'
  })
   .then(() => console.log("Connected to Mongo DB"))
   .catch(err => console.log(err));

module.exports = mongoose;
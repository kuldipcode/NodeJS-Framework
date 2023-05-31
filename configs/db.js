const mongoose = require('mongoose');

const dbConnection = mongoose.connect(process.env.dbUrl)



module.exports = dbConnection;
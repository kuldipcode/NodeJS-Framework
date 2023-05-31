const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    profileimage: String,
    password: String
})

const Admin = mongoose.model('Admins', adminSchema);

module.exports = Admin;
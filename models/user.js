const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const saltround = 10;

const UserSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    profileimage: String,
    password: String
})

UserSchema.pre('save', function(next){
    let user = this;
    bcrypt.genSalt(saltround,(err,salt)=>{
        bcrypt.hash(user.password,salt,(err, hash)=>{
            user.password = hash;
            next();
        })
    })
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
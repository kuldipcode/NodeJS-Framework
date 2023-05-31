require('dotenv').config()
require('../configs/db');
const admin = require("../models/admin");
const bcrypt = require("bcrypt");
const saltRound = 10;
var pass1;
function hashPass (pass){
    bcrypt.genSalt(saltRound)
    .then((salt)=>{
        console.log(salt);
        return bcrypt.hash(pass, salt)})
    .then((hash)=>{pass1=hash})
    .catch((err)=>{console.log(err)})
}
hashPass("password");
function comparePass(){

}

admin.insertMany([
    {
        firstname: "Kuldipkumar",
        lastname: "Prajapati",
        email: "Kuldip.code@gmail.com",
        profileimage: "pathtoURL",
        password: `${pass1}`
    },
    {
        firstname: "Kuldipkumar",
        lastname: "Prajapati",
        email: "Kuldip.code@gmail.com",
        profileimage: "pathtoURL",
        password: "tempPass"

    }
]).then((data) => {
    console.log("Data Inserted" + data);
}).catch((err) => {
    console.log(err.message)
})
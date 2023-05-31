const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {authorized} = require("../middlewares/auth")
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post('/signup', async function (req, res) {
    let user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.profileimage = req.body.profileimage;
    user.password = req.body.password;
    try {
        let result = await user.save(user)
        let resObj = {id:result._id}
        res.status(201).json({
            success: true,
            message: resObj
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            "success": false,
            "message": error.message || "Error adding ",
        })
    }


})

router.post('/login', async function (req, res) {
    let email = req.body.email;
    let passed = req.body.password;
    console.log(email)
    try {
        let user = await User.find({ email: email }).exec();
        // user passed vs database stored password
        let response = bcrypt.compareSync(passed, user[0].password);
        
        if (!response) {
            res.status(401).json({
                success: false,
                message: "Authentication failed"
            })
        }
        else {
            let token = jwt.sign({
                email: user.email,
                userId: user._id
            }, process.env.token_secret, {
                expiresIn: process.env.token_expiresin
            })
            console.log(user[0]._id)
            let resObj = {id:user[0]._id, token:token}
            res.status(200).json({
                message: resObj,
                success: true
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            "success": false,
            "message": error.message || "Error getting ",
        })
    }

})

router.get('/profile', authorized, async function (req, res) {

    try {
        let user = await User.findOne({}).select("-password -__v").exec();

        res.status(200).send({
                "success": false,
                "message": user,
            })
    } catch (error) {
        res.status(500).send({
            "success": false,
            "message": error.message || "Error getting ",
        })
    }
  



})

router.patch('/profile', authorized, async function (req, res) {
    let email = req.body.email;
    let updateUser = req.body;
    try {
        let user = await User.findOneAndUpdate({email:email}, updateUser, { new: true,
            upsert: true,
            rawResult: true}).select("-password -__v");

        res.status(200).json({
                success: true,
                message: user,
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Error getting ",
        })
    }

})
module.exports = router;
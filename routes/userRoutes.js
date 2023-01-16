const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const { UserModel } = require('../models/userModel')
const jwt = require('jsonwebtoken')

userRouter.get("/", (req, res) => {
    res.send("WELCOME IN USER SECTION")
})

userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body;
    try {
        bcrypt.hash(password, 2, async (err, hash) => {
            if (err) {
                console.log("unable to hash password", err)
            }
            const user = new UserModel({ name, email, gender, password: hash })
            await user.save()
            console.log("resgistered")
            res.send()
        });

    } catch (error) {
        res.send("unable to register", error)
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'masai');
                    console.log(`logged in,welcome : ${user[0].name},\n token : ${token}`)
                    res.send({ "msg": "logged in", "token": `${token}` })
                } else {
                    res.send("wrong credentials")
                }
            });
        } else {
            res.send("login first")
        }
    } catch (error) {
        res.send("error while login")
    }
})

module.exports = { userRouter }

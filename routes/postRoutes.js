const express = require('express')
const postRouter = express.Router()
const { PostModel } = require('../models/postModel')

postRouter.get("/", async (req, res) => {
    try {
        const post = await PostModel.find()
        res.send(post)
    } catch (error) {
        res.send("Unable to fetch posts")
    }
})

postRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const post = new PostModel(payload)
        await post.save()
        res.send("post added")
    } catch (error) {
        res.send("Unable to add posts")
    }
})

postRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    const ID = req.params.id
    const post = await PostModel.findOne({ "_id": ID })
    const post_in_doc = post.userID;
    const userID_making = req.body.userID

    try {
        if (post_in_doc !== userID_making) {
            req.send({ "msg": "this is not your post" })
        } else {
            await PostModel.findByIdAndUpdate({ "_id": ID }, payload)
            res.send("post updated")
        }
    } catch (error) {
        res.send("Unable to update post")
    }
})


postRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id
    const post = await PostModel.findOne({ "_id": ID })
    const post_in_doc = post.userID;
    const userID_making = req.body.userID

    try {
        if (post_in_doc !== userID_making) {
            req.send({ "msg": "this is not your post" })
        } else {
            await PostModel.findByIdAndDelete({ "_id": ID })
            res.send("post deleted")
        }
    } catch (error) {
        res.send("Unable to delete post")
    }
})

module.exports = { postRouter }

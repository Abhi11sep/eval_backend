const express = require('express')
const app = express()
const { connection } = require('./configs/db')
const {authentication} =require('./middlewares/auth')

app.use(cors({
    origin: "*"
}))
app.use(express.json())

app.use("/users", userRouter)

app.use(authentication)
app.use("/post", postRouter)


app.listen(8080, async (req, res) => {
    try {
        await connection
        console.log('connected to db')
    } catch (error) {
        console.log('error in conecting to db')
    }
    console.log('running on port 8080')
})
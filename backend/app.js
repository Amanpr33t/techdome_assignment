const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const connectDB = require('./db/connectDB')
const port = process.env.PORT || 9000
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
require('dotenv').config()
const notFound = require('./middleware/notFound')

const cors = require('cors')
app.use(cors())
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

app.use(fileUpload({ useTempFiles: true }))
const userRouter = require('./routes/userRouter')
const imageRouter = require('./routes/imageRouter')
const blogRouter = require('./routes/blogRouter')

app.use('/user/', userRouter)
app.use('/image/', imageRouter)
app.use('/blog/', blogRouter)
app.use(notFound)
app.use((req, res) => { res.status(400).json({ msg: 'some error occured' }) })

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server running on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()



const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        // required:[true,'please provide a title'],
        trim: true
    },
    content: {
        type: String,
        // required:[true,'please provide content'],
        trim: true
    },
    image: {
        type: String,
        default: '/uploads/forest.jpg'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        //required:[true,'Please provide a user']
    }
}, { timestamps: true })
module.exports = mongoose.model('Blog', BlogSchema)
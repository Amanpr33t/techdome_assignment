

const Blog = require('../models/blog')


const addBlog = async (req, res) => {
    const { title, content } = req.body
    if (content.trim() === '' || title.trim() === '') {
        return res.status(400).json({ status: 'failed', msg: 'Please enter title and content' })
    }
    await Blog.create({ ...req.body, createdBy: req.userId })
    res.status(200).json({ status: 'ok', msg: 'Blog has been added successfully' })
}
const getAllBlogs = async (req, res) => {
    console.log(req.userId)
    const allBlogs = await Blog.find({}).sort('createdAt')
    res.status(200).json({ status: 'ok', allBlogs })
}
const editBlog = async (req, res) => {
    const { content, title, image, blogId } = req.body
    if (title.trim() === '' || content.trim() === '') {
        return res.status(400).json({ status: 'failed', msg: 'Please enter title and content' })
    }
    const blog = await Blog.findOne({ _id: blogId })
    if (!blog) {
        return res.status(400).json({ status: 'failed', msg: 'Blog does not exist' })
    }
    const updatedNote = await Blog.findOneAndUpdate({ _id: blogId },
        { content, title, image, createdBy: req.userId },
        { new: true, runValidators: true })
    if (!updatedNote) {
        return res.status(400).json({ status: 'failed', msg: 'Blog does not exist' })
    }
    res.status(200).json({ status: 'ok' })
}

const getBlog = async (req, res) => {
    const userId = req.userId
    const { blogId } = req.body
    const blog = await Blog.findOne({
        _id: blogId
    })
    if (!blog) {
        return res.status(400).json({ status: 'failed', msg: 'Blog does not exist' })
    }
    res.status(200).json({ status: 'ok', blog })
}

module.exports = {
    addBlog, getAllBlogs, editBlog, getBlog
}
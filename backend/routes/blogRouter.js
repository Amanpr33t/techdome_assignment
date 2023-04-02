const express = require('express')
const router = express.Router()
const { addBlog, getAllBlogs, editBlog, getBlog } = require('../controllers/blog')
const { authenticateUser } = require('../middleware/authentication')

router.post('/addBlog', authenticateUser, addBlog)
router.get('/getAllBlogs', authenticateUser, getAllBlogs)
router.patch('/editBlog', authenticateUser, editBlog)
router.get('/getBlog', authenticateUser, getBlog)

module.exports = router
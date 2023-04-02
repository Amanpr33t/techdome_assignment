const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ status: 'failed', msg: 'authorization invalid' })
        }
        const token = authHeader.split(' ')[1]

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        if (!payload) {
            return res.status(401).json({ status: 'failed', msg: 'authorization invalid' })
        }
        const user = await User.findOne({ _id: payload.userId })
        if (!user) {
            return res.status(401).json({ status: 'failed', msg: 'authorization invalid' })
        }
        req.userId = payload.userId
        next()
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    authenticateUser
}

const User = require('../models/user')
const bcrypt = require('bcryptjs')
const origin = process.env.ORIGIN

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!email || !name || !password) {
            return res.status(400).json({ status: 'failed', msg: 'Please enter name, email and password' })
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.status(400).json({ status: 'failed', msg: 'Email already exists' })
        }
        await User.create({ name, email, password })

        const user = await User.findOne({ email })
        const authToken = user.createJWT()

        res.status(200).json({ status: 'ok', authToken })

    } catch (error) {
        console.log(error)
    }

}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ status: 'failed', msg: 'Please enter name, email and password' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ status: 'failed', msg: 'User does not exist' })
        }

        const isPasswordCorrect = await user.comparePassword(password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ status: 'failed', msg: 'Invalid password' })
        }
        const authToken = user.createJWT()
        res.status(200).json({ status: 'ok', authToken })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    signUp,
    login
}
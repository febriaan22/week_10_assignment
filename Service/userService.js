const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')


const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const validRoles = ['maker', 'approver'];
        const usernameValue = username.trim(' ');
        if (password.length < 8) {
            return false;
        }
        const alphanumericRegex = /[0-9a-zA-Z]/;
        if (!alphanumericRegex.test(password)) {
            return false;
        }
        if (usernameValue === '' || usernameValue == null) {
            res.status(400).json({
                message: 'Username cant be blank'
            });
        }
        if(!validRoles.includes(role)){
            throw new Error('Invalid role');
        }
        const user = await req.db.collection('users').findOne({ username })
        if (user) {
            throw new Error('Username already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await req.db.collection('users').insertOne({ username, password: hashedPassword, role })
        res.status(200).json({
            message: 'User successfully registered',
            data: newUser,
        })
    } catch (error){
        res.status (401).json({ error: error.message })
        }
    }


const login = async (req, res) => {
    const { username, password } = req.body
    const user = await req.db.collection('users').findOne({ username })
    
    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (isPasswordCorrect){
            const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, JWT_SIGN)
            res.status(200).json({
                message: 'User successfully logged in',
                data: token
            })
        } else {
            res.status(401).json({ error: 'Password is incorrect' })
        }

    } else {
        res.status(401).json({ error: 'user not found' })
    }
}

module.exports = {
    register,
    login
}
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersModel = require('../models/userSchema')
const { json } = require('express')


const router = express.Router()

router.post('/', async(req, res)=>{
    const usersData = req.body
    try {
        const user = await usersModel.findOne({email: usersData.email})
        if (!user){
            return res.json('User is not found')
        }
        const isMatch = await bcrypt.compare(usersData.password, user.password)
        if(!isMatch){
            return res.json('password is not a match')
        }
        const payload = {
            id: user._id,
            email: user.email
        }
        const SECRET_KEY = 'MY_SECRET_KEY'
        const TOKEN = jwt.sign(payload, SECRET_KEY, { expiresIn: "2 days"})
        res.status(201).json({
            user: user, 
            token: TOKEN
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(`Server is error`)
    }
})
module.exports = router
const express = require('express')
const usersModel = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const authMiddleware = require('../middleware/authMiddleware')


const router = express.Router()

router.get('/', async(req, res)=> {
    try {
        const users = await usersModel.find()
        res.json(users)
    } catch (error) {
        console.error(error)
    }
})
router.post('/', async(req, res)=> {
    const usersData = req.body
    try {
        const usersExist = await usersModel.findOne({email: usersData.email})
        if(usersExist){
            return res.json({msg: "User already exist"})
        }
        // Creating SALT
        const SALT = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(usersData.password, SALT)
        usersData.password = hashedPassword
        const user = await usersModel.create(usersData)
        res.status(201).json(user)

        // create a new JWT token
const payload = {
    id: user._id,
    email: user.email
}
const SECRET_KEY = 'MY_SECRET_KEY'
const TOKEN = jwt.sign(payload, SECRET_KEY, {expiresIn: "2 Days"})
res.status(201).json({
    user: user,
    token: TOKEN
})

    } catch (error) {
        console.log(error)
        res.status(400).json(" Please try again!!!!")
    }
}) 

// Update user by id
router.put('/:id', async(req, res)=> {
    const id = req.params.id
    const newUserData = req.body
   try {
    const user = await usersModel.findByIdAndUpdate(id, newUserData, {new:true})
    res.status(202).json(user)
   } catch (error) {
       console.error(error)
   }

})
// Delete the user
router.delete('/:id',async(req, res)=> {
    const id = req.params.id
    try {
        await usersModel.findByIdAndDelete(id)
        res.status(200).json({msg: 'User was deleted'})
    } catch (error) {
        console.log(error)
        
    }
})
module.exports = router

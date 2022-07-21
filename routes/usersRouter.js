const express = require('express')
const UsersModel = require('../models/userSchema')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const authMiddleware = require('../middleware/authMiddleware')


// const router = express.Router()

// router.get('/', async(req, res)=> {
//     try {
//         const users = await usersModel.find()
//         res.json(users)
//     } catch (error) {
//         console.error(error)
//     }
// })

// * Create a Router
const router = express.Router()

//* Create or Register a new User
router.post('/', [
    check('username', "Username is required from Middleware!").notEmpty(),
    check("email", "Please use a valid email! from middleware").isEmail(),
    check("password", "Please enter a password").notEmpty(),
    check("password", "Please enter a password with six or more characters").isLength({min: 6}),
] ,async (req, res) => {
    const usersData = req.body

    const errors = validationResult(req)
    // Checks for validation errors
    if (!errors.isEmpty()){
        return res.json(errors.array())
    }

    try {
        // checking if there is an user with this email in the db
        const userExist = await UsersModel.findOne({email: usersData.email})
        // if user exist we return!
        if (userExist) {
            return res.json({msg: "User already exist!"})
        }



// router.post('/', async(req, res)=> {
//     const usersData = req.body
//     try {
//         const usersExist = await usersModel.findOne({email: usersData.email})
//         if(usersExist){
//             return res.json({msg: "User already exist"})
//         }
//         // Creating SALT
        const SALT = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(usersData.password, SALT)
        usersData.password = hashedPassword
        const user = await UsersModel.create(usersData)
        // res.status(201).json(user)

        // create a new JWT token
const payload = {
    id: user._id,
    email: user.email
}
const SECRET_KEY = 'MY_SECRET_KEY'
const TOKEN = jwt.sign(payload, SECRET_KEY, {expiresIn: "40 Days"})
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
        await UsersModel.findByIdAndDelete(id)
        res.status(200).json({msg: 'User was deleted'})
    } catch (error) {
        console.log(error)
        
    }
})
module.exports = router

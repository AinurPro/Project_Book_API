const express = require('express')
const booksModel = require('../models/booksSchema')
const authMiddleware = require('../middleware/authMiddleware')



const router = express.Router()

router.post('/', authMiddleware, async(req, res)=> {
    const booksData = req.body

    try {
        const books = await booksModel.create(booksData)
       res.status(201).json(books)
    } catch (error) {
        console.log(error)
        res.status(400).json('Bad request!!!!')
    }
})
  // get a book by id
router.get('/:id', authMiddleware , async( req, res)=> {
    const id = req.params.id
    try {
        const books = await booksModel.findById(id)
        res.status(200).json(books)
    } catch (error) {
        console.error(error)
        res.status(400).json({msg: "Book id is not found!"})
    }
})

 router.get('/', authMiddleware, async(req, res)=> {
     try {
         const books = await booksModel.find()
         res.status(200).json(books)
     } catch (error) {
         console.log(error)
    
     }
 })
 // Update book by id
 router.put('/:id', authMiddleware, async(req, res)=> {
     const id = req.params.id
     const newBookData = req.body
     try {
         const books = await booksModel.findByIdAndUpdate(id, newBookData, {new:true})
         res.status(202).json(books)
     } catch (error) {
         console.error(error)
     }
 })
 // Delete the book
 router.delete('/:id', authMiddleware, async(req, res)=> {
     const id = req.params.id
     try {
         const books = await booksModel.findByIdAndDelete(id)
         res.status(200).json({msg: 'Book was deleted'})
     } catch (error) {
         console.log(error)
         
     }
 })

module.exports = router
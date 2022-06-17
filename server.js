const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const helmet = require('helmet')



const mongoConfig = require('./config/mongoConfig')
const usersRouter = require('./routes/usersRouter')
const booksRouter = require('./routes/booksRouter')
const authRouter = require('./routes/authRouter')

const app = express()

const PORT = process.env.PORT || 5500


app.use(express.json())
app.use(morgan('dev'))
app.use(helmet())

app.use(express.json())
app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.use('/auth', authRouter)

app.get('/', (req, res)=> {
   res.status(200).json('Books are always worldwide') 
})



app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
    mongoConfig()
})


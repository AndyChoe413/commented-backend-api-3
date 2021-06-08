//brings in express which is a framework that brings in methods that help coding with node
const express = require('express')
//morgan is used to log requests
const logger = require('morgan')
//create a variable to use express
const app = express()
//maps a connection with all userRouter file and all of its functions
const userRouter = require('./routes/user/userRouter')
//this is used to run morgan with express as dev tool
app.use(logger('dev'))
// is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json())
// is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded({ extended: false }))
//creates pre-route for all the functions in the userRouter file
app.use('/api/user', userRouter)
//exports everything in this file to be accessed in other files
module.exports = app
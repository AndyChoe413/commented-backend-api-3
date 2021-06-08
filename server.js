//used to hide variables
require('dotenv').config();
//Mongoose defines a schema for your data models so your documents follow a specific structure with pre-defined data types
const mongoose = require('mongoose')
//entry point for server request
const app = require('./app')
const port = 3000

//connects mongoose schema to mongodb server database
mongoose.connect(process.env.MONGO_DB, {
    //used so server stops yelling 
    userNewUrlParser: true,
    useUnifiedTopology:true,
})
    .then(() => {
        //starts up server
        app.listen(port, () => {
            console.log(`Server is connect on ${port}`)
            console.log('Mongodb Connected')
    })
    })
    //catches errors and logs them
    .catch((e) => {
        console.log(e)
    })
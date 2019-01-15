
const User = require('./Model/User')
const express = require('express')
const mongoose = require('mongoose')

var app = express()
app.use(express.json())

// Server Port
var port = process.env.PORT | 5000;

//Connecting to Mongoose to MongoDB
mongoose
    .connect('mongodb://localhost:27017/test')
    .then(() => console.log("Connected to Test Database..."))
    .catch(err => console.log(`Error : ${err} `))


// Reading All users 
app.get('/allusers', (req,res) => {
    User.find()
    .then( users => res.json(users))
    .catch( err => console.log(err))
    .then( () => console.log('User Details Accessed...'))
})

// Reading User Details
app.get('/userdetails/:user' , (req,res)=> {
    User.find({name: req.params.user})
    .then( data => res.json(data))
    .then( ()=> console.log('Data Read...'))
})

// Adding new User Details
app.post('/adduser', (req,res) => {
    console.log(req.body);
    var newUser = new User(req.body)
    newUser
    .save()
    .then(info => res.json(info))
    .catch(err => console.error(err))
    .then( () => console.log("Data Added..."))
    
})

// Deleting the User Details
app.delete('/deleteuser/:user', (req,res) => {
    User.deleteMany({name: parseInt(req.params.user)})
    .then( info => res.json(info))
    .then( ()=> console.log("User Details Deleted..."))
})

app.listen(port, ()=> console.log(`The server is running on port ${port}... `))

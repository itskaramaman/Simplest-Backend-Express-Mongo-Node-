require('dotenv').config(); // so that we can use env variables

const express =  require('express'); // import express
const app = express(); // create an instance of it
const mongoose = require('mongoose'); // import mongoose

mongoose.connect(process.env.DATABASE_URL); // get the DB URL
const db = mongoose.connection; // get the connection object

db.on('error', (error)=>console.error(error)); // if error in connect then log it
db.once('open', ()=>console.log('Connected to Database')); // if successfully connected then log it.

app.use(express.json()); // lets the server accept json as a body for post or put request

const subsrcibersRouter = require('./routes/subscribers'); // import the routes
app.use('/subscribers', subsrcibersRouter); // whenever we go to localhost:3000/subscibers we will use subsrcibersRouter 

app.listen(3000, ()=> console.log('This server has started')); // every thing working fine backend running in 3000 
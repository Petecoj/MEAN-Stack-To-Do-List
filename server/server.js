const express = require('express');
const app = express();
const toDoRouter = require('./routes/router');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
const databaseUrl =  process.env.MONGODB_URI ||'mongodb://localhost:27017/toDoList'


mongoose.connect(databaseUrl);

mongoose.connection.on('connected', ()=>{
    console.log('mongoose connected to', databaseUrl);
})

mongoose.connection.on('error', (error) =>{
    console.log('mongoos has failed with this error', error);
})

app.use(bodyParser.json());
app.use('/task', toDoRouter);

app.use(express.static('server/public'));


app.listen(PORT, () => {
    console.log('listen on PORT', PORT);
})



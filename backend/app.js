const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://node-api:1234@srh-adb-01.inyaq.mongodb.net/?retryWrites=true&w=majority';
const app = express();
const cors = require('cors');

app.use(cors());
app.get('/',(req,res)=>{
 res.send('Hello !!');
});

const PORT = process.env.PORT || 5001;


mongoose.connect(url, {useNewUrlParser:true});

const con = mongoose.connection

con.on('open', ()=>{
    console.log('connected');
});

app.use(express.json());

const searchRoute = require('./routes/searchRoute');
app.use('/stock',searchRoute);

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))
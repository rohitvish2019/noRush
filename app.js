// Importing required modules
const express = require('express');

// Creating an instance of Express
const app = express();
const PORT = 3000;
const ejs = require('ejs');
const mongoose = require('mongoose');
const db = require('./configs/dbConnection');
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.urlencoded({extended:true}));

app.use(express.static('./public'));
// Define a route for the homepage
app.use('/', require('./routes/index'))
//app.get('/',function(req,res){return res.end('Started')})
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

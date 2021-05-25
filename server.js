const express = require('express');
const dotenv = require('dotenv');


// Route files
const bootcamps = require('./routes/bootcamps')
dotenv.config({path: '.config/config.env'});

const app = express();

// Mount Routers

app.use('/api/v1/bootcamps', bootcamps)


const PORT = process.env.PORT = 5000;

app.listen(PORT, console.log(`Server is running on port${PORT}`))
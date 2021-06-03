const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const connectDB = require('./config/db')
dotenv.config({path: '.config/config.env'});


// Route files
const bootcamps = require('./routes/bootcamps')

const app = express();

// Connect to Data Base
connectDB();
// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));

};

app.use('/api/v1/bootcamps', bootcamps);


const PORT = process.env.PORT = 5000;

app.listen(PORT, console.log(`Server is running on port${PORT}`)) 
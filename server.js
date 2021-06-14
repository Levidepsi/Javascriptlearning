const express = require('express');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/error')

// const morgan = require('morgan')
const logger = require('./middleware/logger')
const connectDB = require('./config/db')


// router
// console.log(morgan);

const bootcamps = require('./routes/bootcamps')

dotenv.config({path: '.config/config.env'});

// Connect DB
connectDB()

const app = express();

// Body Parser
app.use(express.json())

// Dev Logging Middleware
// if (process.env.NODE_ENV === 'development') {
//         app.use(morgan('dev'))
// }

app.use(logger);


// mount routers
app.use('/api/v1/bootcamps', bootcamps);


app.use(errorHandler)


// Connect to Data Base
// Dev Logging Middleware


const PORT = process.env.PORT = 5000;

app.listen(PORT, console.log(`Server is running on port${PORT}`)) 
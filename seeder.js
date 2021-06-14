const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')


// Load env vars

dotenv.config({path: './config.config.env'})
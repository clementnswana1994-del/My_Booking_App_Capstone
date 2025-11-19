import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js'
import Booking from './models/Booking.js';
import Service from './models/Service.js';



import 'dotenv/config'

import connectDB from './db.js';

const app = express()

const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json('Hello World! (from server)')
})

app.listen(port, () => {
    console.log('Listening on port: ' + port)
    connectDB()
})

import express from 'express';
import cors from 'cors';

import 'dotenv/config'

import connectDB from './db.js';

// import Booking from './models/Booking.js';
// import Service from './models/Service.js';
// import User from './models/User.js';

const app = express()

const port = 8080

app.use(cors())

app.get('/', (req, res) => {
    res.json('Hello World! (from server)')
})

app.listen(port, () => {
    console.log('Listening on port: ' + port)
    connectDB()
})

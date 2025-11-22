import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import serviceRoutes from './routes/serviceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';

import cookieParser from 'cookie-parser';

import 'dotenv/config'

import connectDB from './db.js';


const app = express()

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use(cors());


// setup routes
app.use("/api/service", serviceRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
    res.json('Hello World! (from server)')
});



app.listen(port, () => {
    console.log('Listening on port: ' + port)
    connectDB()
})

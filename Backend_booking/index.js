import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

import connectDB from "./db.js";
import authRoutes from "./routes/User.js";
import postRoutes from "./routes/Post.js";
import categoryRoutes from "./routes/Category.js";
import bookingRoutes from "./routes/Booking.js";
// import '@dotenvx/dotenvx/config'

dotenv.config();

// connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(fileUpload({ useTempFiles: true }));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
  res.send("Welcome")
})

// Routes
app.use("/auth/api", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/booking", bookingRoutes);

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log('Listening on port: ' + port)
    connectDB()
})
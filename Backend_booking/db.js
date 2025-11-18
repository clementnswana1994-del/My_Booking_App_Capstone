import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect()
        console.log('MongoDB Connected')
    } catch(e) {
        console.log(e)
    }
}

export default connectDB
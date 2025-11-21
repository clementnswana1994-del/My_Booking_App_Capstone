import mongoose from "mongoose";
// const { Schema } = mongoose;

const userSchema = mongoose.Schema({
   name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const User = mongoose.model("user", userSchema);

export default User;

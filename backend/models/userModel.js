const mongoose = require('mongoose');


const userSchema = mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unque: true,
        trim: true,
        match: [
            /^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/,
            "Please add a valid email"
        ]
    },
    password:{
        type: String,
        required: [true, "Please addd a password"],
        minLenghth: [6, "Password must be up to 6 characters"],
        maxLenghth: [23, "Password must not exceed 23 characters"],
    },
    phone: {
        type: String,
        required: [true, "Please add a phone number"],
        default: "+234",
        uniqe: true,
        trim: true,
    }
     

}, {
    timestamps: true
})
const User = mongoose.model("User", userSchema)
module.exports = User;
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const registerUser = asyncHandler (async(req, res) => {
    const {name , email, password} = req.body;

    //validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill in all the required fields");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Password must be up to 6 characters");
    }

    // check if user email already exists.
    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("Email already exists");
    }

    // create new user
    const user = await User.create({
        name,
        email,
        password ,
    })

    if (user) {
        const {_id, name , email ,phone} = user;
        res.status(201).json({
            _id, name , email ,phone
        });

    }
    
      else {
            res.status(400);
            throw new Error("Invalid user data");
      }
});
module.exports = {
    registerUser,
};
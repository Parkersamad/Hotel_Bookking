const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
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

// user login
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    //Validate Request
    if (!email || !password) {
        res.status(400);
        throw new Error("Please fill in all the required fields")
    }

    // check if user exixts
    const user = await User.findOne({ email });

    if (!user || !user.password) {
        res.status(400);
        throw new Error("User does not exist")
    }

    // check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    if (user && passwordIsCorrect) {
        const {_id, name, email} = user;
        res.status(200).json({
            _id,
            name,
            email,
        });
    }

   
});
module.exports = {
    registerUser,
    loginUser,
};
const asyncHandler = require("express-async-handler");
const Organization = require("../models/organizationModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET,  {expiresIn: "1d"})
}

// register organisation
const registerOrganization = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    adminFirstName: firstName,
    adminLastName: lastName,
    adminPassword: password,
  } = req.body;

  //validation
  if (!name || !email || !phone || !firstName || !lastName || !password) {
    res.status(400);
    throw new Error("Please fill in all the required fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // check if user email already exists.
  const organizationExist = await User.findOne({ email });

  if (organizationExist) {
    res.status(400);
    throw new Error("Email already exists");
  }

  const organization = await Organization.create({
    name,
    email,
    phone,
  });


  // create new user
  const user = await User.create({
    organization: organization._id,
    firstName,
    lastName,
    email,
    phone,
    password,
    role: "admin",
    permissions: {
      createItem: true,
      updateItem: true,
      deleteItem: true,
      viewreports: true, 
      manageUsers: true,
    },
  });

  //Generate token
  const token = generateToken(organization._id);

  // send HTTP-only cookie
  res.cookie("token", token, {
    path : "/",
    httpOnly: true,
    expires: new Date(Date.now() +1000 * 86400), // 1day
    sameSite: "none",
    secure: true,
  })

  if (organization) {
    res.status(201).json({
      organization,
      user,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});  





module.exports = {
  registerOrganization,
}  
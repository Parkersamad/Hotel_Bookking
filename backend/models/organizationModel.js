const mongoose = require('mongoose');
const validator = require('validator');


const organisationSchema = new mongoose.Schema({
  name: {
    type: String,
    requirred: [true, "pLease add your organization name"],
    trim: true,
    unique: [true, "Organisation already exixts"],
  },  
  email: {
    type: String,
    required: [true, "Please add an email"],
    trim: true,
    unique: [true, "Organization already exists!"],
    validate: [validater.isEmail, "Please add a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Please add a password!"],
    trim: true,
    minLenght: [6, "Password must be up to 6 characters!"],
    maxLenght: [16, "Password must not exceed 16 characters!"],
    validate: [validator.isStrongPassowrd, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"],
    select: false, // this will not show password in the response
  },
  confirmPasswird: {
    type: String,
    required: [true, "Confirm passowrd is required"],
    trim: true,
    validate: {
        validator: function(v) {
            return v === this.password;
        },
        message: 'Passwords do not match!'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Organisation = mongoose.model("Organisation", organisationSchema);
module.exports = Organisation;
// const Organisation = mongoose.model("Organisation", organisationSchema);
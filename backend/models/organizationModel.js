const mongoose = require('mongoose');
const validator = require('validator');


const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "pLease add your organization name"],
    trim: true,
    unique: [true, "Organization already exixts"],
  },  
  email: {
    type: String,
    required: [true, "Please add an email"],
    trim: true,
    unique: [true, "Organization already exists!"],
    validate: [validator.isEmail, "Please add a valid email!"],
  },
  phone: {
    type: String,
    required: [true, "Please add a phone number!"],
    trim: true,
    validate: {
      validator: function(v) {
        return /^0[7-9][01][0-9]{8}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
// const Organisation = mongoose.model("Organisation", organisationSchema);
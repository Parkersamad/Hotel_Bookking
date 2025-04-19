const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema( {
    firstName: {
        type: String,
        required: [true, "Please add a Firstname"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please add a Lastname"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unque: [true, "User already exists"],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, "Please add a phone number"],
        trim: true,
        validate: {
            validator: function(v) {
                return /^0[7-9][01][0-9]{8}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
        trim: true,
        minLenghth: [6, "Password must be up to 6 characters"],
        maxLenghth: [23, "Password must not exceed 23 characters"],
        select: false // this will not show password in the response
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organisation',
        required: [true, "Please add an organization"]
    },
    role: {
        type: String,
        enum: ["admin", "manager", "staff"],
        required: [true, "Please add a role"],
        default: "staff"
    },
    permissioms: {
        createdItem: {type: Boolean, default: false },
        updateItem: {type: Boolean, default: false },
        deleteItem: {type: Boolean, default: false },
        viewreports: {type: Boolean, default: false },
        manageUsers: {type: Boolean, default: false },
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    },{ timestamps: true})

    // Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
  
  // Method to compare passwords
  userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };


const User = mongoose.model("User", userSchema)
module.exports = User;
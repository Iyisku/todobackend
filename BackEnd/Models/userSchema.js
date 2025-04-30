const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  userId :{
    type: mongoose.Types.ObjectId,
    unique: true,
    default: () => new mongoose.Types.ObjectId(),
},
});


//Encrypting password before saving for security
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


// Compare password method to check if the entered password matches the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Generate JWT token for authentication
userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      email: this.email,
      userId: this._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '2h'
    }
  );
};

module.exports = mongoose.model('User', userSchema);

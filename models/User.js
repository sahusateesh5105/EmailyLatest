const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  googleId: String,
  facebookId: String,
  username: { 
    type: String, 
    unique: true, 
    sparse: true,
    trim: true 
  },
  password: { 
    type: String, 
    // Do not set 'required: true' because Google/Facebook users won't have a password!
  },
  credits: { type: Number, default: 0 },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});
mongoose.model('users', userSchema);

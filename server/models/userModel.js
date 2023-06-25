const mongoose = require('mongoose');


const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    return next();
  } catch (err) {
    return next(err);
  }
})

userSchema.statics.comparePassword = async function(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model('user', userSchema)

module.exports = User;

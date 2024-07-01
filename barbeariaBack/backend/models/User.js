const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');

const BarberSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String },
  type: { type: String, default: 'barber' },
  queueLength:{ type: Number, required: true,default: 0},
  services: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  blockedTimes: [{
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    reason: { type: String }
  }]
});

module.exports = mongoose.model('Barber', BarberSchema);

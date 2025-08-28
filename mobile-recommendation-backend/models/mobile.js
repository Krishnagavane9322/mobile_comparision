const mongoose = require('mongoose');

const mobileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  ram: { type: Number, required: true },      // GB
  storage: { type: Number, required: true },  // GB
  screenSize: { type: Number, required: true }, // inches
  battery: { type: Number },                  // mAh
  camera: { type: Number },                   // MP
  processor: { type: String },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

mobileSchema.index({ brand: 1, price: 1, ram: 1, storage: 1 });
module.exports = mongoose.model('Mobile', mobileSchema);

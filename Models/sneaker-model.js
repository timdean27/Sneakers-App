const mongoose = require('../Db/connection');

const SneakerSchema = new mongoose.Schema(
    {
        name: {type: String,required: true},
        brand: {type: String},
        size: {type: Number,required: true},
        color: {type: String},
        style:{type: String},
        styleCode: {type: String,required: true},
        retailPrice: {type: Number},
        imageLinks: [String],
        current: {type: Boolean, default: true,}
    },
    
  );
  
  const Sneaker = mongoose.model('sneaker', SneakerSchema);
  
  module.exports = Sneaker;
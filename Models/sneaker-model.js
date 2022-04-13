const mongoose = require('../Db/connection');

const SneakerSchema = new mongoose.Schema(
    {
        name: {type: String,required: true,},
        brand: {type: String,required: true,},
        size: {type: Number,required: true,},
        color: {type: String},
        styleCode: {type: String,required: true,},
        current: {type: Boolean, default: true,}
    },
    
  );
  
  const Sneaker = mongoose.model('sneaker', SneakerSchema);
  
  module.exports = Sneaker;
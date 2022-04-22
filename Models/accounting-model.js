const mongoose = require('../Db/connection');

const AccountingSchema = new mongoose.Schema(
    {
        uniqueID:{type: String,required: true},
        name: {type: String},
        retailPrice: {type: Number},
        soldPrice: {type: Number},
        marketPrice:{type: Number},
        status: {type: String, default: "current"},
        releaseDate: {type: Date},
        soldDate:{type: Date},
        
    },
    
  );
  
  const Accounting = mongoose.model('accounting', AccountingSchema);
  
  module.exports = Accounting;
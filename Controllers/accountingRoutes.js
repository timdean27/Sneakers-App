const express = require('express');
const Accounting = require('../models/accounting-model');
const Sneaker = require('../models/sneaker-model');
const routerAcc= express.Router();

routerAcc.get('/', (req, res) => {
    
    Accounting.find()
    .then((account) => res.render('accounting/accountingMain',
    {
        account:account,
    }
    ))
    .catch(err => res.send(err))

});

routerAcc.get('/:id/edit', (req, res) => {
    console.log(req.params.id)
    Accounting.findById(req.params.id)
    .then(account => res.render('accounting/AccEdit',
    {
        account:account,
    }
    ))
    .catch(err => res.send(err))

});
//edit by ID we found
routerAcc.put('/:id', (req, res) => {
    console.log(req.body)
    let sold = req.body.soldPrice;
    console.log("sold",sold)
    let retail = req.body.retailPrice;
    console.log("reatil",retail)
    let profit = (sold - retail)
    console.log(profit)
    Accounting.findOneAndUpdate({ _id: req.params.id },{
            soldDate:req.body.soldDate,
            soldPrice:req.body.soldPrice,
            marketPrice:req.body.marketPrice,
            profit:profit,
    })
    .then(() => {
        res.redirect('/accounting');
      })

    .catch(err => res.send(err))
    
  });



module.exports = routerAcc


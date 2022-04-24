const express = require('express');
const Accounting = require('../models/accounting-model');
const Sneaker = require('../models/sneaker-model');
const routerAcc= express.Router();

routerAcc.get('/', (req, res) => {
    
    console.log(req.query.filterBTN)
    let searchFilter = req.query.filterBTN
    let sortBY = {uniqueID: 1}
    let sortReturn = sortFunc(sortBY,searchFilter)
    console.log(sortBY)
    console.log('sortReturn ',sortReturn)
    Accounting.find().sort(sortReturn)
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


function sortFunc(sortBY,searchFilter){
    console.log("Printing from sortFunc",searchFilter)
    let split= searchFilter.split('-')
    console.log("split",split[1])
    if(split[0] == "up"){
        sortBY = {[split[1]]: -1}
      }
    else if (split[0]== "down"){
          sortBY = {[split[1]]: 1}
      }
    console.log("Printing from sortFunc sortBY ",sortBY)
   return sortBY
  }
const express = require('express');
const Accounting = require('../models/accounting-model');
const Sneaker = require('../models/sneaker-model');
const routerAcc= express.Router();

routerAcc.get('/', (req, res) => {
    let filter = req.query.filterBTN
    let splitFilter
    if (filter != null){
        splitFilter= filter
    }
    else {splitFilter = "down-uniqueID"}

    Accounting.find().sort(sortFunc(splitFilter))
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
    //console.log(req.body)
    let sold = req.body.soldPrice;
    //console.log("sold",sold)
    let retail = req.body.retailPrice;
    //console.log("reatil",retail)
    let profit = (sold - retail)
    //console.log(profit)
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

  routerAcc.delete('/:id', (req, res) => {
    const id = req.params.id;
    Accounting.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/accounting');
      })
      .catch(console.error);
        });


module.exports = routerAcc


function sortFunc(splitFilter){
    let sortBY = {}
    //console.log("Printing from sortFunc",splitFilter)
    splitFilter = splitFilter.split("-")
    //console.log("split",splitFilter[1])
    if(splitFilter[0] == "up"){
        sortBY = {[splitFilter[1]]: -1}
      }
    else if (splitFilter[0]== "down"){
          sortBY = {[splitFilter[1]]: 1}
      }
    //console.log("Printing from sortFunc sortBY ",sortBY)
   return sortBY
  }
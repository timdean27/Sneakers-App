const express = require('express');
const Accounting = require('../models/accounting-model');
const Sneaker = require('../models/sneaker-model');
const routerAcc= express.Router();

routerAcc.get('/', (req, res) => {
    Accounting.find()
    .then((accounting) => res.render('accounting/accountingMain',
    {
        accounting:accounting,
    }
    ))
    .catch(err => res.send(err))

});



module.exports = routerAcc
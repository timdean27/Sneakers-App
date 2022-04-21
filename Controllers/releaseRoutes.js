const express = require('express');
const Sneaker = require('../models/sneaker-model');
const routerRelease = express.Router();
let oneback

routerRelease.get('/', (req, res) => {

        res.render('sneakers/releases/main')
  
  });

  routerRelease.get('/:brand', (req, res) => {
    let brand = capFirstLetter(req.params.brand)
    console.log("brand",brand)
    //let searchFilter = document.getElementById('dropDown')
    //let searchFilter = req.get('dropDown')
    let searchFilter = req.query.dropDown
    let sortBY = {}
    console.log("filter",searchFilter)
    let sortReturn = sortFunc(sortBY,searchFilter)
    console.log("sortReturn",sortReturn)
  
    let search = {}
    let typedname = req.query.name
    let typedsize = req.query.size
  
    let searchReturn = searchFunc(search,typedname,typedsize)
    console.log("searchReturn",searchReturn)
  
    Sneaker.find(searchReturn).sort(sortReturn)
      .then((sneaker) => res.render('sneakers/releases/brand',
      {
          sneakers:sneaker,
          search: req.query,
          brand:brand
      }
      ))
      .catch(err => res.send(err))
});

  module.exports = routerRelease

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functions and Logic 

///search function
function searchFunc(search,typedname,typedsize){ 

    if(typedname != null && typedname !== '')
    {
      search.name = new RegExp(typedname, 'i')
      //console.log("search.name2",search.name)
    }
    if(typedsize != null && typedname == '' && typedsize != '')
    {
      search.size = typedsize
      //console.log("search.size",search.size)
    }
    if(typedname != null && typedname !== '' && typedsize != '' && typedsize != null)
    {
      search.name = new RegExp(typedname, 'i')
      search.size = typedsize
      //console.log("search.name2",search.name)
    }
    return search
    }
    
    ///sortfunction
    function sortFunc(sortBY,searchFilter){
      console.log("Printing from sortFunc",searchFilter)
    
    
      if(searchFilter == "priceHighLow"){
        sortBY = {retailPrice: -1}
      }
      else if (searchFilter== "sizeLtoS"){
        sortBY = {size: -1}
      }
      else if (searchFilter == "sizeStoL"){
        sortBY = {size: 1}
      }
      else{
        sortBY = {retailPrice: 1}
      }
      console.log("Printing from sortFunc sortBY ",sortBY)
     return sortBY
    }

    /////make first letter of cap
function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

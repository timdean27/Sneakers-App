const express = require('express');
const Sneaker = require('../models/sneaker-model');


let search = {}
let sortTech = {}
//search.name = "charmeleon"
//search.name = RegExp("C", 'i')
//search.size = 7
sortTech = {retailPrice: 1}
console.log(search)


// Sneaker.find(search, function(err, stuff){
//     console.log(stuff);
//     console.log(stuff.length);
//     //mongoose.close();
//   });

  Sneaker.find(search).sort({size: -1}).exec(function(err, stuff){
    console.log(stuff);
    console.log(stuff.length);
    
  });

  // Sneaker.find(search).sort({retailPrice: 1}).then(function(err, stuff)
  // {
  //   console.log(stuff);
  //   console.log(stuff.length);
  // }
  // )
  // .catch(err => console.log(err))
 
const express = require('express');
const Sneaker = require('../models/sneaker-model');


let search = {}
search.name = "charmeleon"
//search.name = RegExp("C", 'i')
//search.size = 7

console.log(search)


  Sneaker.find(search, (err, stuff) => {
    console.log(stuff);
    console.log(stuff.length);
    //mongoose.close();
  });
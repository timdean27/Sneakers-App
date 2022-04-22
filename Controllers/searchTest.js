const express = require('express');
const Sneaker = require('../models/sneaker-model');
const Accounting = require('../models/accounting-model');

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

  // Sneaker.find(search).sort({size: -1}).exec(function(err, stuff){
  //   console.log(stuff);
  //   console.log(stuff.length);
    
  // });

  // Sneaker.find(search).sort({retailPrice: 1}).then(function(err, stuff)
  // {
  //   console.log(stuff);
  //   console.log(stuff.length);
  // }
  // )
  // .catch(err => console.log(err))
 

function searchByUnigueID(search){

for(let i = 0; i < 20; i++){
  if(i<10){
    search = {uniqueID: `0000000${i}`}
      Sneaker.find(search,{ uniqueID: 1, _id: 0 },(err, stuff) =>{
        console.log(stuff);
          //mongoose.close();
      })
    }
    else if (i>=10 && i < 100){
      search = {uniqueID: `000000${i}`}
        Sneaker.find(search,{ uniqueID: 1, _id: 0 },(err, stuff) =>{
          console.log(stuff);
            //mongoose.close();
        })
      }
  }
}

searchByUnigueID()
// Accounting.find(search,(err, stuff) =>{
//   console.log(stuff);
//   console.log(stuff.length);
//     //mongoose.close();
// });
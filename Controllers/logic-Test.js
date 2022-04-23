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

  let totalSneakers
// Sneaker.find({},function(err, stuff)
//   {
//     totalSneakers = stuff.length
//   })
//   console.log(totalSneakers);

// function searchByUnigueID(search,totalSneakers ){

// for(let i = 0; i < 12; i++){
//   if(i<10){
//     search = {uniqueID: `0000000${i}`}
//       Sneaker.find({},{ uniqueID: 1,
//                               name:1,
//                               retailPrice:1,
//                               releaseDate:1,
//                               _id: 0 },(err, stuff) =>{
//         console.log(stuff);
//           //mongoose.close();
//       })
//     }
//     else if (i>=10 && i < 100){
//       search = {uniqueID: `000000${i}`}
//       Sneaker.find({},{ uniqueID: 1,
//                             name:1,
//                             retailPrice:1,
//                             releaseDate:1,
//                             _id: 0 },(err, sneaker) =>{

//        Accounting.findOneAndUpdate({uniqueID: `000000${i}`,
//                             name:sneakerName,
//                             retailPrice:sneakerRetailPrice ,
//                             releaseDate:sneakerReleaseDate ,}
//                             ,(err, stuff) =>{

//     });
//             //mongoose.close();
//         })
//       }
//   }
//   }

// searchByUnigueID()
// Accounting.findOneAndUpdate({uniqueID: `000000${i}`,
//                             name:sneakerName,
//                             retailPrice:sneakerRetailPrice ,
//                             releaseDate:sneakerReleaseDate ,}
//                             ,(err, stuff) =>{
//   console.log(stuff);
//   console.log(stuff.length);
// });




// search = {uniqueID: `000000${i}`}
// function searchByUnigueID(){
// Sneaker.find({},{ uniqueID: 1,
//                       name:1,
//                       retailPrice:1,
//                       releaseDate:1,
//                       _id: 0 },(err, sneakers) =>{
// sneakers.forEach(sneaker=>{
//           Accounting.findOneAndUpdate({uniqueID: sneaker.uniqueID},
//           {
//           name:sneaker.name,
//           retailPrice:sneaker.retailPrice,
//           releaseDate:sneaker.releaseDate},
//           {new:true}
//           ,(err, stuff) =>{
//       console.log(stuff);
//         });
//       })

//   })
// }


Accounting.find({uniqueID: "00000001"}, function(err, stuff){
    console.log(stuff);
    console.log(stuff.length);
    //mongoose.close();
  });
const express = require('express');
const Sneaker = require('../models/sneaker-model');
const Accounting = require('../models/accounting-model');
const router = express.Router();
let onePageBack =[]


/////current is "/home"
router.get('/', (req, res) => {
  ///sortfunction
  let mainFilter = req.query.dropDown
  let splitFilterMain
    if (mainFilter != null){
      splitFilterMain= mainFilter
    }
    else {splitFilterMain = "up-releaseDate"}
  let sortBY = {}
  let sortReturn = sortFunc(sortBY,splitFilterMain)
  // console.log("sortReturn",sortReturn)

  ///search function
  let search = {}
  let typedname = req.query.name
  let typedsize = req.query.size
  let searchReturn = searchFunc(search,typedname,typedsize)
  // console.log("searchReturn",searchReturn)

  Sneaker.find(searchReturn).sort(sortReturn)
    .then((sneaker) => res.render('sneakers/current',
    {
        sneakers:sneaker,
        search: req.query
    }
    ))
    .catch(err => res.send(err))
    UPDateAccColl()
});

router.get('/nonCurrent', (req, res) => {
  ///sortfunction
  let mainFilter = req.query.dropDown
  let splitFilterMain
    if (mainFilter != null){
      splitFilterMain= mainFilter
    }
    else {splitFilterMain = "up-releaseDate"}
  let sortBY = {}
  let sortReturn = sortFunc(sortBY,splitFilterMain)

  ///search function
  let search = {}
  let typedname = req.query.name
  let typedsize = req.query.size

  let searchReturn = searchFunc(search,typedname,typedsize)
  //console.log("searchReturn",searchReturn)

  Sneaker.find(searchReturn).sort(sortReturn)
    .then((sneaker) => res.render('sneakers/nonCurrent',
    {
        sneakers:sneaker,
        search: req.query
    }
    ))
    .catch(err => res.send(err))

});



//create route = adds data into the model
router.get('/new', (req, res) => {
    onePageBack[0] = req.get('referer')


///////function to creat a uniqueID
    let getUniqueID
    let UniqueID = uniqueIDGenerator(getUniqueID)
    console.log("UniqueID", UniqueID)


    res.render('sneakers/new', { sneaker: new Sneaker(),
    onePageBack:onePageBack[0],
    UniqueID:UniqueID 
    })
})

router.post('/', (req, res) => {

    req.body.styleCode = req.body.styleCode.toUpperCase()
    req.body.size = parseFloat(req.body.size)
    req.body.brand = capFirstLetter(req.body.brand)
  
    Sneaker.create(req.body)
    .then(()=>{Accounting.create({uniqueID:req.body.uniqueID}).then(() => {
      res.redirect(onePageBack[0]);
      UPDateAccColl()
    })
  .catch(err => res.send(err))})
    
})

///show by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    onePageBack[0] = req.get('referer')
    Sneaker.findById(id)
    .then(sneaker => res.render('sneakers/single',
    {
        sneaker:sneaker,
        onePageBack:onePageBack[0]
    }
    ))
    .catch(err => res.send(err))
   
});
///show by ID

// route to udate a sneaker
//find by ID

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    onePageBack[1] = req.get('referer')
    Sneaker.findById(id)
    .then(sneaker => res.render('sneakers/edit',
    {
        sneaker:sneaker,
        onePageBack:onePageBack[1]
        
    }
    ))
    .catch(err => res.send(err))

});


//edit by ID we found
router.put('/:id', (req, res) => {
    req.body.styleCode = req.body.styleCode.toUpperCase()
    req.body.size = parseFloat(req.body.size)
    req.body.brand = capFirstLetter(req.body.brand)
    console.log("onePageBack[0]",onePageBack[0])
    console.log("onePageBack[1]",onePageBack[1])
    const id = req.params.id;
    Sneaker.findByIdAndUpdate(
        id,
        req.body
        )
    .then(() => {
        res.redirect(onePageBack[1]);
        UPDateAccColl()
      })

    .catch(err => res.send(err))
    
  });



/////Delete by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    onePageBack[0] = req.get('referer')
    Sneaker.findByIdAndDelete(id)
    .then(() => {
        res.redirect(onePageBack[0]);
      })
      .catch(console.error);
        });


module.exports = router

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
function sortFunc(sortBY,splitFilterMain){
  console.log("Printing from sortFunc",splitFilterMain)
  splitFilterMain = splitFilterMain.split("-")
  console.log("split",splitFilterMain[1])
  if(splitFilterMain[0] == "up"){
      sortBY = {[splitFilterMain[1]]: -1}
    }
  else if (splitFilterMain[0]== "down"){
        sortBY = {[splitFilterMain[1]]: 1}
    }
    else{{retailPrice: -1}}
  console.log("Printing from sortFunc sortBY ",sortBY)
 return sortBY
}


/////make first letter of cap
function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



/////pass data from Sneaker collection to Accounting 
function UPDateAccColl(){
  Sneaker.find({},{ uniqueID: 1,
                        name:1,
                        retailPrice:1,
                        releaseDate:1,
                        status:1,
                        _id: 0 },(err, sneakers) =>{
  sneakers.forEach(sneaker=>{
            Accounting.findOneAndUpdate({uniqueID: sneaker.uniqueID},
            {
            name:sneaker.name,
            retailPrice:sneaker.retailPrice,
            releaseDate:sneaker.releaseDate,
            status:sneaker.status,
          },
            {new:true}
            ,(err, stuff) =>{
        //console.log("UPDateAccColl",stuff);
          });
        })
  
    })
  }


///////function to creat a uniqueID

function uniqueIDGenerator(getUniqueID){

  Accounting.find({},function(err, stuff){
    let currentIvalue = stuff.length
    console.log("inside func currentIvalue",currentIvalue);

    for(let i = currentIvalue+1; i <= currentIvalue+1; i++){
      if(i<10){
        getUniqueID = `0000000${i}`;
      console.log("inside Unique ID if statment one",getUniqueID)
      }
      else if (i>=10 && i < 100){
        getUniqueID = `000000${i}`;
        console.log("inside Unique ID if statment two",getUniqueID)
      }
      else if (i>=100 && i < 1000){
        getUniqueID = `00000${i}`
     }
      else if (i>=1000 && i < 10000){
        getUniqueID = `0000${i}`
      }
    }
    console.log("getUniqueID inside find",getUniqueID)
      return getUniqueID
  });
  console.log("getUniqueID inside func before return",getUniqueID)
      return getUniqueID
} 

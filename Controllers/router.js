const express = require('express');
const Sneaker = require('../models/sneaker-model');
const Accounting = require('../models/accounting-model');
const router = express.Router();
let onePageBack =[]


/////current is "/home"
router.get('/', (req, res) => {
  
  let searchFilter = req.query.dropDown
  let sortBY = {}
  let sortReturn = sortFunc(sortBY,searchFilter)

  let search = {}
  let typedname = req.query.name
  let typedsize = req.query.size
  let searchReturn = searchFunc(search,typedname,typedsize)
  console.log("searchReturn",searchReturn)

  Sneaker.find(searchReturn).sort(sortReturn)
    .then((sneaker) => res.render('sneakers/current',
    {
        sneakers:sneaker,
        search: req.query
    }
    ))
    .catch(err => res.send(err))
   
});

router.get('/nonCurrent', (req, res) => {
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

  res.render('sneakers/new', { sneaker: new Sneaker(),
    onePageBack:onePageBack[0]
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
        console.log(stuff);
          });
        })
  
    })
  }




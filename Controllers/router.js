const express = require('express');
const Sneaker = require('../models/sneaker-model');
const router = express.Router();
let oneback


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



//create route = addes data into the model
router.get('/new', (req, res) => {
  oneback = req.get('referer')

  res.render('sneakers/new', { sneaker: new Sneaker()})

  })

router.post('/', (req, res) => {
    req.body.styleCode = req.body.styleCode.toUpperCase()
    req.body.size = parseFloat(req.body.size)

    Sneaker.create(req.body)
    .then(() => {
        res.redirect(oneback);
      })
    .catch(err => res.send(err))
})

///show by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Sneaker.findById(id)
    .then(sneaker => res.render('sneakers/single',
    {
        sneaker:sneaker
    }
    ))
    .catch(err => res.send(err))
   
});
///show by ID

// route to udate a sneaker
//find by ID

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    oneback = req.get('referer')

    Sneaker.findById(id)
    .then(sneaker => res.render('sneakers/edit',
    {
        sneaker:sneaker
    }
    ))
    .catch(err => res.send(err))

});


//edit by ID we found
router.put('/:id', (req, res) => {
    req.body.styleCode = req.body.styleCode.toUpperCase()
    req.body.size = parseFloat(req.body.size)


    const id = req.params.id;
    Sneaker.findByIdAndUpdate(
        id,
        req.body
        )
    .then(() => {
        res.redirect(oneback);
      })

    .catch(err => res.send(err))
  });



/////Delete by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    oneback = req.get('referer')
    Sneaker.findByIdAndDelete(id)
    .then(() => {
        res.redirect(oneback);
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




const express = require('express');
const Sneaker = require('../models/sneaker-model');
const router = express.Router();

/////current is "home"

router.get('/', (req, res) => {
    let search = {}
    let typedname = req.query.name
    let typedsize = req.query.size
    //console.log("typedname",typedname)
    //console.log("typedsize",typedsize)
    //console.log("search",search)
    //console.log("search.name",search.name)
    if(req.query.name != null && req.query.name !== '')
    {
      search.name = new RegExp(typedname, 'i')
      //console.log("search.name2",search.name)
    }
    if(req.query.size != null && req.query.name == '')
    {
      search.size = typedsize
      //console.log("search.size",search.size)
    }
    Sneaker.find(search)
    .then((sneaker) => res.render('sneakers/current',
    {
        sneakers:sneaker,
        search: req.query
    }
    ))
    .catch(err => res.send(err))
   
});

router.get('/nonCurrent', (req, res) => {
  let search = {}
  let typedname = req.query.name
  let typedsize = req.query.size
  //console.log("typedname",typedname)
  //console.log("typedsize",typedsize)
  //console.log("search",search)
  //console.log("search.name",search.name)
  if(req.query.name != null && req.query.name !== '')
  {
    search.name = new RegExp(typedname, 'i')
    //console.log("search.name2",search.name)
  }
  if(req.query.size != null && req.query.name == '')
  {
    search.size = typedsize
    //console.log("search.size",search.size)
  }
  Sneaker.find(search)
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
    res.render('sneakers/new', { sneaker: new Sneaker()})
   
  })

router.post('/', (req, res) => {
    req.body.styleCode = req.body.styleCode.toUpperCase()
    req.body.size = parseFloat(req.body.size)
    if (req.body.current == "true") {
      console.log("current","true",req.body.current);
      req.body.current = true
    } else {
      console.log("current","false",req.body.current);
      req.body.current = false
    }
    //console.log(req.body.size)
    Sneaker.create(req.body)
    .then(() => {
        res.redirect('/home');
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
    if (req.body.current == "true") {
      console.log("print current","true",req.body.current);
      req.body.current = true
    } else {
      console.log("print current","false",req.body.current);
      console.log("print currentType","false",(typeof req.body.current));
      req.body.current = false
    }
    const id = req.params.id;
    Sneaker.findByIdAndUpdate(
        id,
        req.body
        )
    .then(() => {
        res.redirect('/home');
      })
    // .then(sneaker => res.json(sneaker))
    .catch(err => res.send(err))
  });


/////Delete by id
router.delete('/:id', (req, res) => {
    const id = req.params.id;
  
    Sneaker.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/home');
      })
      .catch(console.error);
        });


 

module.exports = router
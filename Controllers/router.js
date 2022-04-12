const express = require('express');
const Sneaker = require('../models/sneaker-model');
const router = express.Router();

/////index is "home"

router.get('/', (req, res) => {

    Sneaker.find({})
    .then((sneaker) => res.render('index.ejs',
    {
        sneakers:sneaker
    }
    ))
    .catch(err => res.send(err))
   
});


//create route = addes data into the model
router.get('/new', (req, res) => {
    res.render('new', { sneaker: new Sneaker()})
   
  })

router.post('/', (req, res) => {
    
    req.body.size = req.body.size[0]
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
    .then(sneaker => res.render('single',
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
    .then(sneaker => res.render('edit',
    {
        sneaker:sneaker
    }
    ))
    .catch(err => res.send(err))
   
});
//find by ID
router.put('/:id', (req, res) => {
    req.body.size = req.body.size[0]
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


/////Delete
router.delete('/:id', (req, res) => {
    const id = req.params.id;
  
    Sneaker.findByIdAndDelete(id)
    .then(() => {
        res.redirect('/home');
      })


      .catch(console.error);
        });


 

module.exports = router
const Sneaker = require('../models/sneaker-model');
const seedData = require('./sneaker-seeds.json');


Sneaker.deleteMany({})
  .then(() => {

    return Sneaker.insertMany(seedData);
  })
  .then(console.log)
  .catch(console.error)
  .finally(() => {
    process.exit();
  });

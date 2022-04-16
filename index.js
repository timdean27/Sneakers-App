const express = require('express')
const app = express()
require('ejs')
const ejsLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
//const cors = require('cors')

const requireRouter = require('./Controllers/router');
app.set('view engine', 'ejs');


//app.use(cors())
app.use(express.static('public'))
app.use(methodOverride('_method'));
app.use(express.json());
app.use(ejsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use('/home', requireRouter);



app.set('port', process.env.PORT || 3000);


app.listen(3000, () => {
    console.log("app listening on port 3000")
  })
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
mongoose.connect('mongodb://admin:admin25@ds143156.mlab.com:43156/scissors')
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));

//Settings
app.set('port', process.env.PORT || 3000);
app.use(cors());

//Middlewares: funciones que se ejecutan antes de entrar a las rutas
app.use(morgan('dev'));
app.use(express.json());

//Bodyparser
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/stylists', require('./routes/Stylists'));
app.use('/api/clients', require('./routes/Clients'));
app.use('/api/auth', require('./routes/Auth'));

//Static files
app.use(express.static(__dirname + '\\public'));


//Server is listening
app.listen(app.get('port'), () => {
  console.log("port working", app.get('port'))
});

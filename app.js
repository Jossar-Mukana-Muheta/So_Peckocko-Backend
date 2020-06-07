const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')

// Routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce')



// BDD
mongoose.connect('mongodb+srv://jossar:Kelycia14@sopekocko-bupfs.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'))

// Gestion erreur CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.use(bodyParser.json());

  app.use('/api/auth/', userRoutes);
  app.use('/api/sauces/', sauceRoutes);




  

module.exports = app;
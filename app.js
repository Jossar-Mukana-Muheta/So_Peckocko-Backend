const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const User = require('./models/user');
const Sauce = require('./models/sauce');
const userRoutes = require('./routes/user');


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




  

module.exports = app;
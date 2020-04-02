const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Mah',
    password : 'system',
    database : 'SMART-BRAIN'
  }
});

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/getAllUsers' , (req , res) => { profile.getAllUsers(req , res , db) })
app.get('/profile/:id' , (req , res) => { profile.handleProfile(req  , res , db) })
app.put('/image' , (req , res) => { image.handleImage(req , res , db) })
app.post('/imageUrl' , (req , res) => { image.handleImageUrl(req , res) })
app.post('/signin' , signin.handleSignin(db , bcrypt))  //Anther way to call function (go to signin.js)
app.post('/register' , register.handleRegister(db , bcrypt))    //Anther way to call function (go to register.js)

app.listen(3001 , () => {
    console.log('app is running on port 3001');
});
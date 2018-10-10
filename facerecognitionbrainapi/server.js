const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const config = require('./config.json');

//Connecting the database using knex.js
const db = require('knex')({
  client: config.client,
  connection: {
    host : config.connection.host,
    user : config.connection.user,
    password : config.connection.password,
    database : config.connection.database
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	// res.json("This is working");
	db.select('*').from('users').returning('*')
	.then(users => {
		res.json(users);
	}).catch(err => {
		console.error(err);
		res.status(400).json('No users in the database bro');
	})
});

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)});


app.listen(3000, ()=>{
	console.log('Listening to 3000');
});

//
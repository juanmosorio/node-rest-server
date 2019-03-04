const express = require('express');
const app = express();

const User = require('../models/user-model');

// Encriptando password.
const bcrypt = require('bcrypt');

app.get('/user', (req, res) => {
	res.json('Get User');
});

app.post('/user', (req, res) => {
	let body = req.body;

	let user = new User({
		name: body.name,
		email: body.email,
		password: bcrypt.hashSync(body.password, 10),
		role: body.role
	});
	

	// APLICACIÓN DEL SCHEMA.
	user.save((err, userDB) => {
		if (err) {
			return res.status(400).json({
				ok: false,
				err: err
			});
		}

		// userDB.password = null;

		res.json({
			ok: true,
			user: userDB
		});
	});
});

app.put('/user/:id', (req, res) => {
	let id = req.params.id;

	res.json({
		id
	});
});

app.delete('/user', (req, res) => {
	res.json('Delete User');
});


module.exports = app;
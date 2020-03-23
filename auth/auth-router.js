const router = require('express').Router();
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const restrict = require('./authenticate-middleware');

router.post('/register', async (req, res) => {
	// implement registration
	try {
		const credentials = req.body;
		if (!credentials.username || !credentials.password) {
			res.status(400).json({ message: 'Please provide username and password to register' });
		}
		credentials.password = bcrypt.hashSync(credentials.password, 13);
		await db('users').insert(credentials);

		res.json({ message: `successfully added ${credentials.username}` });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'server error' });
	}
});

router.post('/login', async (req, res) => {
	// implement login
	const credentials = req.body;
	const user = await db('users').select('*').where('users.username', req.body.username).first();

	if (!user || !bcrypt.compare(credentials.password, user.password)) {
		res.status(401).json({ message: 'invalid credentials' });
	}
	const payload = {
		userId: user.id,
		userName: user.username
	};
	const token = jwt.sign(payload, 'keep it secret');
	res.cookie('token', token);
	res.json({ message: `Welcome ${user.username}` });
});

// router.get('/', restrict(), async (req, res) => {
// 	try {
// 		const users = await db('users').select('*');
// 		res.json(users);
// 	} catch (err) {
// 		res.status(500).json({ message: 'server error' });
// 	}
// });

module.exports = router;

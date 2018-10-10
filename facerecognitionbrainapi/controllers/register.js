
const handleRegister = (req, res, db, bcrypt) => {
	//new user to be created
	const {name, email, password} = req.body;

	if(!email || !password || !name){
		return res.status(400).json('Please fill in all details');
	}

	const hash = bcrypt.hashSync(password);

	db.transaction(trx => {
		trx.insert({
			email: email, 
			hash: hash
		}).into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users').insert({
			name: name,
			email: loginEmail[0],
			joined: new Date()
			}).returning('*')
			.then(user => {
				//console.log(data);
				res.json(user[0]); //we do user[0] to ensure that if user somehow is an array we only want the first item
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => {
		//Neither the user was logged in nor was he registered.
		console.log('REGISTER ERROR', err);
		res.status(400).json("Unable to join");
	});
}

module.exports = {
	handleRegister: handleRegister
};
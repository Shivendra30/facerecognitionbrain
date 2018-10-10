
 const handleSignin = (req, res, db, bcrypt) => {
	const {email, password} = req.body;
	if(!email || !password){
		return res.status(400).json("Please fill in all the details");
	}

	db.select('email', 'hash').from('login').returning('*')
	.where('email', '=', email)
	.then(user => {
		console.log(user[0]);
		const isValid = bcrypt.compareSync(password, user[0].hash);
		console.log(isValid);
		if(isValid){
			return db.select('*').from('users')
			.where('email', '=', email)
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(400).json('unable to get user'))
		}else{
			res.status(400).json("Wrong credentials");
		}
	}).catch(err => res.status(400).json('wrong credentials'));
}

module.exports = {
	handleSignin: handleSignin
}
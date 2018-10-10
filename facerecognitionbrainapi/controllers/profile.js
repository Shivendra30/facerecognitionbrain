
const handleProfile = (req, res, db) => {
	const {id} = req.params;
	db.select('*').from('users').where({id: id})
	.then(user => {
		console.log(user[0]);
		if(user[0] != undefined){
			res.json(user[0]);
		} else {
			throw "User not found";
		}
	}).catch(err => {
		console.log(err);
		res.status(400).json("Error getting user");
	});
}

module.exports = {
	handleProfile: handleProfile
}
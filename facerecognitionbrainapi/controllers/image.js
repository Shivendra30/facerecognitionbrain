const Clarifai = require('clarifai');


const app = new Clarifai.App({
	apiKey: '7ca388a468c04594a144a389a2e9592b'
});

const handleApiCall = (req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		res.status(400).json('Unable to work with Clarifai API')
		console.log("Calrifai API error", err);
	});	
}


const handleImage = (req,res, db) => {
	const {id} = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.status(200).json(entries[0]);
	})
	.catch(err => {
		console.log(err);
		res.status(400).json("Unable to update entries");
	});
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}
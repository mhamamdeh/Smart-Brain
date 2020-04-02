const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'eb9c1164089a44e7a24dcebed6644d24'
 });

const handleImageUrl = (req , res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL , req.body.input)
	.then(data => {
		res.json(data)
	})
	.catch(err => {
		res.status(400).json(err);
	})
}

const handleImage = (req , res , db) => {
    const { id } = req.body;
    db('USERS').where('ID', '=', id)
      .increment('ENTRIES', 1)
      .returning('ENTRIES') // +1
      .then(entries => {
        res.json(entries[0]);
      })
      .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleImageUrl: handleImageUrl
}
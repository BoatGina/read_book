import express from 'express'
import share from '../../controller/share'

const shareRouter = express.Router()

shareRouter
	.get('/getCommont', async(req, res) => { 
		const result = await share.getCommont();
		res.json(result)
	})
	.post('/addCommont', async(req, res) => { 
		const update = req.body;
		const result = await share.addCommont(update);
		res.json(result);
	})
	

export default shareRouter
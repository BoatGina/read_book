import express from 'express'
import book from '../../controller/book'

const registerRouter = express.Router()

registerRouter
	.get('/recordBook/:userId', async(req, res) => {
		const {userId} = req.params;
		const result = await book.getRecord(userId);
		res.json(result)
	})
	.post('/addRecord', async(req, res) => {
		const {userId,bookId} = req.body;
		const result = await book.addRecord(userId,bookId);
		res.json(result);
	})
	

export default registerRouter
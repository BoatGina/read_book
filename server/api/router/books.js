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
		console.log("后台收到的请求数据：");
		console.log(req.body);
		const result = await book.addRecord(userId,bookId);
		res.json(result);
	})
	.get('/bookShelf/:userId', async(req, res) => {
		const {userId} = req.params;
		const result = await book.getBookShelf(userId);
		res.json(result)
	})
	.post('/addBookShelf', async(req, res) => {
		const {userId,bookId} = req.body;
		const result = await book.addBookShelf(userId,bookId);
		res.json(result);
	})
	.post('/deleteBookShelf', async(req, res) => {
		const {userId,bookId} = req.body;
		const result = await book.deleteBookShelf(userId,bookId);
		res.json(result);
	})
	

export default registerRouter
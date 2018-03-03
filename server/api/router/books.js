import express from 'express'


const registerRouter = express.Router()

registerRouter
	
	.get('/cats/lv2/statistics', async(req, res) => {
		const result = await register.sendMessage(req, res)
		res.json(result)
	})
	.post('/code', async(req, res) => {
		const result = await register.checkCode(req, res)
		res.json(result)
	})
	.post('/register', async(req, res) => {
		const result = await register.register(req, res)
		res.json(result)
	})

export default registerRouter
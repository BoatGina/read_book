import express from 'express'


import loginRouter from './router/login'





const apiRouter = express.Router()

apiRouter
	.use('/login', loginRouter)


export default apiRouter
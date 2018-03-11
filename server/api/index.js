import express from 'express'


import loginRouter from './router/login';
import bookRouter from './router/books';
import shareRouter from './router/share';





const apiRouter = express.Router()

apiRouter
	.use('/login', loginRouter)
	.use('/book', bookRouter)
	.use('/share', shareRouter)


export default apiRouter
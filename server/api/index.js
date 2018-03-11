import express from 'express'


import loginRouter from './router/login';
import bookRouter from './router/books';





const apiRouter = express.Router()

apiRouter
	.use('/login', loginRouter)
	.use('/book', bookRouter)


export default apiRouter
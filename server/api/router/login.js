import express from 'express'
import login from '../../controller/login'

const loginRouter = express.Router()

loginRouter
	.get('/:user/:pwd', async(req, res) => { // 登录
		const result = await login.login(req, res)
		res.json(result)
	})
	.post('/setUserInfo', async(req, res) => { // 登录
		const {update,userId} = req.body;
		console.log("修改个人信息请求数据：");
		console.log(req.body);
		const result = await login.setInfo(update,userId);
		res.json(result)
	})
	

export default loginRouter
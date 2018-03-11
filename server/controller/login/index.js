export default class Login {

	/**
	 * [login 登陆]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	static async login(req, res) {
		const { user, pwd } = req.params
		//检查用户名
		const userRowNums = await this.checkUser(user) //检查用户名是否存在
		if (userRowNums == 0) { //如果用户名不存在则直接返回,否则检查密码
			return {
				"code": 0,
				"message": '此用户名不存在'
			}
		}
		//检查密码
		const userId = await this.checkPwd(user, pwd)
		if (userId == 0) { //如果密码错误则直接返回,否则保存登陆信息
			return {
				"code": 0,
				"message": "密码错误,请检查"
			}
		}
		//更新用户登录信息
		await this.updateLoginInfo(user);
		//保存session
		let loginStatus = await this.saveSession(req, user);
		loginStatus.isLogin = 1 // 将登录态置为1
		loginStatus.userId = userId //取到用户的id
		//取出用户的基本信息
		const userInfo = await this.getUserDetail(userId);
		//返回数据
		return {
			"code": 1,
			"message": "登陆成功",
			"data": {
				loginStatus,
				userInfo
			}
		}
	}

	/**
	 * [checkUser 检查user]
	 * @param  {[type]} user [用户名/qq号/邮箱]
	 * @return {[Promise]}      [description]
	 */
	static async checkUser(user) {
		const sql = `select id from user where username = ? limit 1`
		const rows = await query(sql, user).catch((err) => {
			console.log(err)
		})
		return rows.length > 0 ? 1 : 0
	}

	/**
	 * [checkPwd 检查密码]
	 * @param  {[type]} user [用户名]
	 * @param  {[type]} pwd  [密码]
	 * @return {[type]}      [description]
	 */
	static async checkPwd(user, pwd) {
		const sql = `select id from user where username = ? and pwd= ? limit 1 `
		const rows = await query(sql, [user, pwd]).catch((err) => {
			console.log(err)
		})
		return rows.length > 0 ? rows[0].id : 0;
	}

	/**
	 * [updateLoginInfo 更新登录信息]
	 * @param  {[type]} user  [字段值]
	 * @param  {[type]} field [字段]
	 * @return {[type]}       [description]
	 */
	static async updateLoginInfo(user) {
		const update = {
			last_login: Date.parse(new Date()) / 1000,
			status: 1
		}
		const sql = `update user set ? where username = ? `
		const res = await query(sql, [update, user]).catch((err) => {
			console.log(err)
		})
		return res.affectedRows > 0 ? 1 : 0
	}

	/**
	 * [saveSession 存储session]
	 * @param  {[type]} res  [res响应]
	 * @param  {[type]} user [用户名/qq号/邮箱]
	 * @param  {[type]} type [user的类型]
	 * @return {[type]}      [返回登陆的信息供客户端存储]
	 */
	static async saveSession(req, user) {
		req.session.username = user
		let data = {
			"value": user
		}
		return data
	}

	/**
	 * [getUserDetail 取出用户的基本信息]
	 * @param  {[type]} userId [description]
	 * @return {[type]}        [description]
	 */
	static async getUserDetail(userId) {
		const sql = `select * from user_detail where id = ? limit 1`;
		const row = await query(sql, [userId]).catch((err) => {
			console.log(err)
		});
		return row[0];
	}

	/**
	 * [setInfo 更新个人信息]
	 * @param  {[type]} update  [更新的数据]
	 * @return {[type]}       [description]
	 */
	static async setInfo(update,userId) {
		let result = null;
		const sql = `update user_detail set ? where id = ? `
		const res = await query(sql, [update, userId]).catch((err) => {
			console.log(err)
		})
		if (res.affectedRows > 0) {
			result = {
				"code": 1,
				"message": "登陆成功",
				"data": null
			};
		} else {
			result = {
				"code": 0,
				"message": "登陆失败",
				"data":null
			};
		}
		return result;
	}
}
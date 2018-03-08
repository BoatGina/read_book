export default class Book {

	/**
	 * [getRecord 获取用户的私聊消息]
	 * @param  {[type]} userId      [用户id]
	 * @return {[type]}             [description]
	 */
	static async getRecord(userId) {
		let result=null;
		const sql = `select readRecord_id from user_books where id = ? limit 1 `
		const rows = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})
		result = rows.length > 0 ? rows[0]["readRecord_id"] : null;
		return {
			code: 1,
			data: {
				'message':'获取数据成功',
				'recordBook':result
			}
		}
	}
	/**
	 * [addRecord 添加用户阅读记录]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} bookId      [新添加的书籍id]
	 * @return {[type]}             [description]
	 */
	static async addRecord(userId,bookId) {
		let result=null;
		let recordGrounp = await this.getRecord(userId);
		let update={
			"readRecord_id":`${bookId},${recordGrounp}`
		};
		const sql = `update user_books set ? where id = ?  `
		const res = await query(sql, [update,userId]).catch((err) => {
			console.log(err)
		})
		console.log("添加阅读记录的数据返回：");
		console.log(res);

		if(res.affectedRows > 0){
			result={
				code: 1,
				data: {
					'message':'用户阅读记录修改成功'
				}
			}
		}else{
			result={
				code: 0,
				data: {
					'message':'用户阅读记录修改失败'
				}
			}
		}
		return result;
	}
	
}
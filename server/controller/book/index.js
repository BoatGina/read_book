export default class Book {

	/**
	 * [getRecord 获取用户的私聊消息]
	 * @param  {[type]} userId      [用户id]
	 * @return {[type]}             [description]
	 */
	static async getRecord(userId) {
		let result = null;
		const sql = `select readRecord_id from user_books where id = ? limit 1 `
		const rows = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})
		result = rows.length > 0 ? rows[0]["readRecord_id"] : null;
		return {
			code: 1,
			data: {
				'message': '获取数据成功',
				'recordBook': result
			}
		}
	}
	/**
	 * [addRecord 添加用户阅读记录]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} bookId      [新添加的书籍id]
	 * @return {[type]}             [description]
	 */
	static async addRecord(userId, bookId) {
		let result = null;
		let update = null;
		let Info = await this.getRecord(userId);
		let recordGroup = Info.data.recordBook;
		console.log("recordGroup的值：");
		console.log(recordGroup);
		if (recordGroup.length == 0 || Object.prototype.toString.call(recordGroup).slice(8, -1) == 'Null') {
			recordGroup = "";
			update = {
				"readRecord_id": recordGroup
			};
		} else {
			let recordArray = recordGroup.split(",");
			update = {
				"readRecord_id": `${bookId},${recordGroup}`
			};
			for (let i = 0; i < recordArray.length - 1; i++) {
				if (recordArray[i] == bookId) {
					update = {
						"readRecord_id": recordGroup
					}
				}
			}
		}

		const sql = `update user_books set ? where id = ?  `
		const res = await query(sql, [update, userId]).catch((err) => {
			console.log(err)
		})

		if (res.affectedRows > 0) {
			result = {
				code: 1,
				data: {
					'message': '用户阅读记录修改成功'
				}
			}
		} else {
			result = {
				code: 0,
				data: {
					'message': '用户阅读记录修改失败'
				}
			}
		}
		return result;
	}

	/**
	 * [getRecord 获取用户的私聊消息]
	 * @param  {[type]} userId      [用户id]
	 * @return {[type]}             [description]
	 */
	static async getBookShelf(userId) {
		let result = null;
		const sql = `select bookshelf_id from user_books where id = ? limit 1 `
		const rows = await query(sql, [userId]).catch((err) => {
			console.log(err)
		})
		result = rows.length > 0 ? rows[0]["bookshelf_id"] : null;
		return {
			code: 1,
			data: {
				'message': '获取数据成功',
				'bookshelf': result
			}
		}
	}

	/**
	 * [addBookShelf 添加书架书籍]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} bookId      [新添加的书籍id]
	 * @return {[type]}             [description]
	 */
	static async addBookShelf(userId, bookId) {
		let result = null;
		let update = null;
		let recordArray = [];
		let Info = await this.getBookShelf(userId);
		let dataGroup = Info.data.bookshelf;
		console.log("dataGroup的值：");
		console.log(dataGroup);
		if (Object.prototype.toString.call(dataGroup).slice(8, -1) == "Null" || dataGroup.length == 0) {
			dataGroup = "";
			update = {
				"bookshelf_id": `${bookId},${dataGroup}`
			};
		} else {
			recordArray = dataGroup.split(",").slice(0,-1);
			update = {
				"bookshelf_id": `${bookId},${dataGroup}`
			};
			for (let i = 0; i < recordArray.length-1; i++) {
				if (recordArray[i] == bookId) {
					update = {
						"bookshelf_id": dataGroup
					}
				}
			}
		}

		console.log("update的值：");
		console.log(update);

		const sql = `update user_books set ? where id = ?  `
		const res = await query(sql, [update, userId]).catch((err) => {
			console.log(err)
		})
		console.log("res的值：");
		console.log(res);

		if (res.affectedRows > 0) {
			result = {
				code: 1,
				data: {
					'message': '书架添加成功'
				}
			}
		} else {
			result = {
				code: 0,
				data: {
					'message': '书架添加失败'
				}
			}
		}
		return result;
	}

	/**
	 * [deleteBookShelf 删除书架书籍]
	 * @param  {[type]} userId      [用户id]
	 * @param  {[type]} bookId      [删除的书籍id]
	 * @return {[type]}             [description]
	 */
	static async deleteBookShelf(userId, bookId) {
		let result = null;
		let Info = await this.getBookShelf(userId);
		let dataGroup = Info.data.bookshelf;
		console.log("dataGroup的值：");
		console.log(dataGroup);
		let recordArray = dataGroup.split(",");
		if(!recordArray[recordArray.length-1]){
			recordArray=recordArray.slice(0,-1);
		}
		for (let i = 0; i < recordArray.length; i++) {
			if (recordArray[i] == bookId) {
				recordArray.splice(i,1);
				break;
			}
		}
		
		let update = {
			"bookshelf_id":recordArray.join(",")
		};
		console.log("update的值：");
		console.log(update);

		const sql = `update user_books set ? where id = ?  `
		const res = await query(sql, [update, userId]).catch((err) => {
			console.log(err)
		})

		if (res.affectedRows > 0) {
			result = {
				code: 1,
				data: {
					'message': '书架删除成功'
				}
			}
		} else {
			result = {
				code: 0,
				data: {
					'message': '书架删除失败'
				}
			}
		}
		return result;
	}

}
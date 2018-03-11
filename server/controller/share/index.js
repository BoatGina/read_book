import { randomNum } from '../../common/util';

export default class Share {

    /**
	 * [getCommont 获取评论]
	 * @param  {[type]} userId      [用户id]
	 * @return {[type]}             [description]
	 */
    static async getCommont() {
        console.log("后台开始----->");
        let result = null;
        const sql = `select * from user_share`;
        const rows = await query(sql, []).catch((err) => {
            console.log(err)
        })
        console.log("获取到的数据7777：");
        console.log(rows);
        result = rows.length > 0 ? rows : null;
        return {
            code: 1,
            data: {
                'message': '获取数据成功',
                'comments': result
            }
        }
    }

    /**
	 * [addCommont 添加评论]
	 * @param  {[type]} update      [需要更新的信息]
	 * @return {[type]}             [description]
	 */
    static async addCommont(update) {
        let result = null;
        let num = randomNum();
        update.share_id = num;
        console.log("update的信息：");
        console.log(update);
        const sql = `INSERT INTO user_share set ?`;
        const res = await query(sql, [update]).catch((err) => {
            console.log(err)
        })
        console.log("res的信息：");
        console.log(res);

        if (res.affectedRows > 0) {
            result = {
                code: 1,
                data: {
                    'message': '评论添加成功'
                }
            }
        } else {
            result = {
                code: 0,
                data: {
                    'message': '评论添加失败'
                }
            }
        }
        return result;
    }


}
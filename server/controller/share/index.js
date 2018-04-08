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
	 * [getCommontList 获取评论]
	 * @param  {[type]} comment_id      [评论id]
	 * @return {[type]}             [description]
	 */
    static async getCommontList(comment_id) {
        let result = null;
        const sql = `select * from comment_list where comment_id = ? limit 1`;
        const rows = await query(sql, [comment_id]).catch((err) => {
            console.log(err)
        })
        result = rows.length > 0 ? rows : null;
        console.log('获取评论信息结果：', result)
        return {
            code: 1,
            data: {
                'message': '获取数据成功',
                'data': result
            }
        }
    }

    /**
	 * [getReplyList 获取回复]
	 * @param  {[type]} comment_id      [评论id]
	 * @return {[type]}             [description]
	 */
    static async getReplyList(reply_id) {
        let result = null;
        const sql = `select * from reply_list where reply_id = ? limit 1`;
        const rows = await query(sql, [reply_id]).catch((err) => {
            console.log(err)
        })
        result = rows.length > 0 ? rows : null;
        console.log('获取评论信息结果：', result)
        return {
            code: 1,
            data: {
                'message': '获取数据成功',
                'data': result
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

    /**
	 * [addCommontList 添加评论]
	 * @param  {[type]} update      [分享的ID和内容]
	 * @return {[type]}             [description]
	 */
    static async addCommontList(update) {
        const { share_id, user_id, nickname, content } = update;
        const comment_id = randomNum()
        // 先在user_share表格中填写commentList
        const sql = `select commentList from user_share where share_id = ? limit 1`;
        const rows = await query(sql, [share_id]).catch((err) => {
            console.log(err)
        })
        console.log('添加评论获取到的rows：',rows)
        let commentList = rows.length > 0 ? rows[0]['commentList'] : null;
        commentList = commentList ? commentList.split(',') : []
        commentList = commentList.push(comment_id).join(',')
        const sql2 = `UPDATE user_share set commentList = ? where share_id = ?`;
        const res = await query(sql2, [commentList, share_id]).catch((err) => {
            console.log(err)
        })
        console.log('添加评论获取到的res：',res)
        // res.affectedRows==1 ? 
        // 填充comment_list表格
        const newData = {
            comment_id: comment_id,
            user_id: user_id,
            nickname: nickname,
            content: content
        }
        const sql3 = 'insert into comment_list set ? '
        const res2 = await query(sql3, [newData]).catch((err) => {
            console.log(err)
        })
        console.log('添加评论获取到的res2：',res2)
        return res2.affectedRows == 1
    }

    /**
	 * [addReplyList 添加回复]
	 * @param  {[type]} update      [分享的ID和内容]
	 * @return {[type]}             [description]
	 */
    static async addReplyList(update) {
        const { comment_id, from_id, from_nickname, to_id, to_nickname, content } = update;
        const reply_id = randomNum()
        // 先在user_share表格中填写commentList
        const sql = `select replyList from comment_list where comment_id = ? limit 1`;
        const rows = await query(sql, [comment_id]).catch((err) => {
            console.log(err)
        })
        let replyList = rows.length > 0 ? rows[0]['replyList'] : null;
        replyList = replyList ? replyList.split(',') : []
        replyList = replyList.push(reply_id).join(',')
        const sql2 = `UPDATE comment_list set replyList = ? where comment_id = ?`;
        const res = await query(sql2, [replyList, comment_id]).catch((err) => {
            console.log(err)
        })
        // res.affectedRows==1 ? 
        // 填充comment_list表格
        const newData = {
            reply_id: reply_id,
            from_id: from_id,
            from_nickname: from_nickname,
            to_id: to_id,
            to_nickname:to_nickname,
            content:content
        }
        const sql3 = 'insert into reply_list set ? '
        const res2 = await query(sql3, [newData]).catch((err) => {
            console.log(err)
        })
        return res2.affectedRows == 1
    }

    /**
	 * [getZan 获取赞数量]
	 * @param  {[type]} share_id      [分享的ID]
	 * @return {[type]}             [description]
	 */
    static async getZan(share_id){
        const sql = `select zan from user_share where share_id = ?`;
        const rows = await query(sql, [share_id]).catch((err) => {
            console.log(err)
        })
        console.log('getZan-rows',rows)
        const result = rows.length > 0 ? rows[0]['zan'] : 0;
        return result
    }

    /**
	 * [addZan 添加赞数量]
	 * @param  {[type]} share_id      [分享的ID]
	 * @return {[type]}             [description]
	 */
    static async addZan(share_id){
        let zan =await this.getZan(share_id);
        zan++;
        console.log('addZan-zan:', zan)
        const sql = `UPDATE user_share set zan = ? where share_id = ?`;
        const res = await query(sql, [zan, share_id]).catch((err) => {
            console.log(err)
        })
        console.log('addZan-res:', res)
        return res.affectedRows==1
    }

    /**
	 * [delZan 删除赞数量]
	 * @param  {[type]} share_id      [分享的ID]
	 * @return {[type]}             [description]
	 */
    static async delZan(share_id){
        let zan =await this.getZan(share_id);
        zan--;
        console.log('delZan-zan:', zan)
        const sql = `UPDATE user_share set zan = ? where share_id = ?`;
        const res = await query(sql, [zan, share_id]).catch((err) => {
            console.log(err)
        })
        console.log('delZan-res:', res)
        return res.affectedRows==1
    }

    /**
	 * [delZan 删除赞数量]
	 * @param  {[type]} zan      [赞用户字符串]
     * @param  {[type]} user_id      [用户的ID]
	 * @return {[type]}             [description]
	 */
    static async hasId(zan, user_id) {
        let rs = false
        if(zan){
            zan.split(',').forEach(id => {
                if(user_id == id){
                    rs = true
                }
            })
        }
        console.log('hasId:', rs)
        return rs
    }

}
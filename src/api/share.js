
import {
	request_get,
	request_post,
	request_put
} from '@/common/js/request'

const API_CONFIG = '/api/share';

/**
 * [getCommont 添加分享]
 * @param  {[type]} update [description]
 * @return {[type]}              [description]
 */
export const getCommont=()=>{
	const url = `${API_CONFIG}/getCommont`;
	console.log("url的值：");
	console.log(url);
	return request_get(url);
}

/**
 * [getCommontList 添加评论]
 * @param  {[type]} comment_id [description]
 * @return {[type]}              [description]
 */
export const getCommontList=(comment_id)=>{
	const url = `${API_CONFIG}/getCommontList?comment_id=${comment_id}`;
	console.log("url的值：");
	console.log(url);
	return request_get(url);
}

/**
 * [getReplyList 添加回复]
 * @param  {[type]} reply_id [description]
 * @return {[type]}              [description]
 */
export const getReplyList=(reply_id)=>{
	const url = `${API_CONFIG}/getReplyList?reply_id=${reply_id}`;
	console.log("url的值：");
	console.log(url);
	return request_get(url);
}

/**
 * [addCommont 添加分享]
 * @param  {[type]} update [description]
 * @return {[type]}              [description]
 */
export const addCommont=(data)=>{
    const url = `${API_CONFIG}/addCommont`;
	return request_post(url,data);
}

/**
 * [addCommontList 添加评论]
 * @param  {[type]} update [description]
 * @return {[type]}              [description]
 */
export const addCommontList=(data)=>{
    const url = `${API_CONFIG}/addCommontList`;
	return request_post(url,data);
}

/**
 * [addReplyList 添加回复]
 * @param  {[type]} update [description]
 * @return {[type]}              [description]
 */
export const addReplyList=(data)=>{
    const url = `${API_CONFIG}/addReplyList`;
	return request_post(url,data);
}

/**
 * [getZan 获取赞]
 * @param  {[type]} share_id [description]
 * @return {[type]}              [description]
 */
export const getZan=(share_id)=>{
    const url = `${API_CONFIG}/getZan?share_id=${share_id}`;
	return request_get(url);
}

/**
 * [addZan 添加赞]
 * @param  {[type]} share_id [description]
 * @return {[type]}              [description]
 */
export const addZan=(share_id)=>{
    const url = `${API_CONFIG}/addZan`;
	return request_post(url,{share_id});
}

/**
 * [delZan 删除赞]
 * @param  {[type]} share_id [description]
 * @return {[type]}              [description]
 */
export const delZan=(share_id)=>{
    const url = `${API_CONFIG}/delZan`;
	return request_post(url,{share_id});
}





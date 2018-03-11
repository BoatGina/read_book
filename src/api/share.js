
import {
	request_get,
	request_post,
	request_put
} from '@/common/js/request'

const API_CONFIG = '/api/share';

/**
 * [getCommont 添加评论]
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
 * [addCommont 添加评论]
 * @param  {[type]} update [description]
 * @return {[type]}              [description]
 */
export const addCommont=(data)=>{
    const url = `${API_CONFIG}/addCommont`;
	return request_post(url,data);
}



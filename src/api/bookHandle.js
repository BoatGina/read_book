
import {
	request_get,
	request_post,
	request_put
} from '@/common/js/request'

const API_CONFIG = '/api/book'

/**
 * [getRecord 获取和处理用户阅读记录]
 * @param  {[type]} userid [description]
 * @return {[type]}              [description]
 */
export const getRecord=(userid)=>{
    const url = `${API_CONFIG}/recordBook/${userid}`;
	return request_get(url);
}

/**
 * [addRecord 添加用户阅读记录]
 * @param  {[type]} userid [description]
 * @param  {[type]} bookid [description]
 * @return {[type]}              [description]
 */
export const addRecord=(userid,bookid)=>{
    const data ={
        "userId":userid,
        "bookId":bookid
    };
    const url = `${API_CONFIG}/addRecord`;
	return request_post(url,data);
}



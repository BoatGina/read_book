
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
    console.log("请求路径和数据----");
    const data ={
        "userId":userid,
        "bookId":bookid
    };
    const url = `${API_CONFIG}/addRecord`;
    console.log(data);
    console.log(url);
	return request_post(url,data);
}

/**
 * [getBookShelf 获取用户书架信息]
 * @param  {[type]} userid [description]
 * @return {[type]}              [description]
 */
export const getBookShelf=(userid)=>{
    const url = `${API_CONFIG}/bookShelf/${userid}`;
	return request_get(url);
}

/**
 * [addBookShelf 添加用户阅读记录]
 * @param  {[type]} userid [description]
 * @param  {[type]} bookid [description]
 * @return {[type]}              [description]
 */
export const addBookShelf=(userid,bookid)=>{
    const data ={
        "userId":userid,
        "bookId":bookid
    };
    const url = `${API_CONFIG}/addBookShelf`;
	return request_post(url,data);
}

/**
 * [deleteBookShelf 添加用户阅读记录]
 * @param  {[type]} userid [description]
 * @param  {[type]} bookid [description]
 * @return {[type]}              [description]
 */
export const deleteBookShelf=(userid,bookid)=>{
    const data ={
        "userId":userid,
        "bookId":bookid
    };
    const url = `${API_CONFIG}/deleteBookShelf`;
	return request_post(url,data);
}

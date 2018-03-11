import encrypt from '@/common/js/encrypt'
import {
	request_get,
	request_post
} from '@/common/js/request'

const API_CONFIG = '/api/login'

/**
 * [checkLogin 验证登录]
 * @param  {[type]} options.user [description]
 * @param  {[type]} options.pwd  [description]
 * @return {[type]}              [description]
 */
export const check_login=({user,pwd})=>{
	pwd = encrypt(pwd)    //加密登录
	console.log('加密后的密码：');
	console.log(pwd);
	const url = `${API_CONFIG}/${user}/${pwd}`;

	return request_get(url)
}

/**
 * [checkLogin 验证登录]
 * @param  {[type]} options.user [description]
 * @param  {[type]} options.pwd  [description]
 * @return {[type]}              [description]
 */
export const setInfo=(update,userId)=>{
	let data={
		'update':update,
		'userId':userId
	};
	const url = `${API_CONFIG}/setUserInfo`;
	return request_post(url,data)
}


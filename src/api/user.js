import {
	request_put,
	request_get
} from '@/common/js/request'

const API_CONFIG = '/api/user'

/**
 * [logout 登出]
 * @param  {number} userId [用户id]
 * @return {[type]}        [description]
 */
export const logout = (userId) => {
	const url = `${API_CONFIG}/logout/${userId}`
	return request_put(url)
}

import { get } from '@/utils/request'
import { post } from '@/utils/request'
// 获取用户邮箱
export const getUserEmail = (callback) => get('/service/get_user_email/', {}, callback)
// 获取用户权限
export const getUserAuth = (callback) => get('/service/get_user_auth/', {}, callback)
// 获取是否是接口人
export const judgeContact = (callback) => get('/service/get_reminder/', {}, callback)
// 获取项目组信息
export const getExpertGroup = (callback) => post('/expertCompatibility/get_expert_group/', {}, callback)

export const getAuthByTable = (params, callback) => post('/compatibilityTest/get_auth_by_table/', params, callback)
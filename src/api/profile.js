import {get} from '@/utils/request'
import {post} from '@/utils/request'
// 获取用户邮箱
export const getUserEmail=(params,callback) => get('/service/get_user_email/',params,callback)
// 获取用户权限
export const getUserAuth=(params,callback) => get('/service/get_user_auth/',params,callback)
// 获取是否是接口人
export const judgeContact=(params,callback) => get('/service/get_reminder/',params,callback)
// 获取项目组信息
export const getExpertGroup=(params,callback) => post('/expertCompatibility/get_expert_group/',params,callback)

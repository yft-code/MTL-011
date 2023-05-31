import axios from 'axios'
import api from '../../api.config'
import qs from 'qs'
import {Message} from 'element-ui'
axios.defaults.baseURL = api.baseURL 
// 设置请求超时时间，毫秒
axios.defaults.timeout = 960000
// 设置post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// 请求拦截
axios.interceptors.request.use(config => {
	return config
}, err => {
	// 对请求错误做些什么
	return Promise.error(err)
})

// 响应拦截
axios.interceptors.response.use(response => {
	// 对响应数据做点什么
	return response
}, err => {
	// 对请求错误做些什么
	return Promise.reject(err.response);
})

// 封装get方法和post方法
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function get(url, params,callback) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
            // 请求成功状态码为200，返回请求数据
            if(res.data.code === 200) {
				 callback(res.data)
			    
            } else {
                Message({
                    message: res.data.msg,
                    type: 'error'
				})
            }
			resolve(res.data)
		}).catch(err => {
			reject(err.response);
		})
	})
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params,callback,requestType = '') {
	return new Promise((resolve, reject) => {
		let response = {};
		axios.post(url, requestType === 'formData' ? params : qs.stringify(params),requestType === 'formData' ? {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        }:'')
			.then(res => {
				if(res.data.code === 200) {
					callback(res.data)
				} else {
					Message({
						message: res.data.msg,
						type: 'error'
					})
				}
				resolve(res.data)
				response = res.data;
			})
			.catch(err => {
				reject(err.response)
			}).finally(()=>{
			})
	})
}

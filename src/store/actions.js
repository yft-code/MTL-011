import { getUserEmail, getUserAuth, judgeContact } from '@/api/toolHeader.js'
const actions = {
    // 获取用户邮箱
   async getUserEmail(context) {
    getUserEmail(res => {
        context.commit('setUserEmail', res.data);
    })
    },

    //获取用户权限
    async getUserAuth(context) {
        getUserAuth(res=>{
            context.commit('setIsTester', res.data.tester);
            context.commit('setIsAdmin', res.data.manager);
            })
    },

    // 获取是否是接口人
   async judgeContact(context) {
        context.commit("setIsContact", true);
          judgeContact(res=>{
            let flag = Object.values(res.data).some(item => {
                return item.popo.indexOf(context.getters.getUserEmail) > -1
            })
            if (flag) {
                context.commit("setIsContact", true);
            } else {
                context.commit("setIsContact", false);
            }
        })
    }
}
export default actions;
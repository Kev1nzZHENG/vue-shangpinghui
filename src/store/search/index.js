import { reqGetSearchInfo } from '@/api'
// search模块的小仓库
export default {
    namespaced: true,
    state: {
        searchList: {}
    },
    mutations: {
        GETSEARCHLIST(state, searchList) {
            state.searchList = searchList;
        }
    },
    actions: {
        async getSearchList({ commit }, params = {}) {
            // reqGetSearchInfo函数在调用获取服务器数据时，至少传递一个参数（空对象）
            let result = await reqGetSearchInfo(params);
            if (result.code == 200) {
                commit('GETSEARCHLIST', result.data)
            }
        }
    },
    getters: {
        goodsList(state) {
            return state.searchList.goodsList || [];
        },
        attrsList(state) {
            return state.searchList.attrsList || [];
        },
        trademarkList(state) {
            return state.searchList.trademarkList || [];
        }
    },
}
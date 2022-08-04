import { reqCartList } from '@/api'
import { reqDeleteCartById } from '@/api'
import { reqUpdateCheckedById } from '@/api'
export default {
    namespaced: true,
    state: {
        cartList: [],
    },
    mutations: {
        GETCARTLIST(state, cartList) {
            state.cartList = cartList;
        }
    },
    actions: {
        // 获取购物车列表数据
        async getCartList({ commit }) {
            let result = await reqCartList();
            // console.log(result);
            if (result.code == 200) {
                commit('GETCARTLIST', result.data)
            }
        },
        // 删除购物车某一个产品
        async deleteCartListBySkuId({ commit }, skuId) {
            let result = await reqDeleteCartById(skuId);
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 修改购物车产品的选择状态
        async updateCheckedById({ commit }, { skuId, isChecked }) {
            let result = await reqUpdateCheckedById(skuId, isChecked);
            if (result.code == 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'));
            }
        },
        // 删除购物车选中的产品
        deleteAllCheckedCart({ dispatch, getters }) {
            let PromiseAll = [];
            getters.cartList.cartInfoList.forEach((item) => {
                let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
                PromiseAll.push(promise);
            });
            return Promise.all(PromiseAll);
        },
        // 全选修改产品选中状态
        updateAllCartChecked({ dispatch, state }, isChecked) {
            let PromiseAll = [];
            state.cartList[0].cartInfoList.forEach((item) => {
                let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
                PromiseAll.push(promise);
            });
            return Promise.all(PromiseAll)
        }
    },
    getters: {
        cartList(state) {
            return state.cartList[0] || {};
        }
    }
}

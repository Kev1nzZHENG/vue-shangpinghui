import { reqAddressInfo, reqTradeInfo } from '@/api'
export default {
    namespaced: true,
    state: {
        addressInfo: [],
        orderInfo: {}
    },
    mutations: {
        GETUSERADDRESS(state, address) {
            state.addressInfo = address
        },
        GETORDERINFO(state, orderInfo) {
            state.orderInfo = orderInfo;
        }
    },
    actions: {
        // 获取用户地址信息
        async getUserAddress({ commit }) {
            let result = await reqAddressInfo();
            // console.log(result);
            if (result.code == 200) {
                commit('GETUSERADDRESS', result.data)
            }
        },
        // 获取订单交易信息
        async getOrderInfo({ commit }) {
            let result = await reqTradeInfo();
            // console.log(result);
            if (result.code == 200) {
                commit('GETORDERINFO', result.data)
            }
        }
    },
    getters: {}
}
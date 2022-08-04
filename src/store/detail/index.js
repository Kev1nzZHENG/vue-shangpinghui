import { reqGetGoodsInfo } from '@/api'
import { reqAddOrUpdateShopCar } from '@/api'
// 封装游客身份模块uuid-->生成一个随机字符串
import {getUUID} from '@/utils/uuid_token'
// detail模块的小仓库
export default {
    namespaced: true,
    state: {
        goodsInfo: {},
        // 游客临时身份
        uuid_token:getUUID()
    },
    mutations: {
        // 处理产品信息
        GETGOODSINFO(state, goodsInfo) {
            state.goodsInfo = goodsInfo;
        }
    },
    actions: {
        // 获取产品信息
        async getGoodsInfo({ commit }, skuId) {
            let result = await reqGetGoodsInfo(skuId);
            if (result.code == 200) {
                commit('GETGOODSINFO', result.data)
            }
        },
        //将产品添加到购物车
        // 没有返回数据；只是返回code；不需要三连环操作
        async addorUpdateShopCar({commit},{skuId,skuNum}) {
            let result = await reqAddOrUpdateShopCar(skuId, skuNum);
            // 代表服务器加入购物车成
            if(result.code == 200) {
                return "ok"
            }else {
                // 代表加入购物车失败
                return Promise.reject(new Error('faile'))
            }
        },
    },
    getters: {
        categoryView(state) {
            return state.goodsInfo.categoryView || {};
        },
        skuInfo(state) {
            return state.goodsInfo.skuInfo || {};
        },
        spuSaleAttrList(state) {
            return state.goodsInfo.spuSaleAttrList || [];
        }
    }
}
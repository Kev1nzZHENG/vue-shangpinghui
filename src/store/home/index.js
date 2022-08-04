// home模块的小仓库
import { reqGetCategoryList, reqGetBannerList, reqGetFloorList } from '@/api'
export default {
    namespaced: true,
    state: {
        // 三级菜单的数据
        categoryList: [],
        // 轮播图的数据
        bannerList: [],
        // floor
        floorList: []
    },
    mutations: {
        // 三级联动
        GETCATEGORY(state, categoryList) {
            state.categoryList = categoryList;
        },
        // 轮播图
        GETBANNERLIST(state, bannerList) {
            state.bannerList = bannerList;
        },
        // floor层
        GETFLOORLIST(state, floorList) {
            state.floorList = floorList;
        }
    },
    actions: {
        // 获取三级联动数据
        async getCategory(context) {
            let result = await reqGetCategoryList();
            // console.log(result);
            if (result.code == 200) {
                context.commit('GETCATEGORY', result.data)
            }
        },
        // 获取首页轮播图的数据
        async getBannerList(context) {
            let result = await reqGetBannerList();
            // console.log(result);
            if (result.code == 200) {
                context.commit('GETBANNERLIST', result.data)
            }
        },
        // 获取floor层数据
        async getFloorList({ commit }) {
            let result = await reqGetFloorList();
            if (result.code == 200) {
                commit('GETFLOORLIST', result.data)
            }
        }

    },
    getters: {},
}
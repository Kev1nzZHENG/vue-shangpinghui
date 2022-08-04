import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
// 登陆与注册的模块
export default {
    namespaced: true,
    state: {
        code: '',
        // token: localStorage.getItem('TOKEN'),
        token: getToken(),
        userInfo: {}
    },
    mutations: {
        // 获取验证码
        GETCODE(state, code) {
            state.code = code;
        },
        // 用户登陆
        USERLOGIN(state, token) {
            state.token = token;
        },
        // 获取用户信息
        GETUSERINFO(state, userInfo) {
            state.userInfo = userInfo;
        },
        // 退出登录，清楚用户信息
        CLEARUSERINFO(state) {
            state.token = '';
            state.userInfo = {};
            removeToken();
        }
    },
    actions: {
        // 获取验证码
        async getCode({ commit }, phone) {
            let result = await reqGetCode(phone);
            // console.log(result);
            if (result.code == 200) {
                commit('GETCODE', result.data);
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'))
            }
        },

        // 用户注册
        async userRegister({ commit }, user) {
            let result = await reqUserRegister(user);

            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },

        // 用户登陆
        async userLogin({ commit }, data) {
            let result = await reqUserLogin(data);
            if (result.code == 200) {
                // 服务器下发token，用户唯一标识符，将来经常通过带token找服务器要用户信息进行展示
                commit('USERLOGIN', result.data.token);
                // 本地持久化存储token
                // localStorage.setItem('TOKEN',data.token)
                setToken(result.data.token)
                return 'ok';
            }
            else {
                return Promise.reject(new Error('账号密码错误'))
            }
        },

        // 获取用户信息
        async getUserInfo({ commit }) {
            let result = await reqUserInfo();
            // console.log(result);
            if (result.code == 200) {
                commit('GETUSERINFO', result.data);
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'))
            }
        },

        // 退出登陆
        async userLogout({ commit }) {
            let result = await reqLogout();
            if (result.code == 200) {
                commit('CLEARUSERINFO');
                return 'ok';
            } else {
                return Promise.reject(new Error('faile'))
            }
        }
    },
    getters: {},
}
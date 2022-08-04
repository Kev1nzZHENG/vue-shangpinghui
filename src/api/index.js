// API接口进行统一管理
import requests from "./requests";

// mock数据
import mockRequest from './mockAjax'

// 三级联动接口   /api/product/getBaseCategoryList   get  无参数
export const reqGetCategoryList = () => {
    // 发请求
    return requests({ url: 'product/getBaseCategoryList', method: 'get' });
}

// 获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => {
    return mockRequest({ url: '/banner', method: 'get' });
}

// 获取floor数据
export const reqGetFloorList = () => {
    return mockRequest({ url: '/floor', method: 'get' });
}

// 获取search搜索模块数据
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params });

// 获取商品详情
export const reqGetGoodsInfo = (skuId) => {
    return requests({ url: `/item/${skuId}`, method: 'get' });
}

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCar = (skuId, skuNum) => {
    return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });
}

// 获取购物车列表接口
export const reqCartList = () => {
    return requests({ url: '/cart/cartList', method: 'get' });
}

// 删除购物车某一个产品
export const reqDeleteCartById = (skuId) => {
    return requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });
}

// 修改商品的选中状态  cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });
}

// 获取验证码
export const reqGetCode = (phone) => {
    return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' });
}

// 注册
export const reqUserRegister = (data) => {
    return requests({ url: '/user/passport/register', data, method: 'post' });
}

// 登陆
export const reqUserLogin = (data) => {
    return requests({ url: '/user/passport/login', data, method: 'post' });
}

//获取用户信息【需要带着用户的token向服务器要用户信息】 
export const reqUserInfo = () => {
    return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' });
}

// 退出登陆
export const reqLogout = () => {
    return requests({ url: '/user/passport/logout', method: 'get' });
}

// 获取用户地址信息
export const reqAddressInfo = () => {
    return requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' });
}

// 获取订单交易信息
export const reqTradeInfo = () => {
    return requests({ url: '/order/auth/trade', method: 'get' });
}

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
    return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' });
}

// 获取订单支付信息
export const reqPayInfo = (orderId) => {
    return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
}

// 获取支付订单状态
export const reqPayStatus = (orderId) => {
    return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' });
}

// 获取订单数据
export const reqMyOrderList = (page, limit) => {
    return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });
}
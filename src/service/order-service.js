/*
* @Author: 孙宇鹏
* @Date:   2018-01-12 17:49:11
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-15 20:21:20
*/
var _mm = require('util/mm.js');

 var _order = {
    //获取商品信息
    getProductList : function (resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error : reject
        });
    },
     //提交订单
    createOrder : function (orderInfo,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/order/create.do'),
            data : orderInfo,
            success : resolve,
            error : reject
        });
    },
     //获取订单列表
    getOrderList : function (listParam,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/order/list.do'),
            data : listParam,
            success : resolve,
            error : reject
        });
    },
     //获取订单详情
    getDetailList : function (orderNumber,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/order/detail.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        });
    },
    //取消订单
    cancelOrder: function (orderNumber,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/order/cancel.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        });
    }
 }
 module.exports = _order;
/*
* @Author: 孙宇鹏
* @Date:   2018-01-15 21:00:39
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-15 21:10:24
*/
var _mm = require('util/mm.js');

 var _payment = {
    //获取支付信息
    getPaymentInfo : function (orderNumber,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/order/pay.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        });
    },
     //检查支付状态
    getPaymentStatus : function (orderNumber,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data : {
                orderNo : orderNumber
            },
            success : resolve,
            error : reject
        });
    }
 }
 module.exports = _payment;
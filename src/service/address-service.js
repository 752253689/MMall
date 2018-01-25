/*
* @Author: 孙宇鹏
* @Date:   2018-01-13 17:25:53
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-14 20:26:22
*/
var _mm = require('util/mm.js');

 var _address = {
    //获取地址信息
    getAddressList : function (resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/shipping/list.do'),
            data : {
                pageSize : 50
            },
            success : resolve,
            error : reject
        });
    },
    //新建地址，将收货人信息传给后台保存
    save : function (addressInfo,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/shipping/add.do'),
            data : addressInfo,
            success : resolve,
            error : reject
        });
    },
    //更新地址，将更新后的收货人信息传给后台保存
    update : function (addressInfo,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/shipping/update.do'),
            data : addressInfo,
            success : resolve,
            error : reject
        });
    },
    // 删除收件人
    deleteAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    //获取单条已添加的地址信息
     getAddress : function (shippingId,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/shipping/select.do'),
            data : {
                shippingId : shippingId
            },
            success : resolve,
            error : reject
        });
    },
 }
 module.exports = _address;
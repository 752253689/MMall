/*
* @Author: 孙宇鹏
* @Date:   2018-01-07 17:12:56
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-10 19:05:16
*/
/*
* @Author: 孙宇鹏
* @Date:   2017-12-31 20:31:45
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-06 14:26:56
*/
 var _mm = require('util/mm.js');
 var _product = {
    //获取商品列表
    getProductList : function (listParam,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/product/list.do'),
            data : listParam,
            success : resolve,
            error : reject
        });
    },
    //获取商品详细信息
    getProductDetail: function (productId,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/product/detail.do'),
            data : {
                productId: productId
            },
            success : resolve,
            error : reject
        });
    },
   
 }
 module.exports = _product;
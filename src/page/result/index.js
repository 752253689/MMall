/*
* @Author: 孙宇鹏
* @Date:   2018-01-02 16:24:53
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-15 21:22:44
*/
require('./index.css');
var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    if (type === 'payment') {
        var orderNumber = _mm.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href',$orderNumber.attr(href) + orderNumber);
    }
    //显示对应的提示元素
    $element.show();    
})
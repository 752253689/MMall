/*
* @Author: 孙宇鹏
* @Date:   2018-01-15 17:28:32
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-15 20:23:51
*/
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var navSide = require('page/common/nav-side/index.js');
var _order = require('service/order-service.js');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

var page={
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        //初始化左侧菜单
        navSide.init({
            name : 'order-list'
        });
        //加载detail数据
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.order-cancel',function(){
            if (window.confirm('确定要取消该订单?')) {
                _order.cancelOrder(_this.data.orderNumber,function(res){
                    _mm.successTips('该订单取消成功');
                    _this.loadDetail();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    //加载订单列表
    loadDetail: function(){
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
            $content.html('<div class="loading"></div>');
        _order.getDetailList(this.data.orderNumber,function(res){
            _this.dataFilter(res);
            //渲染html
            orderDetailHtml = _mm.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function(errMsg){
            $content.html('<p class="err-tip">'+ errMsg  +'</p>');
        });
    },
    //数据的适配
    dataFilter : function(data){
        data.needPay = data.status ==10;
        data.isCancelble = data.status ==10;
    }
   
};
$(function(){
    page.init();
});
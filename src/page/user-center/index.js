/*
* @Author: 孙宇鹏
* @Date:   2018-01-05 22:47:22
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-05 23:30:39
*/
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var navSide = require('page/common/nav-side/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var templateIndex = require('./index.string');

var page={
    init: function(){
        this.onLoad();
    },
    onLoad : function () {
        //初始化左侧菜单
        navSide.init({
            name : 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo : function () {
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});
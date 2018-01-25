/*
* @Author: 孙宇鹏
* @Date:   2018-01-01 20:41:02
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-07 17:17:04
*/
require('./index.css');
var _mm = require('util/mm.js');
//通用页面头部
var header = {
    //初始化
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        var keyword = _mm.getUrlParam('keyword');
        //keyword 存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        };
    },
    //
    bindEvent : function () {
        var _this = this;
        //点击搜索按钮 做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车也做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索的提交
    searchSubmit : function () {
        var keyword = $.trim($('#search-input').val());
        //如果提交时候有keyword，跳转list页，若为空，返回首页
        if(keyword){
            window.location.href = './list.html?keyword='+keyword;
        }else{
            _mm.goHome();
        }
    }
};
header.init();
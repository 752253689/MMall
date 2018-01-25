/*
* @Author: 孙宇鹏
* @Date:   2018-01-05 22:47:22
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-06 13:15:16
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
        this.bindEvent();
    },
    onLoad : function () {
        //初始化左侧菜单
        navSide.init({
            name : 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function () {
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                phone : $.trim($('#phone').val()),
                email : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer : $.trim($('#answer').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo,function (res,msg) {
                  _mm.successTips();
                  window.location.href='./user-center.html';
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
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
    },
    //验证字段信息
    validateForm :function(formData){
        var result = {
            status : false,
            msg    : '' 
        };
        if(!_mm.validate(formData.phone,'phone')){
            result.msg = '请输入正确的电话号码';
            return result;
        }
        if(!_mm.validate(formData.email,'email')){
            result.msg = '请输入正确的邮箱';
            return result;
        }
        if(!_mm.validate(formData.question,'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if(!_mm.validate(formData.answer,'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //通过验证返回正确信息
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
});
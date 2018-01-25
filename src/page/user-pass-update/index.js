/*
* @Author: 孙宇鹏
* @Date:   2018-01-06 13:53:23
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-06 14:26:06
*/
var _user = require('service/user-service.js');

var navSide = require('page/common/nav-side/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('./index.css');
var _mm = require('util/mm.js');

var page={
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        //初始化左侧菜单
        navSide.init({
            name : 'user-pass-update'
        });
    },
    bindEvent : function () {
        var _this = this;
        //点击提交按钮后的动作
        $(document).on('click','.btn-submit',function(){
            var userInfo = {
                password : $.trim($('#password').val()),
                passwordNew : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                //更改用户密码
                _user.updatePassword(
                {
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                },function (res,msg) {
                  _mm.successTips(msg);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
   
    //验证字段信息
    validateForm :function(formData){
        var result = {
            status : false,
            msg    : '' 
        };
        if(!_mm.validate(formData.password,'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        if(!formData.passwordNew || formData.passwordNew.length<6){
            result.msg = '密码长度不得少于六位';
            return result;
        }
        if(formData.passwordNew !==formData.passwordConfirm){
            result.msg = '两次输入密码不一致';
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
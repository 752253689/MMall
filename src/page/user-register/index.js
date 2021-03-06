/*
* @Author: 孙宇鹏
* @Date:   2018-01-04 16:39:15
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-04 19:56:09
*/
/*
* @Author: 孙宇鹏
* @Date:   2017-12-27 10:15:29
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-04 16:27:50
*/
require('./index.css');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');
//表单错误提示
var formError = {
    show : function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
}
var page={
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this=this;
        //验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            //如果用户名为空，不做验证
            if (!username) {return;}
            //异步验证用户名是否存在
            _user.checkUsername(username,function (res) {
                formError.hide();
            },function(errMsg){
                formError.show(errMsg);
            });
        });
        //注册按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        //如果按回车也进行提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    //提交表单
    submit :function () {
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone : $.trim($('#phone').val()),
            email : $.trim($('#email').val()),
            question : $.trim($('#question').val()),
            answer : $.trim($('#answer').val())
        },
        //表单验证结果
        validateResult = this.formValidate(formData);
        //验证成功
        if (validateResult.status) {
            //提交
            _user.register(formData,function(res){
                window.location.href = './result.html?type=register';
            },function(errMsg){
                formError.show(errMsg);
            });
        }
        //验证失败
        else{
            //错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单验证方法
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : '' 
        };
        //
        if(!_mm.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_mm.validate(formData.username,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length < 6){
            result.msg = '密码长度不能少于6位';
            return result;
        }
        if(formData.password !==formData.passwordConfirm){
            result.msg = '两次输入密码不一致';
            return result;
        }
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
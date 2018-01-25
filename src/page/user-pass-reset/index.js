/*
* @Author: 孙宇鹏
* @Date:   2018-01-05 19:06:13
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-05 21:33:02
*/
/*
* @Author: 孙宇鹏
* @Date:   2017-12-27 10:15:29
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-04 20:58:48
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
    data : {
        username : '',
        question : '',
        answer : '',
        token : ''
    },
    init: function(){
        this.bindEvent();
        this.onLoad();
    },
    onLoad : function () {
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this=this;
        //输入用户名后下一步的点击
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            //用户名是否存在
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('请输入用户名!');
            }
        });
        //输入密码提示问题答案后下一步的点击
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            //密码提示问题是否存在
            if(answer){
                //检查密码提示问题答案是否正确
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   :answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('请输入密码提示问题的答案!');
            }
        });
        //输入新密码后下一步的点击
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            //密码不为空
            if(password && password.length >=6){
                //检查密码提示问题答案是否正确
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken   :_this.data.token
                },function(res){
                   window.location.href = './result.html?type=pass-reset';
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('请输入不少于6位的新密码!');
            }
        });
        
    },
    //加载输入用户名的一步
    loadStepUsername : function () {
        $('.step-username').show();
    },
     //输入问题答案的一步
    loadStepQuestion : function () {
        formError.hide();
        $('.step-username').hide().siblings('.step-question')
        .show().find('.question').text(this.data.question);
    },
     //输入新密码的第一步
    loadStepPassword : function () {
        formError.hide();
        $('.step-question').hide().siblings('.step-password')
        .show();
    }
};
$(function(){
    page.init();
});
/*
* @Author: 孙宇鹏
* @Date:   2017-12-31 20:31:45
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-06 14:26:56
*/
 var _mm = require('util/mm.js');
 var _user = {
     //用户名是否被注册
    checkUsername : function (username,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/check_valid.do'),
            data : {
                type : 'username',
                str : username
            },
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    register : function (userInfo,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/register.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    login : function (userInfo,resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/login.do'),
            data : userInfo,
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //检查用户名
    checkLogin : function (resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/get_user_info.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    },
    //获取用户密码提示问题
     getQuestion : function(username,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data    :{username:username},
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    checkAnswer : function(userInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }, 
    //重置密码
    resetPassword : function(userInfo,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },               
    getUserInfo : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    updatePassword : function(userInfo,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            method  : 'POST',
            data    : userInfo,
            success : resolve,
            error   : reject
        });
    },
    //更新个人信息
    updateUserInfo : function(userInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //登出
    logout : function (resolve,reject) {
        _mm.request({
            url : _mm.getServerUrl('/user/logout.do'),
            method : 'POST',
            success : resolve,
            error : reject
        });
    }
 }
 module.exports = _user;
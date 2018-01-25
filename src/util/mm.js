/*
* @Author: 孙宇鹏
* @Date:   2017-12-28 18:08:17
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-25 09:39:55
*/
'use strict';

var conf = {
    serverHost: ''
};
var Hogan = require('hogan');
var _mm= {
    //网络请求
    request : function (param) {
        //success未登陆时调用外面函数的this
        var _this=this;
        $.ajax({
            type       : param.method || 'get',
            url        : param.url    || ''   ,
            dataType   : param.type   || 'json' ,
            data       : param.data   || '',
            success    : function (res) {
                //请求成功
                if (0 === res.status) {
                    //判断type param.success是不是function，若是，将数据信息返回
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没登录状态，需要强制登陆
                else if(10 === res.status){
                     _this.doLogin();   
                }
                //请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error   : function (err) {
                //请求失败，后台返回错误码
                typeof param.error === 'function' && param.error(err.statusText);
             
            } 
        });
    },
    //获取服务器地址
    getServerUrl :function (path) {
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam :function (name) {
        //以参数name开头或者以&name开头 后面跟上参数字符串不是&符号就不结束匹配*个 以&或者一个字符串结尾结束
        var reg = new RegExp('(^|&)' + name +'=([^&]*)(&|$)');
        //window.location.search就是url问号后面的参数 substr(1)是将问号去掉
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板.将模板和数据拼接
    renderHtml : function (htmlTemplate,data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
            return result;
    },

    //提示成功
    successTips: function (msg) {
        alert(msg || '操作成功!');
    },
    //提示错误
    errorTips: function (msg) {
        alert(msg || '哪里不对!');
    },
    //字段的验证，支持非空，邮箱，手机
    validate : function (value,type) {
        //trim用于去掉字符串首尾的空白字符,或者将不是字符串格式变成字符串
        var value = $.trim(value);
        //非空验证
        //require是自定义字段，就是验证类型有没有值 
        if ('require' === type){
            //两个叹号将value强转换为boolean值，有值就返回true，反之false
            return !!value;
        }
        //手机号验证
        if('phone'===type){
            //开头是1后边十个数字 就输出
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email'===type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //返回首页
    goHome :function () {
        window.location.href = './index.html';
    },
    //统一登陆处理
    doLogin : function () {
        //跳入登录页，redirect返回之前页面，使用encode编码，防止出现其他问题
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};

module.exports = _mm;
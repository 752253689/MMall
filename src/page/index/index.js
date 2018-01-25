/*
* @Author: 孙宇鹏
* @Date:   2017-12-26 21:01:50
* @Last Modified by:   孙宇鹏
* @Last Modified time: 2018-01-07 16:07:43
*/
'use strict';
var _mm = require('util/mm.js');

var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
require('./index.css');

$(function() {
    //渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(templateBanner);
    //初始化banner
    var $slider = $('.banner').unslider({
        dots : true
    });
    //前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    })
});

// pages/user/user.js

var app = getApp()
Page({
  data: {

    userInfo: {},
    orderInfo: {},
    projectSource: '',
    userListInfo: [{
      icon: '../../images/iconfont-dingdan.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 2
    }, {
      icon: '../../images/iconfont-card.png',
      text: '我的代金券',
      isunread: false,
      unreadNum: 2
    }, {
      icon: '../../images/iconfont-icontuan.png',
      text: '我的拼团',
      isunread: true,
      unreadNum: 1
    }, {
      icon: '../../images/iconfont-shouhuodizhi.png',
      text: '收货地址管理'
    }, {
      icon: '../../images/iconfont-kefu.png',
      text: '联系客服'
    }, {
      icon: '../../images/iconfont-help.png',
      text: '常见问题'
    }],
    loadingText: '加载中...',
    loadingHidden: false,
  },
  onLoad: function(options) {



  },
  onGotUserInfo: function(e) {

    console.log(e.detail.userInfo)
    wx.login({
      success: function(res) {
        //后去登陆后的临时凭证
        var code = res.code;
        console.log(res)
        wx.request({
          url: 'http://192.168.43.5/wxlogin.do?code='+code,
          method: "post",         
          success: function(result) {
            console.log(result);
          }

        })
      }
    })
    this.setData({
      "userInfo": e.detail.userInfo
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  onShow: function() {
    this.loadOrderStatus();
  },
  loadOrderStatus: function() {

  },
  onShareAppMessage: function() {
    return {
      title: '宠物美容学校',
      path: '/pages/index/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})
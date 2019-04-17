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

    wx.login({
      success: function(res) {
        console.log(res)
        var code = res.code;
        wx.request({
          url: 'https://80222214.ngrok.io/wxlogin.do?code='+code,
          method: 'GET',
          data:{
            
          },
          success: function(result) {
            console.log(result)
          }
        })
      }

    })
    wx.getSetting({
      success: res => {

        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.userInfo = res.userInfo
            this.setData({
              "userInfo": res.userInfo
            })
            console.log(this.userInfo)
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })

      }
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
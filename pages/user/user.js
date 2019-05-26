// pages/user/user.js
var app = getApp()
Page({
  data: {

    userInfo: {},
    orderInfo: {
      refund_num:"1",
      pay_num: "2",
      finish_num: "3",
      rec_num: "4"
    },
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

    var that=this;
    that.setData({
      "userInfo": app.globalData.userInfo
    })
  
  },

  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  },
  onShow: function() {
    this.loadOrderStatus();
  },
  loadOrderStatus: function() {
    //获取用户订单数据
    var that = this;
    wx.request({
      url: app.d.orderUrl + '/OrderService/queryCountOrder',
      method: 'post',
      data: {
        data:app.globalData.user.userId,
      },
      success: function (res) {
        //--init data        
        var status = res.data.code;
        if (status == 0) {
          var orderInfo = res.data.data;
          console.log(orderInfo)
          that.setData({
            orderInfo: orderInfo
          });
        } else {
          wx.showToast({
            title: '非法操作.',
            duration: 2000
          });
        }
      },
      error: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  skipuserinfo : function() {
    wx.navigateTo({
      url: 'user-userinfo',
    })
  }
  ,
  onShareAppMessage: function() {
    return {
      title: '格调生鲜',
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
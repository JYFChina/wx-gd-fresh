var app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '../commodity/commodity'
              })
            }
          });
        }
      }
    })
  },
  addUser: function() {

  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log(e.detail.userInfo)
      // 插入登录的用户的相关信息到数据库
      wx.request({
        url: app.d.userUrl + "/GdWxUserService/wxsaveUser",
        data: {
          data: {
            useraccount: app.globalData.user.useraccount, //微信用户唯一标识
            username: e.detail.userInfo.nickName //微信用户名            
          }
        },
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          //从数据库获取用户信息
          console.log("小程序用户首次登陆注册成功！");
          that.queryUsreInfo();
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../commodity/commodity'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function() {

    wx.request({
      url: app.d.userUrl + "/GdWxUserService/wxselUser",
      data: {
        data: app.globalData.user.useraccount
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        app.globalData.user = res.data.data;
        var id = app.globalData.user.userId;
        if (id=""&&id==null){
          that.bindGetUserInfo()
        }
      }
    })
  },

})
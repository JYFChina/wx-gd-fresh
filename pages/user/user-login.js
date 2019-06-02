var app = getApp();

Page({
  data: {
    userOpenid: "",
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;

   
    // 查看是否授权
    that.addUser();
  },
  //获取用户信息接口
  queryUsreInfo: function() {
   
    var that = this;
    wx.request({
      url: app.d.userUrl + "/GdWxUserService/wxselUser",
      data: {
        data: app.globalData.openid
      },
      method: "POST",
      success: function(res) {
        app.globalData.user = res.data.data;     
      }
    })
  },
  addUser: function() {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              var id = app.globalData.user.userId;
              //用户已经授权过 
              if (app.globalData.openid) {
                setTimeout(function() {
                  wx.reLaunch({
                    url: '../commodity/commodity'
                  })
                }, 3000)
              }

            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log(e.detail.userInfo)
      that.setData({
        userInfo: e.detail.userInfo
      })
      app.globalData.userInfo = e.detail.userInfo;
      // 插入登录的用户的相关信息到数据库
      wx.request({
        url: app.d.userUrl + "/GdWxUserService/wxsaveUser",
        data: {
          data: {
            useraccount: app.globalData.openid, //微信用户唯一标识
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
  registeredUser: function() {
    var that=this;
   
    if (that.data.userInfo) {
      
      // 插入登录的用户的相关信息到数据库
      wx.request({
        url: app.d.userUrl + "/GdWxUserService/wxsaveUser",
        data: {
          data: {
            useraccount: app.globalData.openid, //微信用户唯一标识
            username: that.data.userInfo.nickName //微信用户名            
          }
        },
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //从数据库获取用户信息
          console.log("小程序用户首次登陆注册成功！");
          that.queryUsreInfo();
        }
      });
  
   
    }
  }

})
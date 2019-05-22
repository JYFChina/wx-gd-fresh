//app.js
App({
  globalData: {
    userInfo: null,
    category: '全部',
    openid: '',
    user: {
      userId: "",
      useraccount: "",
      username: ""
    }
  },
  d: {
    hostUrl: 'http://ti25t6.natappfree.cc',
    shopUrl: "http://ti25t6.natappfree.cc/gs",
    orderUrl: 'http://ti25t6.natappfree.cc/os',
    userUrl: 'http://ti25t6.natappfree.cc/as',
    userId:'',
    appId: "",
    appKey: "",
    vipUrl: 'http://ti25t6.natappfree.cc/vs',
  },
  onLaunch: function() {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: function(res) {
        console.log(res)
        var code = res.code;
        wx.request({
          url: that.d.hostUrl + '/as/GdWxUserService/wxlogin.do?code=' + code,
          method: 'GET',
          data: {

          },
          success: function(result) {
            that.globalData.openid = result.data.data.openid;
            that.globalData.user.useraccount = result.data.data.openid
            console.log(that.globalData.openid);
          }
        })


      }

    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            that.globalData.userInfo = res.userInfo

            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)
                console.log("测试打开的权限")
                res.authSetting = {
                  "scope.userInfo": true,
                  "scope.userLocation": true
                }
              }
            })
          }
        })

      }
    })

  }, //获取用户信息
  getUserInfo: function(cb) {
    var that = this
    wx.login({
      success: function() {
        wx.getUserInfo({
          success: function(res) {
            that.globalData.userInfo = res.userInfo
            console.log(res.userInfo);
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
  }
})
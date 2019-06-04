//app.js
App({
  globalData: {
    userInfo: null,
    category: '全部',
    openid: '',
    storeid: "1",
    storename:"",
    peison:"",//是否在配送范围内
    lal:"",//门店经纬度
    user: {
      userId: "",
      useraccount: "",
      username: "",
      vipphone:"",
      vipdiscount:"0.0",
      viplv:""    
    }
  },
  d: {
    hostUrl: 'http://qpr45x.natappfree.cc',
    shopUrl: "http://qpr45x.natappfree.cc/gs",
    orderUrl: 'http://qpr45x.natappfree.cc/os',
    userUrl: 'http://qpr45x.natappfree.cc/as',
    userId:'',
    appId: "",
    appKey: "",
    storUrl:"http://qpr45x.natappfree.cc/ms",
    vipUrl: 'http://qpr45x.natappfree.cc/vs',
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
            that.globalData.user.useraccount = result.data.data.openid;
           
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

  }, // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  
  //获取用户信息
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
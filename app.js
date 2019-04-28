//app.js
App({
  d: {
    hostUrl: 'http://zgw.nat300.top',
    shopUrl:"",
    hostImg: 'http://img.ynjmzb.net',
    hostVideo: 'http://zhubaotong-file.oss-cn-beijing.aliyuncs.com',
    userId: 1,
    appId: "",
    appKey: "",
    ceshiUrl: 'https://wxplus.paoyeba.com/index.php',
  },
  onLaunch: function() {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function(res) {
        console.log(res)
        var code = res.code;
        wx.request({
          url: 'https://a7888716.ngrok.io/GdWxUserService/wxlogin.do?code=' + code,
          method: 'GET',
          data: {

          },
          success: function(result) {

            if (result.statusCode == "404") {
              console.log("没有找到你要访问的资源，路径问题")
            } else {
              
              that.globalData.openid = result.data.data.openid;
              console.log(that.globalData.openid)
            }
          }
        })
      }

    })
    // 获取用户信息
    var that = this;
    wx.getSetting({
      success: res => {

        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId

            that.globalData.userInfo = res.userInfo
            console.log(that.globalData.userInfo)
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
  },
  globalData: {
    userInfo: null,
    category: '全部',
    openid: 'oeZmf4sSH60bRl2URuUdmPf5qQcw'

  }
})
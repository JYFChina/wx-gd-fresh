//app.js
App({
  globalData: {
    userInfo: null,//用户信息
    category: '全部',
    openid: 'oeZmf4hLE_y__hrO7_e-CESAiZkA',
    storeid: "1",
    storename:"",//门店名
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
  //配置的域名
  d: {
    // hostUrl: 'http://171.16.1.181:8999',
    // shopUrl: "http://171.16.1.181:8333",
    // orderUrl: 'http://171.16.1.181:8555',
    // userUrl: 'http://171.16.1.181:8222',
    // userId:'',
    // appId: "",
    // appKey: "",
    // storUrl:"http://171.16.1.181:8444",
    hostUrl: 'http://255c7777h3.zicp.vip:43035',
    shopUrl: "http://255c7777h3.zicp.vip:43035/gs",
    orderUrl: 'http://255c7777h3.zicp.vip:43035/os',
    vipUrl: 'http://255c7777h3.zicp.vip:43035c/vs',
    userUrl: 'http://255c7777h3.zicp.vip:43035/as',
    userId:'',
    appId: "",
    appKey: "",
    storUrl:"http://255c7777h3.zicp.vip:43035/ms"
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
            if (result.data.data!=null){
              that.globalData.openid = result.data.data.openid;
              that.globalData.user.useraccount = result.data.data.openid;
            }else{
              that.globalData.openid ="oeZmf4hLE_y__hrO7_e-CESAiZkA";
              that.globalData.user.useraccount ="oeZmf4hLE_y__hrO7_e - CESAiZkA" ;
            }
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
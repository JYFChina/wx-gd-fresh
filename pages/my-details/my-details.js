// pages/my-details /my-details.js


Page({

  /**
   * 页面的初始数据
   */
  data: {

    user: {

    }
  },
  onSuccess(res) {
    console.log(res.detail)
  },
  onFail(res) {
    console.log(res)
  },
  go: function() {
    console.log(this.user)

  },
  getPhoneNumber(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  onGotUserInfo(e) {
    console.log("E的值为:============" + e)
    console.log(e);
    this.setData({
      "user.city": e.detail.userInfo.city,
      "user.nickName": e.detail.userInfo.nickName,
      "user.country": e.detail.userInfo.country,
      "user.avatarUrl": e.detail.userInfo.avatarUrl,
      "user.province": e.detail.userInfo.province
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    // wx.login({
    //   success: res => {
    //     // ------ 获取凭证 ------
    //     var code = res.code;
    //     console.log(code)
    //     if (code) {
    //       // console.log('获取用户登录凭证：' + code);
    //       // ------ 发送凭证 ------
    //       wx.request({
    //        // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
    //         data: { code: code },
    //         method: 'POST',
    //         header: {
    //           'content-type': 'application/json'
    //         },
    //         success: function (res) {
    //           if (res.statusCode == 200) {
    //             // console.log("获取到的openid为：" + res.data)
    //             // that.globalData.openid = res.data
    //             wx.setStorageSync('openid', res.data)
    //           } else {
    //             console.log(res.errMsg)
    //           }
    //         },
    //       })
    //     } else {
    //       console.log('获取用户登录失败：' + res.errMsg);
    //     }
    //   }
    // })



  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
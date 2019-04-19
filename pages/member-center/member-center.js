// pages/member-center/member-center.js
Page({
  phone_zz: "输入的手机号不能为空",
  disabled: true,
  sms: "123131",
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      disabled: true
    })
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

  telChange: function(event) {
    const phone = event.detail || event;

    let disable = '';
    if (phone) {
      if (/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
        this.setData({
          "phone_zz": ""
        })
        disable = true;
      } else {
        this.setData({
          "phone_zz": "您输入的手机号码有误"
        })
        disable = true;
      }
    } else {
      this.setData({
        "phone_zz": "输入的手机号不能为空"
      })
      disable = true
    }
    this.setData({
      disabled: disable
    });
    if (this.data.disabled === true) {
      return false;
    } else {
      return true;
    }
  }
})
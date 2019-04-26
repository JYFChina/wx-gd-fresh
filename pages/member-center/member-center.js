// pages/member-center/member-center.js
Page({

  disabled: true,

  /**
   * 页面的初始数据
   */
  data: {
    sms: "",
    isnoVip: null,
    phone: '',
    money: '',
    phone_zz: "手机号不能为空",
    phoneboder: "transparent",
    huiyuan:'transparent',
    huiyuannn:'会员卡账号不能为空'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      disabled: true
    })
  },
  //获取用户输入的会员卡号
  onInput: function(e) {

    if (e.detail.value != '' && e.detail.value != null) {
      this.setData({
        isnoVip: e.detail.value,
        disabled: false
      })
    }else{
      this.setData({
        
        disabled: true
      })
    }

  },
  //获取用户输入的手机号
  phoneWdInput: function(e) {

    if (/^(\d?)+(\.\d{0,2})?$/.test(e.detail.value)) {
      while (e.detail.value != this.phone) {
        if (/^1[34578]\d{9}$/.test(e.detail.value)) {
          console.log(e.detail.value);
          this.setData({
            phone: e.detail.value,
            phoneboder: "green",
            disabled: false
          })
        } else {
          this.setData({
            phoneboder: "red",
            disabled: true
          })
        }
        break;
      }
      return e.detail.value;
    } else {
      this.setData({
        disabled: true,
        phoneboder: "red"
      })
      return e.detail.value.substring(0, e.detail.value.length - 1);
    }

  },
  //获取用户输入的充值金额
  moneyWdInput: function(e) {
    this.setData({
      money: e.detail.value
    })
  },
  //获取用户输入的短信验证码
  smsWdInput: function(e) {
    this.setData({
      sms: e.detail.value
    })
  },
  bindmember: function() {
    var that = this;
    console.log(that.data.isnoVip)
    wx.request({
      url: 'https://0bf212f4.ngrok.io/GdWxUserService/wxbindMember',
      method:"POST",
      data:{
        data:{

        }
      },
        success: function (result) {

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
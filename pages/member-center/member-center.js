// pages/member-center/member-center.js

var app = getApp();
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
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
    huiyuan: 'transparent',
    huiyuannn: '会员卡账号不能为空',
    toastHidden: true, //吐司  
    toastText: ''//吐司文本  
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
        disabled: true
      })
    } else {
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
  onToastChanged: function () {
    this.setData({
      toastHidden: true
    });
  },
  bindmember: function(e) {
    var that = this;



    console.log(that.data.isnoVip + app.globalData.openid)
    var useraccount = app.globalData.openid
    wx.request({
      url: 'https://a7888716.ngrok.io/GdWxUserService/wxbindMember',
      method: "POST",
      data: {
        data: {
          "useraccount": useraccount,
          "phone": that.data.phone,
          "vipbalance": that.data.money,
          "vipId": that.data.isnoVip
        }
      },
      success: function(result) {

        if (result.statusCode == "404") {
          wx.showToast({
            title: '没有你访问的资源',
            icon: 'loading',
            duration: 4000,
            mask: true
          })
        
        } else {

          wx.showToast({
            title: '请稍后........',
            icon: 'loading',
            duration: 4000,
            mask: true
          })
          wx.navigateTo({

            url: 'member-message',
          })
          console.log(result)
        }
      }
    })
  }

})
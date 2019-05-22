// pages/member-center/member-center.js

var app = getApp();
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

  disabled: true,

  /**
   * 页面的初始数据
   */
  data: {
    code: '验证码输入结果',
    bindbool: false,
    binding: 0, //0：已绑定，1：未绑定
    sms: "",
    isnoVip: null,
    phone: '13937900894',
    money: '',
    phone_zz: "手机号不能为空",
    phoneboder: "transparent",
    huiyuan: 'transparent',
    huiyuannn: '会员卡账号不能为空',
    toastHidden: true, //吐司  
    toastText: '' //吐司文本  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    //选择组件对象
    this.verifycode = this.selectComponent("#verifycode");
    // that.isBinding();
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
            disabled: true
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
    var that = this;

    this.setData({
      sms: e.detail.value
    })
  },
  onToastChanged: function() {
    this.setData({
      toastHidden: true
    });
  }, //进行绑定会员
  bindmember: function(e) {
    var that = this;
    console.log(app.globalData.user.userId)
    wx.request({
      url: app.d.vipUrl + '/VipService/updVipUserId',
      method: "POST",
      data: {
        data: {
          "phone": that.data.phone,
          "userId": app.globalData.user.userId
        }
      },
      success: function (result) {

        if (result.statusCode == "404") {
          wx.showToast({
            title: '没有你访问的资源',
            icon: 'loading',
            duration: 4000,
            mask: true
          })

        } else {

          // wx.showToast({
          //   title: '请稍后........',
          //   icon: 'loading',
          //   duration: 4000,
          //   mask: true
          // })
          // wx.navigateTo({

          //   url: 'member-message',
          // })
          console.log(result)
        }
      }
    })
  },
  //解除绑定会员
  isBinding: function() {
    //弹出组件,此处必须把this重新赋予变量不然callback内部会提示找不到this

      // var that = this;
      // console.log(app.globalData.user.userId)
      // wx.request({
      //   url: app.d.vipUrl + '/VipService/updVipUserId',
      //   method: "POST",
      //   data: {
      //     data: {
      //       "phone": that.data.phone,
      //       "userId": app.globalData.user.userId
      //     }
      //   },
      //   success: function(result) {

      //     if (result.statusCode == "404") {
      //       wx.showToast({
      //         title: '没有你访问的资源',
      //         icon: 'loading',
      //         duration: 4000,
      //         mask: true
      //       })

      //     } else {

      //       // wx.showToast({
      //       //   title: '请稍后........',
      //       //   icon: 'loading',
      //       //   duration: 4000,
      //       //   mask: true
      //       // })
      //       // wx.navigateTo({

      //       //   url: 'member-message',
      //       // })
      //       console.log(result)
      //     }
      //   }
      // })
    }

    , //判断预留手机号是否存在
  panduam: function() {
    var that = this;
    var is = false;
    wx.request({
      url: app.d.vipUrl + '/VipService/updVipUserId',
      method: "POST",
      data: {
        data: {
          "phone": that.data.phone,
          "userId": app.globalData.user.userId
        }
      },
      success: function(result) {
        console.log(result.data)
        if (result.statusCode == "404") {
          wx.showToast({
            title: '没有你访问的资源',
            icon: 'loading',
            duration: 4000,
            mask: true
          })

        } else if (result.statusCode == "200" && result.data.code == "101") {
          wx.showToast({
            title: '预留手机号不存在！',
            icon: 'loading',
            duration: 4000,
            mask: true
          })
        } else {
          is = true
          wx.showToast({
            title: '请稍后........',
            icon: 'loading',
            duration: 4000,
            mask: true
          })
          // wx.navigateTo({

          //   url: 'member-message',
          // })
          console.log(result)
        }
      }
    })
    return is
  },//发送验证码
  telChange: function() {
    var that = this;
   var is= that.panduam();
   console.log(is);
    if (is==true&&that.data.sms == "12345") {
      this.setData({
        disabled: false
      })
    }

  },
  //显示会员绑定信息
  vipDetail:function(){
    wx.request({
      url: '',
      data: {
        data:{

        }
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }, openVerifyCodeView: function () {
    //弹出组件,此处必须把this重新赋予变量不然callback内部会提示找不到this
    var _this = this;
    console.log(_this.data.code);
    _this.verifycode.showView({
      phone: _this.data.phone,
      inputSuccess: function (phoneCode) {
        //调用组件关闭方法
        _this.verifycode.closeView();
        //设置数据
        _this.setData({
          code: phoneCode
        });
      }
    });
  }
})
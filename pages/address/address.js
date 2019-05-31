// pages/tanchu/tanchu.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    checked: true,

    disabled: true,

    interval: 5000,
    duration: 1000,
    userAddress: {
      phone: '',
      consignee: '',
      address: '',
      useraccount: ''
    },
    company: "",
    // 普通选择器列表设置,及初始化 
    countryList: ['中国', '美国', '英国', '日本', '韩国', '巴西', '德国'],
    countryIndex: 6,
    // 省市区三级联动初始化 
    region: ["河南省", "洛阳市", "涧西区"], // 多列选择器(二级联动)列表设置,及初始化
    multiArray: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ],
    multiIndex: [3, 5],
    // 多列选择器(三级联动)列表设置,及初始化 
    multiArray3: [
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
    ],
    multiIndex3: [3, 5, 4]

  },
  changeCountry(e) {

    this.setData({
      countryIndex: e.detail.value
    });
  },
  // 选择省市区函数 
  changeRegin(e) {
    console.log(e.detail.value)
    this.setData({
      region: e.detail.value,
      address: e.detail.value
    });
  },
  // 选择二级联动 
  changeMultiPicker(e) {

    this.setData({
      multiIndex: e.detail.value
    })
  },
  // 选择三级联动 
  changeMultiPicker3(e) {

    this.setData({
      multiIndex3: e.detail.value
    })
  },

  onChange({
    detail
  }) {

    console.log(detail)
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.getSetting({
      success: res => {

        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.userInfo = res.userInfo
            this.setData({
              "userInfo": res.userInfo
            })
            console.log(this.userInfo)
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })

      }
    })
  },

  nameChange: function(event) {
    const name = event.detail || event;
    var that = this;
    that.setData({
      "userAddress.name": name
    })

  },
  detailedChange: function(event) {
    var that = this;
    var address = event.detail || event;

    that.setData({
      "userAddress.address": address
    })
  },
  telChange: function(event) {
    const phone = event.detail || event;
    var that = this;
    let message = '';
    let disable = '';
    if (phone) {
      if (/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
        message = '';
        console.log(phone)
        that.setData({
          "userAddress.phone": phone
        })
        disable = false;
      } else {
        message = '您输入的手机号码有误';
        disable = true;
      }
    } else {
      message = '输入的手机号不能为空',
        disable = true
    }
    this.setData({
      telMessage: message,
      disabled: disable,
      txn_tel: phone
    });
    if (this.data.disabled === true) {
      return false;
    } else {
      return true;
    }
  },
  addAddress: function() {
    var that = this;
    var userid = app.globalData.user.userid;
    var consignee = that.data.userAddress.name;
    var phone = that.data.userAddress.phone;
    
    var updatedBy = app.globalData.user.username;
    var useraccount = app.globalData.user.useraccount;
    var address = that.data.region[0] + "-" + that.data.region[1] + "-" + that.data.region[0] + "-" + that.data.userAddress.address;
    var status = 1
    if (that.data.checked) {
      status = 1
    } else {
      status = 0
    }
    if (phone == "" && userid == "" && consignee=="") {
      wx.showToast({
        title: '地址地区,手机,姓名不能为空',
        duration: 3000
      });
    } else {
      wx.request({

        url: app.d.userUrl + '/GdWxUserService/addAddress',
        data: {
          data: {
            userid: userid,
            phone: that.data.userAddress.phone,
            consignee: consignee,
            updatedBy: updatedBy,
            useraccount: useraccount,
            address: address,
            status: status
          }
        },
        header: {},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res.data);
          wx.navigateTo({
            url: '../address/address',
          })
        },
        fail: function(res) {

        },
        complete: function(res) {},
      })
    }

  }

})
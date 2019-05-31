var app = getApp();
// pages/order/downline.js
Page({
  data: {
    itemData: {},
    userId: 0,
    paytype: 'weixin', //0线下1微信
    remark: '',
    orderid: '',
    addrId: 0, //收货地址//测试--
    btnDisabled: false,
    proData: [],
    odrx: [],
    vipbalance: "",
    vipphone:"",
    addRess: {

    },
    total: 0,
    vprice: 0,
    vipdiscount: "",
    vid: 0,
    viplv: "0",
    addemt: 1,
    vou: []
  },
  onLoad: function(options) {
    console.log(options.orderid)
    var uid = app.globalData.user.userId;
    this.setData({
      orderid: options.orderid,
      userId: uid
    });
    this.loadProductDetail();
    this.vipBool();
  },
  onShow: function() {
    this.loadProductDetail();
    this.vipBool();
  },
  loadProductDetail: function() {
    var that = this;
    wx.request({
      url: app.d.orderUrl + '/GDOrderShopService/selOrderShopByIdTWO',
      method: 'post',
      data: {
        data: that.data.orderid
      },
      success: function(res) {
        //that.initProductData(res.data);
        var adds = res.data.data.ads;

        if (adds) {
          var addrId = adds.takedeliveryidid;
          that.setData({
            addRess: res.data.data.ads,
            addrId: addrId
          });

        }
        var pro = []
        for (var i = 0; i < res.data.data.comList.length; i++) {

          for (var j = 0; j < res.data.data.ordList.length; j++) {
            if (res.data.data.comList[i].comdityId == res.data.data.ordList[j].comdityId) {
              res.data.data.comList[i].comdnum = res.data.data.ordList[j].num
            }
          }

          pro.push(res.data.data.comList[i])
        }

        that.setData({
          addemt: "1",
          proData: pro,
          total: res.data.data.ordx[0].comditytrueprice,
          vprice: res.data.data.ordx[0].ordermoney,

        });
        //endInitData
      },
    });
  },
  vipBool: function() {
      var that = this;
      wx.request({
        url: app.d.vipUrl + '/VipService/selVipByVipPhoneAndUserId',
        method: 'post',
        data: {
          data: {
            userId: app.globalData.user.userId
          }
        },
        success: function(res) {
          that.setData({
            viplv: res.data.data.viplv,
            vipbalance: res.data.data.vipbalance,
            vipphone: res.data.data.vipphone
          })
          if (that.data.viplv != "") {
            that.vipBool2()
          }

        },
      });
    }

    ,
  vipBool2: function() {
    var that = this;
    var s = that.vipBool
    console.log(s);
    wx.request({
      url: app.d.vipUrl + '/VipLvService/selVipLvByViplv',
      method: 'post',
      data: {
        data: that.data.viplv
      },
      success: function(res) {
        console.log(res.data)


        //endInitData
      },
    });
  },
  remarkInput: function(e) {
    this.setData({
      remark: e.detail.value,
    })
  },

  //选择优惠券
  getvou: function(e) {
    var vid = e.currentTarget.dataset.id;
    var price = e.currentTarget.dataset.price;
    var zprice = this.data.vprice;
    var cprice = parseFloat(zprice) - parseFloat(price);
    this.setData({
      total: cprice,
      vid: vid
    })
  },

  //微信支付
  createProductOrderByWX: function(e) {
    this.setData({
      paytype: 'weixin',
    });
    var that = this;
    if (that.data.vipbalance < that.data.total) {
      wx.showToast({
        title: "会员账户余额不足，请到店充值!",
        duration: 3000
      });
    } else {
      this.wxpay(that.data.orderid)
    }


  },

  //线下支付
  createProductOrderByXX: function(e) {
    this.setData({
      paytype: 'cash',
    });
    wx.showToast({
      title: "凭订单号到店提货付款!",
      duration: 3000,
      success: function() {
        wx.showToast({
          title: "请在营业时间取货!",
          duration: 3000
        });
      }
    });
    return false;
 
  },

 

  //调起微信支付
  wxpay: function(orderid) {
    var that=this;
    wx.request({
      url: app.d.orderUrl + '/OrderService/payOrder',
      data: {
        data: {
          orderid: orderid,
          address: that.data.addRess.address,
          recipients: that.data.addRess.recipients,
          phone: that.data.vipphone,
          ordermoney: that.data.total,
          userId:app.globalData.user.userId,
          storeid: app.globalData.storeid
        }
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res) {
      
        wx.showToast({
          title: res.data.msg,
          duration: 2000,
          success:function(){
            wx.navigateTo({
              url: '../user/dingdan',
            })
          }
        });
      
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！err:wxpay',
          duration: 2000
        });
      }
    })
  },


});
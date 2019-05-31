// pages/user/dingdan.js
//index.js  
//获取应用实例  
var app = getApp();
var common = require("../../utils/common.js");
Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    isStatus: 'pay', //10待付款，20待发货，30待收货 40、50已完成
    page: 0,
    refundpage: 0,
    orderList0: [], //待付款
    orderList1: [], //待发货
    orderList2: [], //待收货
    orderList3: [], //已完成
    orderList4: [], //退款/售后
  },
  onShow:function(){
   this. loadOrderList();
  },
  onLoad: function(options) {
    this.initSystemInfo();
    this.setData({
      currentTab: parseInt(options.currentTab),
      // isStatus:options.otype
    });

    if (this.data.currentTab == 4) {
      this.loadReturnOrderList();
    } else {
      this.loadOrderList();
    }
  },
  getOrderStatus: function() {
    return this.data.currentTab == 0 ? 1 : this.data.currentTab == 2 ? 2 : this.data.currentTab == 3 ? 3 : 0;
  },

  //取消订单
  removeOrder: function(e) {
    var that = this;
    var orderId = e.currentTarget.dataset.orderId;
    wx.showModal({
      title: '提示',
      content: '你确定要取消订单吗？',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.orderUrl + '/OrderService/removeOrder',
          method: 'post',
          data: {
            data: orderId,
           
          },
          success: function (res) {
            //--init data
            var status = res.data.code;
            if (status == 0) {
              wx.showToast({
                title: '操作成功！',
                duration: 2000
              });
              that.loadOrderList();
            } else {
              wx.showToast({
                title: res.data.err,
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });

      }
    });
  },

  //确认收货
  recOrder: function(e) {
    var that = this;
    var orderId = e.currentTarget.dataset.orderId;
    wx.showModal({
      title: '提示',
      content: '你确定已收到宝贝吗？',
      success: function (res) {
        res.confirm && wx.request({
          url: app.d.orderUrl + '/OrderService/updOrderStartOK',
          method: 'post',
          data: {
            data: orderId,
          },
          success: function (res) {
            //--init data
            var status = res.data.status;
            if (status == 1) {
              wx.showToast({
                title: '操作成功！',
                duration: 2000,
                success:function(){
                  that.loadOrderList(); 
                }
              });
             
            } else {
              wx.showToast({
                title: res.data.err,
                duration: 2000
              });
            }
          },
          fail: function () {
            // fail
            wx.showToast({
              title: '网络异常！',
              duration: 2000
            });
          }
        });

      }
    });
  },

  loadOrderList: function() {
    var that = this;
    wx.request({
      url: app.d.orderUrl + '/OrderService/userOrderQuery',
      method: 'post',
      data: {
        data: {
          userId: app.globalData.user.userId,
          orderScene: "2",
        }
      },
      success: function(res) {
        //--init data        
        var status = res.data.status;
        var list = res.data.data;
        var orderlist0 = [];
        var orderlist1 = [];
        var orderlist2 = [];
        var orderlist3 = [];
        var orderlist4 = [];
        
        app.globalData.storeid=res.data.data[0].storeid;
        
        for (var i = 0; i < res.data.data.length; i++) {
         

          if (res.data.data[i].orderStat == "0") {
            res.data.data[i].num= res.data.data[i].table.length          
            orderlist0.push(res.data.data[i])
          } else if (res.data.data[i].orderStat == "1") {
            res.data.data[i].num = res.data.data[i].table.length          
            orderlist1.push(res.data.data[i])
          } else
          if (res.data.data[i].orderStat == "3") {
            res.data.data[i].num = res.data.data[i].table.length     
            orderlist2.push(res.data.data[i])
          } else
          if (res.data.data[i].orderStat == "4") {
            res.data.data[i].num = res.data.data[i].table.length      
            orderlist3.push(res.data.data[i])
          } else
          if (res.data.data[i].orderStat == "5") {
            res.data.data[i].num = res.data.data[i].table.length
            orderlist4.push(res.data.data[i])
          }
        }
        // 订单状态  0: 待付款   1: 已付款 / 待发货   2: 已取消  3: 已发货 / 待确认  4: 已完成 ，5：申请退款, 6: 挂单中 7：已退款 8：到店支付
        that.setData({
          orderList0: orderlist0, //待付
          orderList1: orderlist1, //待发
          orderList2: orderlist2, //待收
          orderList3: orderlist3, //完成
          orderList4: orderlist4 //退款
        })
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },

  loadReturnOrderList: function() {
  
  },
  initSystemInfo: function() {
    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
 
 
  payOrderByWechat: function(e) {
    var order_id = e.currentTarget.dataset.orderId;
    var order_sn = e.currentTarget.dataset.ordersn;
    if (!order_sn) {
      wx.showToast({
        title: "订单异常!",
        duration: 2000,
      });
      return false;
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: order_id,
        order_sn: order_sn,
        uid: app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function(res) {
        if (res.data.status == 1) {
          var order = res.data.arr;
          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function(res) {
              wx.showToast({
                title: "支付成功!",
                duration: 2000,
              });
              setTimeout(function() {
                wx.navigateTo({
                  url: '../user/dingdan?currentTab=1&otype=deliver',
                });
              }, 3000);
            },
            fail: function(res) {
              wx.showToast({
                title: res,
                duration: 3000
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function(e) {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },


})
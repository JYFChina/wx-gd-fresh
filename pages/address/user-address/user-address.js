// pages/address/user-address/user-address.js
var app = getApp()
Page({
  data: {
    address: [],
    radioindex: '',
    pro_id: 0,
    num: 0,
    cartId: 0
  },
  onLoad: function() {
    var that = this;
    that.DataonLoad();

  },

  onReady: function() {
    // 页面渲染完成
  },
  setDefault: function(e) {
    var that = this;
    console.log(e + app.globalData.openid);
    var addrId = e.currentTarget.dataset.id;

    wx.request({
      url: app.d.userUrl + '/GdWxUserService/updAddress',
      data: {
        data: {
          useraccount: app.globalData.openid,
          takedeliveryidid: addrId
        }
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function(res) {
        // success
        console.log(res)
        if (res.data.status == "500" || res.data.status=="429"){
          wx.showToast({
            title: '操作过于频繁,20秒后重试',
            duration: 15000
          });
        }
        var status = res.data.data;
        // var cartId = that.data.cartId;
        if (status == 1) {
          // if (cartId) {
          //   wx.redirectTo({
          //     url: '../../order/pay?cartId=' + cartId,
          //   });
          //   return false;
          // }

          wx.showToast({
            title: '操作成功！',
            duration: 2000,
            success:function(){
              that.DataonLoad();
            }
          });
          
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })

  },
  delAddress: function(e) {
    var that = this;
    var addrId = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm && wx.request({
          url: app.d.userUrl + '/GdWxUserService/removeAddress',
          data: {
            useraccount: app.globalData.openid,
            takedeliveryidid:addrId
          },
          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      
          success: function (res) {
            console.log(res)
            // success
            var status = res.data.status;
            if(status==1){
              that.DataonLoad();
            }else{
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
  DataonLoad: function() {
     var that = this;
    //  页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: app.d.userUrl + '/GdWxUserService/userAddress',
      contentType: 'application/json',
      method: 'POST',
      dataType: 'json',
      data: {
        data: app.globalData.openid
      },
      success: function (res) {
        var address = res.data.data;
        if (address == '') {
          var address = []
        }
        that.setData({
          address: res.data.data
        })
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  
  },
})
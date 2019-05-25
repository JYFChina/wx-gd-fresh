var app = getApp();
// pages/order/downline.js
Page({
  data:{
    itemData:{},
    userId:0,
    paytype:'weixin',//0线下1微信
    remark:'',
    orderid:'',
    addrId:0,//收货地址//测试--
    btnDisabled:false,
    proData:[],
    addRess:{
    
    },
    total:0,
    vprice:0,
    vid:0,
    addemt:1,
    vou:[]
  },
  onLoad:function(options){
    var uid = app.globalData.user.userId;
    this.setData({
      orderid: options.orderid,
      userId: uid
    });
    this.loadProductDetail();
  },
  onShow:function(){
    this.loadProductDetail();
  },
  loadProductDetail:function(){
    var that = this;
    wx.request({
      url: app.d.orderUrl + '/GDOrderShopService/selOrderShopByIdTWO',
      method:'post',
      data: {
        data: that.data.orderid
      },
      success: function (res) {
        console.log(res.data)
        //that.initProductData(res.data);
        var adds = res.data.data.ads;
        
        if (adds){
          var addrId = adds.takedeliveryidid;
          that.setData({
            addRess: res.data.data.ads,
            addrId: addrId
          });
          console.log(that.data.addRess)
        }
        var pro=[]
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
          total: res.data.data.ordx[0].ordermoney,
          vprice: res.data.data.ordx[0].ordermoney,
          vou: res.data.data.vou,
        });
        //endInitData
      },
    });
  },

  remarkInput:function(e){
    this.setData({
      remark: e.detail.value,
    })
  },

 //选择优惠券
  getvou:function(e){
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
  createProductOrderByWX:function(e){
    this.setData({
      paytype: 'weixin',
    });

    this.createProductOrder();
  },

  //线下支付
  createProductOrderByXX:function(e){
    this.setData({
      paytype: 'cash',
    });
    wx.showToast({
      title: "线下支付开通中，敬请期待!",
      duration: 3000
    });
    return false;
    this.createProductOrder();
  },

  //确认订单
  createProductOrder:function(){
    // this.setData({
    //   btnDisabled:false,
    // })

    // //创建订单
    // var that = this;
    // wx.request({
    //   url: app.d.ceshiUrl + '/Api/Payment/payment',
    //   method:'post',
    //   data: {
    //     uid: that.data.userId,
    //     cart_id: that.data.cartId,
    //     type:that.data.paytype,
    //     aid: that.data.addrId,//地址的id
    //     remark: that.data.remark,//用户备注
    //     price: that.data.total,//总价
    //     vid: that.data.vid,//优惠券ID
    //   },
    //   header: {
    //     'Content-Type':  'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     //--init data        
    //     var data = res.data;
    //     if(data.status == 1){
    //       //创建订单成功
    //       if(data.arr.pay_type == 'cash'){
    //           wx.showToast({
    //              title:"请自行联系商家进行发货!",
    //              duration:3000
    //           });
    //           return false;
    //       }
    //       if(data.arr.pay_type == 'weixin'){
    //         //微信支付
    //         that.wxpay(data.arr);
    //       }
    //     }else{
    //       wx.showToast({
    //         title:"下单失败!",
    //         duration:2500
    //       });
    //     }
    //   },
    //   fail: function (e) {
    //     wx.showToast({
    //       title: '网络异常！err:createProductOrder',
    //       duration: 2000
    //     });
    //   }
    // });
  },
  
  //调起微信支付
  wxpay: function(order){
      wx.request({
        url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
        data: {
          order_id:order.order_id,
          order_sn:order.order_sn,
          uid:this.data.userId,
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'Content-Type':  'application/x-www-form-urlencoded'
        }, // 设置请求的 header
        success: function(res){
          if(res.data.status==1){
            var order=res.data.arr;
            wx.requestPayment({
              timeStamp: order.timeStamp,
              nonceStr: order.nonceStr,
              package: order.package,
              signType: 'MD5',
              paySign: order.paySign,
              success: function(res){
                wx.showToast({
                  title:"支付成功!",
                  duration:2000,
                });
                setTimeout(function(){
                  wx.navigateTo({
                    url: '../user/dingdan?currentTab=1&otype=deliver',
                  });
                },2500);
              },
              fail: function(res) {
                wx.showToast({
                  title:res,
                  duration:3000
                })
              }
            })
          }else{
            wx.showToast({
              title: res.data.err,
              duration: 2000
            });
          }
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
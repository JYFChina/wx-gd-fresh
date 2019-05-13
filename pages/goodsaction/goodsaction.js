var app = getApp();
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    detail: {
      proName: "测试数据",
      miaoshu: "66666666"
    } //商品描述

  },
  onLoad(options) {

    var data = options.data;
    console.log(data)
    var that = this;
    wx.request({
      url: app.d.shopUrl + '/GdCommodityService/selOne',
      data: data,
      header: {},
      contentType: 'application/json',
      method: 'post',
      dataType: 'json',
      success: function(res) {
        that.setData({
          background: [res.data.data.imagesurl, res.data.data.imagesurl, res.data.data.imagesurl]
        })
        // 页面加载是更新成你所选中的商品
        that.setData({
          "detail.price": res.data.data.comdityprice,
          "detail.miaoshu": res.data.data.comditydescribe,
          "detail.bianhao": res.data.data.comdityId,
          "detail.proName": res.data.data.comdityname,
          "detail.danjia": res.data.data.comditydescribe,
          "detail.image": [res.data.data.imagesurl, res.data.data.imagesurl, res.data.data.imagesurl]

        })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {

      },
    })

  },
  changeProperty: function(e) {
    var propertyName = e.currentTarget.dataset.propertyName
    var newData = {}
    newData[propertyName] = e.detail.value
    this.setData(newData)
  },
  changeIndicatorDots: function(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function(e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function(e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onClickRight: function() {
    wx.showToast({
      title: '其他',
      icon: 'succes',
      duration: 1000,
      mask: true
    })

  },
  onClickLeft: function() {
    wx.navigateTo({
      url: '../commodity/commodity',
    })
  },
  //添加购物车
  addCart: function(e) {
    wx.request({
      url: app.d.orderUrl + '/ShoppingCartService/addCartGoods',
      method: "post",
      dataType: 'json',
      data: {
        data: {
          comdityId: e.currentTarget.id, //商品编号
          useraccount: app.globalData.openid, //用户唯一标识
          userid:app.globalData.user.userId,
          num: 1 //商品数量默认为1
        }
      },
       success: function (res) {
         if(res.data.data=="1"){
           wx.switchTab({
             url: '../my-shopping-cart/my-shopping-cart',
           })
         }
    
      },
      fail: function (res) {
        if (res.statusCode=="500"){
          this.addCart()
        }
      }
    })
  

  },
  //立即购买
  buyGood: function(e) {
    console.log(e.currentTarget.id)
    wx.switchTab({
      url: '../order/pay',
    })
    // wx.request({
    //   url: hostUrl + '',
    //   method: "POST",
    //   data: {
    //     data: {
    //       "comdityId": e.currentTarget.id,//商品编号
    //       "openId": app.globalData.openid  //用户标识
    //     }
    //   }
    // })
  }
})
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
    count: "0",
    detail: {

    } //商品描述

  },
  onLoad(options) {
    var that = this;
    var data = options.data;
    this.loadShow(data)
    that.cartCount()
  },
  onShow: function() {
    var that = this;
    that.cartCount();
  },
  loadShow: function(data) {
    console.log(data)
    var that = this;
    that.cartCount()
    wx.request({
      url: app.d.shopUrl + '/GdCommodityService/selOnes',
      data: {
        data:{
          comdityId:data,
          storeid:1
        }
      },

      contentType: 'application/json',
      method: 'post',
      dataType: 'json',
      success: function(res) {
        console.log(res.data)
        that.setData({
          background: [res.data.data.gdImagesDTO.imagesurl, res.data.data.gdImagesDTO.imagesDTOS[0].imagesurl, res.data.data.gdImagesDTO.imagesDTOS[1].imagesurl]
        })
        var arr=[]
        for (var i = 0; i < res.data.data.gdImagesDTO.imagesDTOS.length;i++){
          arr.push(res.data.data.gdImagesDTO.imagesDTOS[i].imagesurl) 
        }
        // 页面加载是更新成你所选中的商品
        that.setData({
          "detail.price": res.data.data.discount,
          "detail.oldprice": res.data.data.comdityprice,
          "detail.miaoshu": res.data.data.comditydescribe,
          "detail.bianhao": res.data.data.comdityId,
          "detail.proName": res.data.data.comdityname,
          "detail.danjia": res.data.data.comditydescribe,
          "detail.image": arr

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
    var that=this;
    console.log(app.globalData.user.userId)
    wx.request({
      url: app.d.orderUrl + '/ShoppingCartService/addCartGoods',
      method: "post",
      dataType: 'json',
      data: {
        data: {
          comdityId: e.currentTarget.id, //商品编号
          useraccount: app.globalData.openid, //用户唯一标识
          userid: app.globalData.user.userId,
          num: 1 //商品数量默认为1
        }
      },
      success: function(res) {
        that.cartCount();
      },
      fail: function(res) {
        if (res.statusCode == "500") {
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
  },
  cartCount: function() {
    var that=this;
    wx.request({
      url: app.d.orderUrl + '/ShoppingCartService/cartCount',
      method: "post",
      dataType: 'json',
      data: {
        data: app.globalData.user.userId
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          count: res.data.data
        })


      },
      fail: function(res) {
        if (res.statusCode == "500") {
          this.addCart()
        }
      }
    })
  },
  onClickIcon: function() {
    wx.switchTab({
      url: '../my-shopping-cart/my-shopping-cart',
    })
  }
})
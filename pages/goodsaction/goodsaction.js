var app = getApp();
Page({
  data: {
    decoration: "none",
    orderIs: false,
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

    }, //商品描述
 
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
  //商品的详细
  loadShow: function(data) {
    console.log(data)
    var that = this;
    that.cartCount()
    wx.request({
      url: app.d.shopUrl + '/GdCommodityService/selOnes',
      data: {
        data: {
          comdityId: data,
          storeid: 1
        }
      },

      contentType: 'application/json',
      method: 'post',
      dataType: 'json',
      success: function(res) {
        console.log("商品数据")
        console.log(res.data)
        that.setData({
          background: [res.data.data.gdImagesDTO.imagesurl, res.data.data.gdImagesDTO.imagesDTOS[0].imagesurl, res.data.data.gdImagesDTO.imagesDTOS[1].imagesurl]
        })
        var arr = []
        for (var i = 0; i < res.data.data.gdImagesDTO.imagesDTOS.length; i++) {
          arr.push(res.data.data.gdImagesDTO.imagesDTOS[i].imagesurl)
        }
        var vipprice = app.globalData.user.vipdiscount * res.data.data.discount
        // 页面加载是更新成你所选中的商品
        that.setData({
          "detail.price": res.data.data.discount,
          "detail.oldprice": res.data.data.comdityprice,
          "detail.miaoshu": res.data.data.comditydescribe,
          "detail.bianhao": res.data.data.comdityId,
          "detail.proName": res.data.data.comdityname,
          "detail.danjia": res.data.data.comditydescribe,
          "detail.image": arr,
          "detail.vipprice": vipprice,
          "detail.viplv": app.globalData.user.viplv,
          carts: res.data
        })
        if (that.data.detail.viplv != "" && that.data.detail.viplv != null) {
          that.setData({
            "decoration": "line-through"
          })
        }
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
    var that = this;
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

        that.setData({
          "orderIs": true
        })
      },
      fail: function(res) {

        if (res.statusCode == "500") {
          this.addCart(e)
        }
      }
    })


  },
  //立即购买
  buyGood: function(e) {

    var that = this;

    var moeny=0;
    if (that.data.detail.oldprice > that.data.detail.price && that.data.detail.price!=null){
      moeny = that.data.detail.price
    
    }
    if (that.data.detail.oldprice > that.data.detail.vipprice && that.data.detail.vipprice != null){
      moeny = that.data.detail.vipprice
     
    } 
    if (that.data.detail.price > that.data.detail.vipprice && that.data.detail.vipprice != null){
      moeny = that.data.detail.vipprice
      
    }

      wx.request({
        url: app.d.orderUrl + '/OrderService/insertOrder',
        method: 'post',
        data: {
          data: {
            status: 1,
            userId: app.globalData.user.userId,
            vipId: app.globalData.user.vipphone, //vi手机号
            ordermeans: 4, // 交易手段 ,
            storeid: 1, //TODO:店铺编号 获取当前店铺编号
            ordertype: 0, //交易类型 (0-消费 1-退款)
            orderscene: 2, //交易场景
            ordermoney: moeny, //总价
            comditytrueprice: moeny,
            orderStat: "0",
            tableData:[{
              "comdityId": e.currentTarget.id,
              "comdityName": that.data.detail.proName,
              "num":1,

            }]
            //orderStat: 挂单中  已完成
          }
        },
        success: function (res) {
          console.log(res.data.msg)
          var status = 0;
          if (status == 0) {

            //存回data
            wx.navigateTo({
              url: '../order/pay?orderid=' + res.data.msg,
            })
          } else {
            wx.showToast({
              title: '操作失败！',
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

    

  },
  cartCount: function() {
    var that = this;
    wx.request({
      url: app.d.orderUrl + '/ShoppingCartService/cartCount',
      method: "post",
      dataType: 'json',
      data: {
        data: app.globalData.user.userId
      },
      success: function(res) {
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
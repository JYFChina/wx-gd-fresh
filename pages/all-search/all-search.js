// pages/all-search/all-search.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    prosList: [
      {
       
      }
    ]
      
     //商品信息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let atv = options.ativ;
    var that=this;
    that.onSearch(atv);
    
  },
  onSearch: function (event) {
    var ss = this;
    console.log(event.detail)
    var category = getApp().globalData.category
    wx.request({
      url: app.d.shopUrl + '/GDActicitesdetailService/queryGoods',
      data: {
        data:{
          activityId: atv,
          activityname:""
        }
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        console.log(res.data.data)
        ss.setData({
          'prosList': res.data.data,
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {

      },
    })
  }
  ,
  addCart:function(e){
    wx.request({
      url: app.d.orderUrl + '/ShoppingCartService/addCartGoods',
      method: "post",
      dataType: 'json',
      data: {
        data: {
          comdityId: e.currentTarget.id, //商品编号
          useraccount: app.globalData.openid, //用户唯一标识
          num: 1 //商品数量默认为1
        }
      },
      success: function (res) {
        if (res.data.data == "1") {
          wx.switchTab({
            url: '../my-shopping-cart/my-shopping-cart',
          })
        }

      },
      fail: function (res) {
        if (res.statusCode == "500") {
          this.addCart()
        }
      }
    })
  
  },
  buyGoods:function(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../order/pay',
    })
  }
})
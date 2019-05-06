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
    let data = options.data;
    var ss = this;
    var category = getApp().globalData.category
    wx.request({
      url: app.d.shopUrl + '/GdCommodityService/selheadlineAll',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data.data)
        ss.setData({
          'prosList': res.data.data,
        })
        
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {

      },
    })
    
  },
  onSearch: function() {
    wx.request({
      url: app.d.hostUrl + '/GdCommodityService/selheadlineAll',
      data: {
        // "商品的描述信息":'',
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
   
        ss.setData({
          
          prosLists: res.data.data,

        })

      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {

      },
    })
  }
  ,
  addCart:function(e){
    console.log(e.currentTarget.id)
    wx.switchTab({
      url: '../my-shopping-cart/my-shopping-cart',
    })
  },
  buyGoods:function(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../order/pay',
    })
  }
})
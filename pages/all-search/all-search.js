// pages/all-search/all-search.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    prosLists: [{
      
    }] //商品信息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let data = options.data;
    var ss = this;
    var category = getApp().globalData.category
    wx.request({
      url: 'http://zgw.nat300.top/GdCommodityService/selheadlineAll',
      data: '',
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
  },
  onSearch: function() {
    wx.request({
      url: 'http://zgw.nat300.top/GdCommodityService/selheadlineAll',
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
})
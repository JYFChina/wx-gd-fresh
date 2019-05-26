// pages/all-search/all-search.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    prosList: [
     
    ]
      
     //商品信息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //活动的id
    let atv = options.ativ;
    console.log("hhhhh"+atv)
    var that=this;
    that.onSearch(atv);
    
  },
  onSearch: function (event) {
    var ss = this; console.log(event.detail)
    var category = getApp().globalData.category
    wx.request({
      url: app.d.shopUrl + '/GDActicitesdetailService/queryGoods',
      data: {
        data:{
          activityId: event,
          activityname:""
        }
      },
      method: 'POST',
      dataType: 'json',
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
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    if (!value && this.data.productData.length == 0) {
      this.setData({
        hotKeyShow: true,
        historyKeyShow: true,
      });
    }
  },
  doSearch: function () {
    var searchKey = this.data.searchValue;
    console.log(searchKey)
    if (!searchKey) {
      this.setData({
        focus: true,
        hotKeyShow: true,
        historyKeyShow: true,
      });
      return;
    };

    this.setData({
      hotKeyShow: false,
      historyKeyShow: false,
    })

  },
  buyGoods:function(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../order/pay',
    })
  }
})
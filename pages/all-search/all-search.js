// pages/all-search/all-search.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderIs: false,
    prosList: [
     
    ]
      
     //商品信息

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //模糊查询的内容
    let text = options.text
    //分类的id
    let ftv = options.comditytypeId;
    console.log(ftv)
    //活动的id
    let atv = options.ativ;
    var that=this;
    if (text != "" && text!=null){
      that.setData({
        searchValue: text
      })
      that.doSearch();
    }
    if (ftv != null && atv != ''){
      that.fenlei(ftv);
    }
    if (atv != null && atv!=''){
      that.ative(atv);
    }
    
  
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
  ative: function (event){
    var ss = this;
    var category = getApp().globalData.category
    wx.request({
      url: app.d.shopUrl + '/GDActicitesdetailService/queryGoods',
      data: {
        data: {
          activityId: event,
          activityname: ""
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
      success: function (res) {
        if(res.data.data==1){
          wx.switchTab({
            url:"../my-shopping-cart/my-shopping-cart"
          })
          that.setData({
            "orderIs": true
          })
        }
       
      },
      fail: function (res) {

        if (res.statusCode == "500") {
          this.addCart(e)
        }
      }
    })
  
  },
  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
      prosList: []
    });
    if (!value && this.data.prosList.length == 0) {
      this.setData({
        hotKeyShow: true,
        historyKeyShow: true,       
      });
    }
  },
  doSearch: function () {
    var that =this;
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
    wx.request({
      url: app.d.shopUrl + '/GdCommodityService/QueryShopbyWh',
      data: {
        data: {
          comdityname: searchKey
        }
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          'prosList': res.data.data,
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {

      },
    })
    this.setData({
      hotKeyShow: false,
      historyKeyShow: false,
    })

  },
  buyGoods:function(e){  
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '../goodsaction/goodsaction?data=' + [id],
    })
  }
  ,fenlei:function(ftv){
    var that =this;
    wx.request({
      url: app.d.shopUrl + '/GdCommodityService/QueryShopbyWh',
      data: {
        data: {
          comditytypeId: ftv
        }
      },
      method: 'POST',
      dataType: 'json',
      success: function (res) {
        console.log("整搜索")
        console.log(res.data.data)
        that.setData({
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
})
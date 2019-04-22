var app = getApp();

Page({

  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3', 'demo-text-4'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    prosList: [{
      prosLists: [{
        comdityname: "test1",
        comdityprice: "15.1",
        comdityId: "1"
      }, {
        comdityname: "test2",
        comdityprice: "15.2",
        comdityId: "2"
      }, {
        comdityname: "test3",
        comdityprice: "15.3",
        comdityId: "3"
      }, {
        comdityname: "test4",
        comdityprice: "15.4",
        comdityId: "4"
      }],
      title: "热卖商品"
    }]
  },
  onLoad: function() {
    var ss = this;
    wx.request({
      url: 'https://edee2d67.ngrok.io/GdCommodityService/selheadlineAll',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        var prosLists = "prosList[" + 0 + "].prosLists";
        var title = "prosList[" + 0 + "].title";
          ss.setData({
            [prosLists]: res.data.data,
            [title]:"促销"
          })
    

        console.log("修改结果")
        console.log(res.data.data.length)
        console.log("返回结果")
        console.log(res.data.data);
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
  go: function(e) {
    var id = e.currentTarget.id;
    console.log(id)
    app.globalData.category = "123";
    wx.switchTab({
      url: '../all-search/all-search'
    })
  },
  swiperTap: function(e) {
    var id = e.currentTarget.id;

    wx.navigateTo({
      url: '../goodsaction/goodsaction?data=' + [id],
    })

  }

})
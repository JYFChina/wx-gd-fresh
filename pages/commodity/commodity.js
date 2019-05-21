var app = getApp();

Page({

  data: {
    background: ['https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg', 'https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg', 'https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg', 'https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg'], //Baner图
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    atitle: [],
    list: [],

  },
  onLoad: function() {

    var ss = this;
    ss.bindActivities();
    ss.bindGoods();
    // wx.request({
    //   url: '',
    // })
  },
  bindGoods: function() {
    var ss = this;
    wx.request({
      // url: app.d.shopUrl+'/GdCommodityService/selheadlineAll',
      url: app.d.shopUrl + '/GDActicitesdetailService/queryGoods',
      data:{
        data:{
          activityId: '',
          activityname:''
        }
      },
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        console.log(res.data)
        ss.setData({
          list: res.data.data
        })

      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {

      },
    })
  },
  bindActivities: function() {
      var ss = this;
      wx.request({
        url: app.d.shopUrl + '/GDActicitesdetailService/queryActivities',
        data: '',
        header: {},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function(res) {
          console.log(res.data)
          ss.setData({
            atitle: res.data.data
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
    wx.navigateTo({
      url: '../all-search/all-search?ativ=' + [id]
    })
  },
  swiperTap: function(e) {
    var id = e.currentTarget.id;

    wx.navigateTo({
      url: '../goodsaction/goodsaction?data=' + [id],
    })

  }

})
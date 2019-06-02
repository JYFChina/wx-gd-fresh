var app = getApp();

Page({

  data: {
    background: [{
      imagesurl: 'https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg',
      activityId: 1
    }, {
      imagesurl: 'https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg',
      activityId: 2
    }, {
      imagesurl: 'https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg',
      activityId: 3
    }], //Baner图
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
    value: "asd"

  },
  onLoad: function() {

    var ss = this;
    ss.bindActivities();
  },
  bindGoods: function() {


  },
  searchValueInput: function(e) {
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
  doSearch: function() {
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
    wx.navigateTo({
      url: '../all-search/all-search?text=' + [searchKey],
    })
    this.setData({
      hotKeyShow: false,
      historyKeyShow: false,
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
          console.log(res.data.data)
          var arrimages = [];
          for (var i = 0; i < 3; i++) {
            arrimages.push(res.data.data[i])
          }
          ss.setData({
            atitle: res.data.data
            // background: arrimages
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
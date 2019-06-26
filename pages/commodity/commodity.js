var app = getApp();

Page({

  data: {
    background: [{
      imagesurl: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1559620671&di=3ac78c0faa2a946dfe00f835f7c5b80f&src=http://img.zcool.cn/community/01720b59acbdcba801211d259f4c1c.jpg@1280w_1l_2o_100sh.jpg',
      activityId: 1
    }, {
        imagesurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1560226017&di=31e5b8e0fb744cdc36efbf272be1b79b&imgtype=jpg&er=1&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fd36c7a256d6c79a285c652a1be50129609741727dd4d-3jX6QY_fw658',
      activityId: 2
    }, {
        imagesurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559631339043&di=c33f69d5d1433198a4541098d7d60f89&imgtype=0&src=http%3A%2F%2Fp3.so.qhmsg.com%2Ft01270d3bfbbe1e060d.jpg',
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
    value: "asd",
    warning: ""
  },
  onLoad: function() {

    var ss = this;
    ss.setData({
      warning: app.globalData.peison
    })
    
    ss.bindActivities();
  },
  bindGoods: function() {


  },
  searchValueInput: function(e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    if (!value ) {
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
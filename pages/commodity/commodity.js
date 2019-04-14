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
    nextMargin: 0
  },
  onChange(event) {
    if (event.detail == 0) {
      console.log("主页面")
      wx.navigateTo({
        url: './test',
      })
      
    }
    if (event.detail == 1) {
      console.log("搜索")
    }
    if (event.detail == 2) {
      console.log("购物车")
    }
    if (event.detail == 3) {
      console.log("我的")
    }
    console.log(event.detail);
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
  go: function() {
    wx.redirectTo({
      url: '../goodsaction/goodsaction',
    })
  }

})
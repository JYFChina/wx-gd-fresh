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
        proName: "test1",
        price:"15.1"
      }, {
        proName: "test2",
          price: "15.2"
      }, {
        proName: "test3",
          price: "15.3"
      }, {
        proName: "test4",
          price: "15.4"
      }],
      title: "标题名1"
    }, {
        prosLists: [{
          proName: "test1",
          price: "15.1"
        }, {
          proName: "test2",
          price: "15.2"
        }, {
          proName: "test3",
          price: "15.3"
        }, {
          proName: "test4",
          price: "15.4"
        }],
      title: "标题名2"
    }]
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
    let a = 1;
    let b = 2;
    wx.navigateTo({
      url: '../goodsaction/goodsaction?data=' + [a],
    })

  }

})
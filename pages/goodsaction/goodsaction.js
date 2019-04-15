Page({
  data: {

    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],//Baner图
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    detail: {
      proName: "测试数据",
      miaoshu:"66666666"
    }//商品描述
    
  },
  onLoad(options){
    let data = options.data;
    console.log(data);//得到的结果是  1,2  是一个字符串
  }
  ,
  onShow() {
   
  // 页面加载是更新成你所选中的商品
    this.setData({
      "detail.price": 12.5,
      "detail.miaoshu":"十四寸高清液晶钛合金不锈钢螃蟹",
      "detail.bianhao":"XY0001",
      "detail.proName":"阳澄湖大闸蟹",
      "detail.danjia":"12.5",
      "detail.image": ["image1", "image2", "image3"]
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
  onClickRight: function() {
    wx.showToast({
      title: '其他',
      icon: 'succes',
      duration: 1000,
      mask: true
    })

  },
  onClickLeft: function() {
    wx.navigateTo({
      url: '../commodity/commodity',
    })
  }
})
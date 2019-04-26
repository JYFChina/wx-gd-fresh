Page({
  data: {

    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'], //Baner图
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
      miaoshu: "66666666"
    } //商品描述

  },
  onLoad(options) {
    let data = options.data;
    console.log(data); //得到的结果是  1,2  是一个字符串

    var that = this;

    wx.request({
      url: 'http://zgw.nat300.top/GdCommodityService/selOne?comdityId=' + data,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          background: [res.data.data.imagesurl, res.data.data.imagesurl, res.data.data.imagesurl]
        }) 
        // 页面加载是更新成你所选中的商品
        that.setData({
          "detail.price": res.data.data.comdityprice,
          "detail.miaoshu": res.data.data.comditydescribe,
          "detail.bianhao": res.data.data.comdityId,
          "detail.proName": res.data.data.comdityname,
          "detail.danjia": res.data.data.comditydescribe,
          "detail.image": [res.data.data.imagesurl, res.data.data.imagesurl, res.data.data.imagesurl]

        })

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
  onShow() {


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
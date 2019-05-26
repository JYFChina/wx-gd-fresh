var app = getApp();
// pages/order/detail.js
Page({
  data:{
    orderId:0,
    orderData:{},
    proData:[],
    ordx:[]
  },
  onLoad:function(options){
    this.setData({
      orderId: options.orderId,
    })
    this.loadProductDetail();
  },
  loadProductDetail:function(){
    var that = this;
    wx.request({
      url: app.d.orderUrl + '/GDOrderShopService/selOrderShopByIdTWO',
      method:'post',
      data: {
        data: that.data.orderId,
      },
      success: function (res) {
        var pro =[];  
        var status = 1;
        if(status==1){
          for (var i = 0; i < res.data.data.comList.length;i++){
            
            for (var j = 0; j < res.data.data.ordList.length;j++){
              if (res.data.data.comList[i].comdityId == res.data.data.ordList[j].comdityId){
                res.data.data.comList[i].comdnum = res.data.data.ordList[j].num
              }
            }
           
            pro.push(res.data.data.comList[i])
          }
         
          var ord = res.data.data.ordList;
          that.setData({
            orderData: ord,
            proData:pro,
            ordx: res.data.data.ordx
          });
          console.log(that.data.ordx)
        }else{
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function () {
          // fail
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
      }
    });
  },

})
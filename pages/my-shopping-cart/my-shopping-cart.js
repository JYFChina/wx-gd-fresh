var app = getApp();
// pages/cart/cart.js
Page({
  data: {
    page: 1,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    total: 0,
    carts: []
  },

  bindMinus: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var num = that.data.carts[index].data.num;
    // 如果只有1件了，就不允许再减了
    if (num > 1) {
      num--;
    }
    var cardId = e.currentTarget.dataset.cartid;
    var augment = 'carts[' + index + '].data.num';
    that.setData({
      [augment]: num
    })
    wx.request({
      url: app.d.orderUrl + '/ShoppingCartService/updCartGoods',
      method: 'post',
      data: {
        data: {
          num: num,//商品数量
          cartid: cardId,
          comdityId: e.currentTarget.id, //商品编号
          useraccount: app.globalData.openid //用户唯一标识
          } 
      },
      success: function(res) {
        var status = res.data.code;
        if (status == 0) {
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.carts;
          carts[index].num = num;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          });
          that.sum();
        } else {
          wx.showToast({
            title: '操作失败！',
            duration: 2000
          });
        }
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
    that.sum();
  },

  bindPlus: function(e) {

    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(e)
    var num = that.data.carts[index].data.num;
    // 自增
    num++;
    var minus = 'carts[' + index + '].data.num';
    that.setData({
      [minus]: num
    })
    var cardId = e.currentTarget.dataset.cartid;
    console.log("购物车"+cardId)
    wx.request({
      url: app.d.orderUrl + '/ShoppingCartService/updCartGoods',
      method: 'post',
      data: {
        data: {
          num: num,//商品数量
          "cartid": cardId,
          comdityId: e.currentTarget.id, //商品编号
          useraccount: app.globalData.openid //用户唯一标识
          }
        
      },
     
      success: function (res) {
        var status = res.data.code;
        if (status == 0) {
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = num <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.carts;
          carts[index].num = num;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          });
          that.sum();
        } else {
          wx.showToast({
            title: '操作失败！',
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

    that.sum();
  },

  bindCheckbox: function(e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/
    //拿到下标值，以在carts作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var selected = this.data.carts[index].selected;
    var carts = this.data.carts;
    // 对勾选状态取反
    carts[index].selected = !selected;
    // 写回经点击修改后的数组
    this.setData({
      carts: carts
    });
    this.sum()
  },

  bindSelectAll: function() {
    // 环境中目前已选状态
    var selectedAllStatus = this.data.selectedAllStatus;
    // 取反操作
    selectedAllStatus = !selectedAllStatus;
    // 购物车数据，关键是处理selected值
    var carts = this.data.carts;
    // 遍历
    for (var i = 0; i < carts.length; i++) {
      carts[i].selected = selectedAllStatus;
    }
    this.setData({
      selectedAllStatus: selectedAllStatus,
      carts: carts
    });
    this.sum()
  },

  bindCheckout: function() {
    // 初始化toastStr字符串
    var toastStr = '';
    // 遍历取出已勾选的cid
    for (var i = 0; i < this.data.carts.length; i++) {
      if (this.data.carts[i].selected) {
        toastStr += this.data.carts[i].data.comdityId;
        toastStr += ',';
      }
    }
    if (toastStr == '') {
      wx.showToast({
        title: '请选择要结算的商品！',
        duration: 2000
      });
      return false;
    }
    //存回data
    wx.navigateTo({
      url: '../order/pay?cartId=' + toastStr,
    })
  },

  bindToastChange: function() {
    this.setData({
      toastHidden: true
    });
  },

  sum: function() {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].data.num * carts[i].data.comdityprice;
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
      total: '¥ ' + total
    });
  },

  onLoad: function(options) {
    this.loadProductData();
    this.sum();
  },

  onShow: function() {
  this.loadProductData();
  },

  removeShopCard: function(e) {

  },

  // 数据案例
  loadProductData: function() {
    var that = this;
    wx.request({
      url: app.d.orderUrl + '/OrderService/selGwcByShopId',
      method: 'post',
      data: app.globalData.openid,
      success: function(res) {
        that.setData({
          "carts": res.data.data 
        })
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });

  },
  removeShopCard: function(e) {
    var that = this;
    var cardId = e.currentTarget.dataset.cartid;
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm && wx.request({
          url: app.d.orderUrl + '/ShoppingCartService/delCartGoods',
          method: 'post',
          data: {
            data: cardId
          },
          success: function(res) {
            //--init data
            var data = res.data;
            console.log(data.code)
            if (data.code == 0) {
              //that.data.productData.length =0;
              that.loadProductData();
              wx.showToast({
                title: '操作成功！',
                duration: 2000
              });
            } else {
              that.loadProductData();
              wx.showToast({
                title: '操作失败！',
                duration: 2000
              });
            }
          },
        });
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },
  swiperTap: function(e) {
    var id = e.currentTarget.id;

    wx.navigateTo({
      url: '../goodsaction/goodsaction?data=' + [id],
    })

  }
})
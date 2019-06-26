// import ApiList from  '../../config/api';
// import request from '../../utils/request.js';
//分类页面
//获取应用实例  
var app = getApp();
Page({
  data: {
    // types: null,
    typeTree: {}, // 数据缓存
    currType: 0,
    // 当前类型
    types: [],
    typeTree: [], //树数据
    value: "asda"
  },
  //获取输入查询内容
  searchValueInput: function(e) {
    var that = this;
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    if (!value) { //&& that.data.productData.length == 0
      that.setData({
        hotKeyShow: true,
        historyKeyShow: true,
      });
    }
  },
  //商品搜索
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
  //页面加载
  onLoad: function(option) {
    var that = this;
    wx.request({
      url: app.d.shopUrl + '/GdComditytypeService/selTypeAll',
      method: 'GET',
      data: {},
      success: function(res) {
        that.setData({
          types: res.data.data
        })
        console.log(that.data.types)

      },
      error: function(e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      },

    });
  },
  //加载菜单
  tapType: function(e) {
    var that = this;
    const currType = e.currentTarget.dataset.typeId;

    that.setData({
      currType: currType
    });
    that.setData({
      typeTree: that.data.types
    })
  },
  // 加载品牌、二级类目数据
  getTypeTree(currType) {
    const me = this,
      _data = me.data;
    if (!_data.typeTree[currType]) {
      request({
        url: ApiList.goodsTypeTree,
        data: {
          typeId: +currType
        },
        success: function(res) {
          _data.typeTree[currType] = res.data.data;
          me.setData({
            typeTree: _data.typeTree
          });
        }
      });
    }
  }
})
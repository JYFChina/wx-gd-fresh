// import ApiList from  '../../config/api';
// import request from '../../utils/request.js';
//获取应用实例  
var app = getApp();
Page({
  data: {
    // types: null,
    typeTree: {}, // 数据缓存
    currType: 0,
    // 当前类型
    types: [],
    typeTree: [{
      id: "1",
      name: "蔬菜时蔬",
      bz_1: "https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg"
    }, {
      id: "2",
      name: "海鲜",
      bz_1: "https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg"
    }, {
      id: "3",
      name: "饮品",
      bz_1: "https://zgwjava.oss-cn-beijing.aliyuncs.com/images/1550977508946.jpg"
    }],
  },

  onLoad: function(option) {
    var that = this;
    wx.request({
      url: app.d.shopUrl + '/GdComditytypeService/selTypeAll',
      method: 'GET',
      data: {},

      success: function(res) {
        console.log(res.data.data)
        var length = res.data.data.length
        for (let i = 0; i < length; i++) {
          var parent = res.data.data[i].parent
          if (parent==0){
            var one=res.data.data[i]
            console.log(one)
            that.setData({
              types: [one]
            })
            console.log(parent)
          }
        }
        console.log(that.data.types)
        //--init data 
        // var status = res.data.status;
        // if (status == 1) {
        //   var list = res.data.list;
        //   var catList = res.data.catList;
        //   that.setData({
        //     types: list,
        //     typeTree: catList,
        //   });
        // } else {
        //   wx.showToast({
        //     title: res.data.err,
        //     duration: 2000,
        //   });
        // }
        // that.setData({
        //   currType: 2
        // });
        // console.log(list)

      },
      error: function(e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000,
        });
      },

    });
  },



  tapType: function(e) {
    var that = this;
    const currType = e.currentTarget.dataset.typeId;

    that.setData({
      currType: currType
    });
    console.log(currType);
    // wx.request({
    //   url: app.d.ceshiUrl + '/Api/Category/getcat',
    //   method: 'post',
    //   data: { cat_id: currType },
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     var status = res.data.status;
    //     if (status == 1) {
    //       var catList = res.data.catList;
    //       that.setData({
    //         typeTree: catList,
    //       });
    //     } else {
    //       wx.showToast({
    //         title: res.data.err,
    //         duration: 2000,
    //       });
    //     }
    //   },
    //   error: function (e) {
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 2000,
    //     });
    //   }
    // });
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
var app = getApp();
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  data: {
    userOpenid: "",
    userInfo: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scope:"3000"//配送范围
    
  },
  onLoad: function() {
    var that = this;
    qqmapsdk = new QQMapWX({
      key: '7GBBZ-YVCKU-WMBVC-4BG37-BEM73-EIBKF' //这里自己的key秘钥进行填充
    });
    that.getLocation();
    that.storeAddress();
    // 查看是否授权
    that.addUser();
  },
  //获取用户信息接口
  queryUsreInfo: function() {

    var that = this;
    wx.request({
      url: app.d.userUrl + "/GdWxUserService/wxselUser",
      data: {
        data: app.globalData.openid
      },
      method: "POST",
      success: function(res) {
        app.globalData.user = res.data.data;
      }
    })
  },
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var start = latitude + "," + longitude
        var accuracy = res.accuracy;
        vm.setData({
          "froms": start
        })
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  addUser: function() {
    var that = this;
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              var id = app.globalData.user.userId;
              //用户已经授权过 
              if (app.globalData.openid) {
                setTimeout(function() {
                  wx.reLaunch({
                    url: '../commodity/commodity'
                  })
                }, 3000)
              }

            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      console.log(e.detail.userInfo)
      that.setData({
        userInfo: e.detail.userInfo
      })
      app.globalData.userInfo = e.detail.userInfo;
      // 插入登录的用户的相关信息到数据库
      wx.request({
        url: app.d.userUrl + "/GdWxUserService/wxsaveUser",
        data: {
          data: {
            useraccount: app.globalData.openid, //微信用户唯一标识
            username: e.detail.userInfo.nickName //微信用户名            
          }
        },
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          //从数据库获取用户信息
          console.log("小程序用户首次登陆注册成功！");
          that.queryUsreInfo();
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../commodity/commodity'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  registeredUser: function() {
    var that = this;

    if (that.data.userInfo) {

      // 插入登录的用户的相关信息到数据库
      wx.request({
        url: app.d.userUrl + "/GdWxUserService/wxsaveUser",
        data: {
          data: {
            useraccount: app.globalData.openid, //微信用户唯一标识
            username: that.data.userInfo.nickName //微信用户名            
          }
        },
        method: "POST",
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          //从数据库获取用户信息
          console.log("小程序用户首次登陆注册成功！");
          that.queryUsreInfo();
        }
      });


    }
  },
  storeAddress: function() {
    var that = this;
    wx.request({
      url: app.d.storUrl + "/manageService/QueryAll",
      data: {
        data: ""
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        that.setData({
          "tempData": res.data.data
        })
        var lal = "";

        for (var i = 0; i < res.data.data.length; i++) {
          lal += res.data.data[i].lal + ","
        }
        var reg = /,$/gi;
        lal = lal.replace(reg, "");
        console.log(lal)
        that.formSubmit(lal)
      }
    });
  },
  formSubmit(lal) {
    var _this = this;

    qqmapsdk.calculateDistance({

      mode: 'driving', //可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
      //from参数不填默认当前地址
      //获取表单提交的经纬度并设置from和to参数（示例为string格式）
      from: _this.data.froms || '', //若起点有数据则采用起点坐标，若为空默认当前地址
      to: lal, //终点坐标
      success: function(res) { //成功后的回调

  
        var res = res.result;
        var dis = [];
        var dur = [];
        for (var i = 0; i < res.elements.length; i++) {
          dis.push(res.elements[i].distance); //将返回数据存入dis数组，
          dur.push(res.elements[i].duration);
        }
        _this.setData({ //设置并更新distance数据
          distance: dis,
          duration: dur
        });
        var i = 1
        var m = 0;
        var temp;
        for (var i = 0; i < res.elements.length - 1; i++) { //每轮执行交换后就有一位相对较小数往前进一位,比如1，每次交换后都会向前进一位，所以称为冒泡  交换9（length-1）次后结束。

          //执行一轮交换
          for (var j = 0; j < res.elements.length - 1 - i; j++) { //到数组的倒数第二位交换完了，就不用在做最后一位的检验交换（i<numbers.length-1）。
            if (res.elements[j].distance > res.elements[j + 1].distance) { //如果当前位比下一位大，则交换。
              temp = res.elements[i].distance;
              res.elements[i].distance = res.elements[i + 1].distance;
              res.elements[i + 1].distance = temp;
            }
          }
        }
        var text;
        // console.log(res.result)
        for (var i = 0; i < res.elements.length; i++) {
          if (res.elements[i].distance == temp) {
            
            text = res.elements[i].to.lat + "," + res.elements[i].to.lng
           
          }
        }
        
        for (var a = 0; a < _this.data.tempData.length;a++){
          if (text == _this.data.tempData[a].lal) {
            app.globalData.storeid = _this.data.tempData[a].storeid
            app.globalData.storename = _this.data.tempData[a].storename

          }
        }
       
       if(temp>_this.data.scope){
       
         app.globalData.peison = "最近店铺【" + app.globalData.storename+"】友情提醒：不再配送范围值内，如果需要购买商品,请自行上门提货。"
       }else{
         app.globalData.peison = ""
       }
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  }
})
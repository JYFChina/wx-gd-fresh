//index.js

Page({
  data: {
    code: '验证码输入结果',
    membersdetail:{
      vipId:"12621qweassda",
      userId:"123123231",
      createTime:"2013-1-1",
      userphone:"13937900893",
      vipintegral:"111",
      vipbalance:"0"
    }
  },
  onLoad: function() {
    //选择组件对象
    this.verifycode = this.selectComponent("#verifycode");
  },
  openVerifyCodeView: function() {
    //弹出组件,此处必须把this重新赋予变量不然callback内部会提示找不到this
    var _this = this;
    _this.verifycode.showView({
      phone: "15200000000",
      inputSuccess: function(phoneCode) {
        //调用组件关闭方法
        _this.verifycode.closeView();
        //设置数据
        _this.setData({
          code: phoneCode
        });
      }
    });
  },
  onmembersdetail: function() {
    var that =this;
    wx.request({
      url: '',
      method:"POST",
      data:{
        data :{

        }
      },
      success:function(res){
        that.setData({

        })
      }
    })
  }
})
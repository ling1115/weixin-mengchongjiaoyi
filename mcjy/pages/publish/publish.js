// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '点击选择地址，要勾选哦~'
  },
  staticObj:{
    type: 'sell'
  },
  // 点击选择地址
  chooseAdd(){
    wx.chooseLocation({
      success: this.getAddress.bind(this)
    })
  },
  getAddress(res){
    this.setData({
      address: res.address
    })
    // 保存发布信息在staticObj
    Object.assign(this.staticObj,{
      address: res.address,
      longitude: res.longitude,
      latitude: res.latitude
    })
    console.log(this.staticObj)
  },
  // radio-group绑定的事件：radioChange() 获取表单控件内容,改变staticObj保存的类型
  radioChange(e){
    this.staticObj.type = e.detail.value
  },
  // 保存说明框中信息
  getMessage(e){
    this.staticObj.message = e.detail.value
  },
  // 保存联系方式
  getContact(e){
    this.staticObj.contact = e.detail.value
  },
  // 点击提交
  publish(){
    if (this.data.address === '点击选择地址，要勾选哦~' || !this.data.address){
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
        duration: 2000
      })
    }else if( !this.staticObj.message ){
      wx.showToast({
        title: '请填写说明',
        icon: 'none',
        duration: 2000
      })
    }else if( !this.staticObj.contact ){
      wx.showToast({
        title: '请填写联系方式',
        icon: 'none',
        duration: 2000
      })
    }else{
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 2000,
        success: this.saveData.bind(this)
      })
    }
  },
  // 提交 将staticObj保存在本地data.json
  saveData(res){
    wx.request({
      url: 'http://localhost:3000/list',
      data: this.staticObj,
      header: { 'Content-type': 'application/json' },
      method: 'POST'
    })
  },
  // backTo(res){
  //   wx.navigateBack({
  //     delta: 1,
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
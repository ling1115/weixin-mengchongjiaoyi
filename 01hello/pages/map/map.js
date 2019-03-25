// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    length: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(e) {
    this.setData({
      length: e.detail.value.length
    })
  },
  /* 输入点击回到顶部  */
  goTop(){
    this.setData({
      scrollTop: 0
    })
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
    console.log("下拉刷新触发了")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉加载触发了")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  staticObj:{
    keyword:''
  },
  // 搜索框变化都会请求数据
  change(e){
    this.getData(e.detail.value)
  },
  // 点击搜索 请求数据
  search(e){
    this.staticObj.keyword = e.detail.value
    this.getData(this.staticObj.keyword)
  },
  // 点击 列表跳转到详情页
  goDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id
    })
  },
  getData(keyword){
    wx.request({
      url: 'http://localhost:3000/list?q=' + keyword,
      header: { 'Content-type': 'application/json' },
      method: 'GET',
      success: (res) => {
        this.setData({
          list: res.data
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
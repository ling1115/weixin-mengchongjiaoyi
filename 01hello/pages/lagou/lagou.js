// pages/lagou/lagou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobs:[],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData(){
    wx.request({
      url: 'https://m.lagou.com/listmore.json',
      data: {
        "pageNo":this.data.page,
        "pageSize":15
      },
      header: {"Content-type":"application/json"},
      method: 'GET',
      success: (res)=>{
        console.log(res.data.content.data.page.result)
        var jobs = this.data.jobs.concat(res.data.content.data.page.result)
        this.setData({
          jobs
        })
      }
    })
  },
  onLoad: function (options) {
    this.getData()
  },
  getMore(){
    this.data.page++;
    this.getData()
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
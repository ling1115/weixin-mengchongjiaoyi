var app = getApp() // 获取全局

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // map中的controls 图标不随地图变化而移动
    controls: [
      {
        id: 1,
        iconPath: '/resources/pin.png',
        position: {
          left: (app.globalData.windowWidth/2)-10,
          top: (app.globalData.windowHeight / 2) -45,
          width: 20,
          height: 25
        }
      },
      {
        id: 1,
        iconPath: '/resources/center.png',
        position: {
          left: 20,
          top: (app.globalData.windowHeight / 2)+150,
          width: 30,
          height: 30
        },
         clickable: true
      },
    ],
    markers:[]
  },
  // 回到中心
  controltap() {
    this.mapCtx.moveToLocation();
  },
  // 跳转到发布页面
  goPublish(){
    wx.navigateTo({
      url: '/pages/publish/publish'
    })
  },
  // 获取全部数据，并赋值给map中的markers属性
  getAllData(){
    wx.request({
      url: 'http://localhost:3000/list',
      data: '',
      header: {'Content-type':'application/json'},
      method: 'GET',
      success: (res)=>{
        let markers = res.data.map(item=>{
          return {
            iconPath:'/resources/'+item.type+'.png',
            id:item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            width:30,
            height:30
          }
        })
        this.setData({markers})
      }
    })
  },
  // 点击图标跳转详情页
  markertap(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.markerId
    })
  },
  // 点击搜索跳转搜索页面
  goSearch(){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getLocation({
      type: '',
      altitude: true,
      success: (res)=>{
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })
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
    return {
      title: '萌宠交易平台',
      path: '/pages/index/index'
    }
  }
})
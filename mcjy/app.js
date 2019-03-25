//app.js
App({
  onLaunch: function () {
    var deviceInfo = wx.getStorageSync('deviceInfo')
    if( !deviceInfo ){
      var info = wx.getSystemInfoSync();
      this.globalData.windowWidth = info.windowWidth // 获取窗口宽度
      this.globalData.windowHeight = info.windowHeight // 获取窗口高度
      wx.setStorageSync('deviceInfo',{
        windowWidth: info.windowWidth,
        windowHeight: info.windowHeight
      })
    }else{
      this.globalData.windowWidth = deviceInfo.windowWidth;
      this.globalData.windowHeight = deviceInfo.windowHeight;
    }
    
  },
  globalData: {
    
  }
})
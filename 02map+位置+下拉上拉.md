小程序
1. 教程
    1. 微信访问接口都是https协议的。在开发阶段可以选择不校验域名，就可以使用http协议的数据，也可以访问不在安全域名列表中的数据
    2. 创建第一个小程序：
        打开微信web开发者工具，小程序名字 保存路径(需要创建一个空文件目录)  AppID   开发模式为小程序  不适应云服务  新建
        3. 预览菜单 => 扫描二维码，进行真机测试，可以打开调试和性能监控面板
        4. 上传 代码 开通git管理 
        5. 详情 => 项目信息 可以勾选上不校验合法域名等
    3. 代码构成
        1. .json文件：存配置信息
            全局配置：app.json , 所有页面路径、界面表现、网络超时时间、底部 tab
            工具配置：project.config.json
            页面配置：index.json , 当当前页面配置与全局页面配置冲突时，执行当前页面配置
                    如：在index.json中添加：'navigationBarTitleText':'首页'
                    则页面头部title会显示 首页

        2. .wxml文件：结构
            语法要求严格，
        3. .wxss文件：样式
            全局样式：app.wxss 
            页面样式：index.wxss , 当当前页面样式与全局页面样式冲突时，执行当前页面样式
            新增了尺寸单位：rpx , 不需要换算像素比dpr
            导入样式：@import 'a.wxss';
        4. .js文件：逻辑
    4. 小程序能力
        1. 小程序的启动
            1. app.json: 'pages'中的配置，哪里路径页面在"pages"数组的第一个，哪个就是首页
            2. app.js: onLaunch()钩子函数,小程序启动之后 触发
        2. 小程序和页面：page/文件夹中的所有页面中的.js文件
                    Page({
                        data: { // 参与页面渲染的数据
                            logs: []
                        },
                        onLoad() {
                            // 页面渲染后 执行
                        }
                    })
            Page是一个页面构造器，这个构造器就生成了一个页面。在生成页面的时候，小程序框架会把 data 数据和 index.wxml 一起渲染出最终的结构
        3. map组件：<map longitude="广州经度" latitude="广州纬度"></map>
            新增一页：page/右键 => 新建目录 页面名字 => 新建Page  文件名字 如 page
                在page.wxml中：<map longitude="广州经度" latitude="广州纬度"></map>
                将通过getLocation获取到的经纬度数值复制到这，就可以获得对应位置的地图
        4. API:  在app.js中的onLaunch()中添加：
            1. wx.getLocation: 要获取用户的地理位置
                wx.getLocation({
                    type: 'wgs84',
                    success: (res) => {
                        const latitude = res.latitude // 纬度
                        const longitude = res.longitude // 经度
                        console.log(latitude)
                        console.log(longitude)
                    }
                })
                此外还有在app.json中添加promission才可以
                    {
                        ... ,
                        "pages": ["pages/index/index"],
                        "permission": {
                            "scope.userLocation": {
                            "desc": "你的位置信息将用于小程序位置接口的效果展示"
                            }
                        }
                    }
        5. 体验小程序：微信扫描二维码可以看到许多体验功能

2. 框架
    1. app.json：添加tabBar，并且添加icon图标
        "tabBar": {
            "list": [
                {
                    "pagePath": "pages/index/index",
                    "text": "首页"
                },
                {
                    "pagePath": "pages/logs/logs",
                    "text": "日志"
                }
            ]
        },
    2. map.json: 每一页都设置不同的title, 如map中的map.json
        {
            "usingComponents": {},
            "navigationBarTitleText": "Setting"
        }
    3. app.json中打开下拉刷新，下拉加载，在app.json中配置是全局配置,也可以在页面中的.json中配置
        "window":{
            ...,
            enablePullDownRefresh: true, // 下拉刷新
            onReachBottomDistance: 50  // 页面上拉触底事件触发时距页面底部距离，单位为px
        }
        对应的钩子函数：
            /** 页面相关事件处理函数--监听用户下拉动作 */
            onPullDownRefresh: function () {
                console.log("下拉刷新触发了")
            },

            /** 页面上拉触底事件的处理函数 */
            onReachBottom: function () {
                console.log("上拉加载触发了")
            },

###组件
1. navigator: 导航, 属性： url
    <navigator url='pages/setting/setting'>setting</navigator>

2. image: 图片 属性: src
    <view>
        <image src='/img/home.png'></image>
    </view>

3. video: 视频，有弹幕功能
    bind+事件：绑定的事件处理函数不能加括号()

4. camera: 相机
5. canvas: 画布
6. echarts: 做数据可视化工具

###API
1. wx.request(): 发送请求，这里没有同源策略的概念，访问的协议必须是https协议，需要添加到安全域名列表
    在onLoad()中发送请求
    onLoad: function(){
        wx.request({
            url: "",
            header: { "content-type":"application/json"},
        })
    }

2. json-server: mock数据的工具：
    全局安装：npm i -g json-server
    运行：json-server data.json
    即可在http://localhost:3000中访问到data.json数据
    但是只通过json-server将数据变成本地可访问，所取得的数据不能在真机当中获取显示出来。
    所以可以先将网上拷贝数据到data.json文件夹中(这些数据是没有经过出来的，有些数据并不需要)
    然后用json-server 将数据变成可访问
    将在http://localhost:3000访问到的数据拷贝到easy-mock当中(在这当中可以处理数据，拷贝我们需要的数据)
    再request中访问mock的链接url，真机就可以访问到数据了
    注意：success:function(){}这里的this指向并不能访问到setData，所以需要修改this指向，可以使用箭头函数

3. todoList: 手机确认键: bindconfirm
    1. js:
        Page({
            onLoad:function(){
                this.setData({
                    count: this.getCount()
                })
            }
            ...,
            data:{
                list: [
                    {
                        id:1,
                        "text":"aaa",
                        flag: "true"
                    },
                    {
                        id:2,
                        "text":"ddd",
                        flag: "false"
                    },
                    {
                        id:3,
                        "text":"eee",
                        flag: "false"
                    }
                ]
            },
            handleInput(e){
                this.setData({
                    str:e.detail.value
                })
            },
            add(){
                this.data.list.pust({
                    "text":this.data.str,
                    flag:"false"
                })
                this.setData({
                    list:this.data.list,
                    str:''
                })
            },
            // 统计完成的数量
            getCount(){
                return this.data.list.filter(item=>item.flag).length
            },
            // 当checked值改变是触发
            checkboxChange(e){
                // 获取参数
                var index = e.target.dataset.index
                this.data.list[index].flag = !this.data.list[index].flag
                this.setData({
                    list: this.data.list,
                    count: this.getCount()
                })
            }
        })
    2. wxml: 使用checkbox组件
        <input bindinput='handleInput' bindconfirm='add' class='text' value='str'/>
        <view wx:for="{{list}}" class="row">
            <checkbox-group bindchange="checkboxChange" data-index='{{index}}'>
                <checkbox value="{{item.flag}}" checked="{{item.flag}}" />
                
            </checkbox-group>
            {{item.text}}
        </view>
    3. wxss:
        .row{
            display: flex;
        }
        .text{
            border:1px solid #ccc;
        }


    4. 删除功能：
        {{item.text}}
        <button size="mini" bindtap='remove' data-index="{{index}}">删除</button>

        ...
        remove(e){
            var index = e.taerget.dataset.index
            this.data.list.splice(index,1)
            this.setData({
                list: this.data.list,
                count: this.getCount()
            })
        }

data-index为自定义属性，为了传递参数 index

https://m.lagou.com
https://www.easy-mock.com
https://www.maizuo.com

获取参数：e.target.dataset.参数名
获取表单控件value:e.detail.value

###拉勾网
1. 请求数据
    data(){
        jobs: []
    },
    onLoad:function(){
        wx.request({
            url:'',
            data:{
                "pageNo":this.data.page,
                "pageSize":15
            },
            header:{"Content-type":"application/json"},
            success:(res)=>{
                this.setData({
                    jobs: res.data.content.data.page.result
                })
            }
        })
    }
2. 视图层 wxml
    <view>
        <image src="{{'https://www.lgstatic.com/'+item.companyLogo}}" />
        {{item.companyName}}
    </view>
    <button bindtap='getMore'>加载更多</button>
3. 获取更多数据,所以可以将开始请求数据的接口另外作为一个函数区调用
    data:{
        jobs:[],
        page:1
    }
    getData(){
        wx.request({
            url:'',
            data:{
                "pageNo":this.data.page,
                "pageSize":15
            },
            header:{"Content-type":"application/json"},
            method:'GET',
            success:(res)=>{
                // 第一次请求的数据组合再次请求的数据
                var jobs = this.data.jobs.concat(res.data.content.data.page.result)
                this.setData({
                    jobs
                })
            }
        })
    },
    onLoad:function(){
        this.getData()
    }
    getMore(){
        this.data.page++;
        this.getData()
    }


获取参数：e.target.dataset.参数名
获取表单控件value:e.detail.value
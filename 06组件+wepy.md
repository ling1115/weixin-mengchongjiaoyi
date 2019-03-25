###原生小程序各类文件导入导出

3. data: 导入的template 与原来的data数据合并，才可以显示template中的数据 temp和pages属于同级文件
    1. temp/temp.wxml:
        <view>temp 模板 {{d}}</view>
    2. temp.js:
        Page({
            data:{
                d:'dddd',
                num:2
            }
        })
    3. pages/index/index.js
        var temp = require('../../temp')
        data:Object.assign({},temp.data,{a:'aaa'})
    这样在idnex.wxml中就可以显示 d数据
4. 绑定事件 触发事件：
    1. temp.wxml:
        <button bindtap='handle'>打印数字</button>
    2. temp.js:
        handle(){
            console.log(this.data.num)
        }
    3. pages/index/index.js
        const config = Object.assign({},temp,{这里是index中Page中所有的内容});
        Page(config)
    这样就可以在index.wxml中触发handle点击事件了

###组件
1. 组件：新建一个目录componnet(与pages是同级文件),在这个目录中新建组件 Component=> mycom
    1. index.json: 页面使用组件
        "usingComponents": {
            "mycom":"/component/mycom"
        }
    2. index.wxml: 页面中使用
        <mycom />
2. 父子组件之间的通信
    1. 父传子：properties
        1. index.wxml:
            <mycom  title='cnadh' num='1' />
        2. temp.js:
            properties:{
                title:String,
                num:Number
            }
        3. temp.wxml:
            <view>{{title}</view>
            <view>{{num+2}</view>
    2. 子传父：triggerEvent('事件',参数)
        1. temp.wxml:
            <button bindtap='send'>发送到父组件</button>
        2. temp.js:
            methods:{
                send(){
                    this.triggerEvent('child',{message:'hello'})
                }
            }
        3. index.wxml:
            <mycom title='cnadh' num='1' bindchild='receive' />
        4. index.js:
            receive(e){
                console.log(e.detail.message)
            }

###小程序框架：wepy mpvue
1. wepy 和 mpvue区别
2. pug模板引擎
3. wepy简介
    1. 全局安装脚手架：npm install wepy-cli -g
    2. 创建项目：wepy init standard myWepy
        y  =>  输入pages/indexId 小程序ID => enter => enter => no => no => no
    3. 进入项目中：cd myWepy
    4. 安装依赖：yarn
    5. 在项目目录中新建文件夹：myWepy/dist
    6. 新建小程序选择 dist目录
    7. 开启实时编译：wepy build --watch  
        小程序运行的实际上的编译之后的dist目录，dist中的不能随便更改
    8. 小程序中详情=>ES6转ES5取消勾选
    9. 安装sass: cnpm i wepy-compiler-sass -S
        wepy.config.js中sass取消注释

4. 组件引入：
    1. components/mycom.wpy
        <template>
            <view>我的组件 {{num}}</view>
        </template>
        <script>
            import wepy from 'wepy'
            export default class mycom extends wepy.component{
                data={
                    num:123
                }
            }
        </script>
        <style lang='scss'>
        </style>
    2. pages/index.wpy:
        <mycom />

        import mycom from '@componnet/mycom.wpy'
        ...
        components={
            ...,
            mycom
        }
5. component/mycom.wpy: 组件循环：<repeat>
    <!-- 注意，使用for属性，而不是使用wx:for属性 -->
    <repeat for="{{list}}" key="index" index="index" item="item">
        <!-- 插入<script>脚本部分所声明的child组件，同时传入item -->
        <child :item="item"></child>
    </repeat>
    1. components/mycom.wpy:
        <repeat for="{{list}} key="index" index="index" item="item">
            <view>{{item}}</view>
        </repeat>

        data={
            ...,
            list:['1','2','3','4','5','6']
        }
6. component/mycom.wpy: input:绑定事件实现 添加 删除
    <input type='text' @input='input' value="{{str}}"/><button @tap='add' size='mini'>添加</button>
    <repeat for="{{list}} key="index" index="index" item="item">
        <view>
            {{item}}
            <button @tap='remove({{index})' size='mini'>delete</button>
        </view>
    </repeat>

    data={
        ...,
        str:''
    }
    methods={
        input(e){
            this.str = e.detail.value
        },
        add(){
            this.list.push(this.str)
            this.str=''
        },
        remove(index){
            this.list.splice(index,1)
        }
    }

7. 父=>子通信
    1. pages/index.wpy:  :mynum.sync使父组件data变化，子组件同步更新
        <mycom :mynum.sync="mynum">
        <button @tap='plus'>父add</button>

        data={
            num:20
        }

    2. component/mycom.wpy:
        {{mynum}}
        <button @tap='add2'>子add</button>

        prope={
            mynum:{
                type:Number,
                twoWay: true
            }
        }
        methods={
            ...,
            add2(){
                this.mynum += 2
            }
        }
    
8. 子=>父通信：子组件调用父组件方法，子组件向父组件传值
    1. component/mycom.wpy:
        ...,
        <button @tap='send'></button>

        methods={
            ...,
            add2(){
                // 第一个参数：父组件
                // 第二个参数：事件名称
                // 第三个参数：事件参数，没有可以不写
                this.$invoke(this.$parent,'plus')
            },
            send(){
                this.$emit('child',123)
            }
        }
    2. pages/index.wpy:
        <mycom :mynum.sync="mynum" @child.user='receive' />

        methods={
            ...,
            receive(num){
                console.log(num)
            }
        }
        // 第二种方法
        events={
            ...,
            'child':(num)=>{
                console.log(num)
            }
        }
父=>子：
<mycom :mynum.sync="mynum">
父组件中:mynum.sync使父组件data变化，子组件同步更新
子组件中：
mynum:{
    type:Number,
    twoWay: true  // 子组件变化，父组件同步更新
}

子=>父：
    子：$emit('child',123)
    父：@child.user='receive'  监听子组件绑定事件传递过来的数据变化方法一
        方法二：在events中监听
            events={
                'child':(num)=>{
                    console.log(num)
                }
            }
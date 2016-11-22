# test-mvvm
仿造vue.js写的一个简单mvvm框架，实现了主要功能
待实现：
1. 模版的for循环标签、if/else标签
2. 使用触发事件的方式绑定
3. 加入子模块


demo使用方法：

    $ npm install
    $ webpack
    
test.js里的内容：

    import MVVM from '../src/index';
    new MVVM({
        //模版内容
        template: `
            <div>
                <p>name :</p> 
                <input type="text" m-model="name" />
                {{phoneNum}}
                <div class="address">
                    address:<br />
                    <input type="text" m-model="address" />
                </div>
                <button @click="handleClick" :style="color">click</button>
            </div>
        `,
        //数据
        data:{
            name:"dennis",
            phoneNum:'110',
            address:"CQ",
            color:'background-color:red'
        },
        //ready方法，模块加载好后触发
        ready(){
            console.log('ready');
        },
        //提供的可执行的方法
        methods:{
            handleClick(e){
                this.data.phoneNum = '18817555897';
            }
        }

    })
    

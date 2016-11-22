import MVVM from '../src/index';
new MVVM({
    template: `
        <div>
            <p>name :</p> <span>{{name}}</span>
            <input type="text" m-model="name" />
            <p>phoneNum:</p>
            {{phoneNum}} <button @click="handleClick" :style="color">changePhone</button>
            <p>address:</p><span>{{address}}</span>
            <input type="text" m-model="address" /> 
        </div>
    `,
    data:{
        name:"dennis",
        phoneNum:'110',
        address:"CQ",
        color:'background-color:red'
    },
    ready(){
        console.log('ready');
    },
    methods:{
        handleClick(e){
            this.data.phoneNum = '18817555897';
        }
    }

})
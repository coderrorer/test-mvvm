import MVVM from '../src/index';
new MVVM({
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
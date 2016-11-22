import compiler from './compiler/compiler';
import {extendDeep} from './util';
let _instance = null;
class MVVM {
    constructor(config) {
        this.options = Object.assign({}, {
            template: '',
            style: '',
            data: {},
            watch: {},
            components: {}
        }, config);
        this.data = extendDeep(this.options.data);
        this._data = {};
        this.init();
    }
    init() {
        let dom = compiler(this,this.options.template);
        document.querySelector("app").appendChild(dom);
        console.log(this.data);
        for(let item in this.options.data) {
            this.data[item] = this.options.data[item];
        }
        if(this.options.ready && typeof this.options.ready=='function') this.options.ready.apply(this);
    }


    

}
export default MVVM;

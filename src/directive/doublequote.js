export default function(bindName,node,mvvm){
    Object.defineProperty(mvvm.data,bindName,{
        get:()=>{
            return mvvm._data[bindName]
        },
        set:(v)=>{
            console.log(bindName,v);
            if(v===mvvm._data[bindName]) return;
            mvvm._data[bindName]=v;
            node.textContent = v;
        }
    })
}
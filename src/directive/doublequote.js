export default function(bindName,node,mvvm){
    mvvm.observer.on(bindName+'_Changed',(v)=>{
        mvvm._data[bindName]=v;
        node.textContent = v;
    });
    Object.defineProperty(mvvm.data,bindName,{
        get:()=>{
            return mvvm._data[bindName]
        },
        set:(v)=>{
            console.log(bindName,v);
            if(v===mvvm._data[bindName]) return;
            mvvm.observer.trigger(bindName+'_Changed',v);
        }
    })
}
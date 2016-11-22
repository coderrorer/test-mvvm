export default function(bindName,node,mvvm,propertyName){
    mvvm.observer.on(bindName+'_Changed',(v)=>{
        mvvm._data[bindName]=v;
        node.setAttribute(propertyName,v);
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
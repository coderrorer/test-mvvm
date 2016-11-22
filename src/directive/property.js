export default function(bindName,node,mvvm,propertyName){
    Object.defineProperty(mvvm.data,bindName,{
        get:()=>{
            return mvvm._data[bindName]
        },
        set:(v)=>{
            console.log(propertyName,v,node);
            if(v===mvvm._data[bindName]) return;
            mvvm._data[bindName]=v;
            node.setAttribute(propertyName,v);
        }
    })
}
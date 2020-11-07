import observe from './observe/index'
export default function initState(vm){
    //状态有很多种
    if(vm.$options.data){

        initData(vm)
    }
}
function proxy(vm,source,key){
    Object.defineProperty(vm,key,{
        get(){
            return vm[source][key]
        },
        set(newValue){
            vm[source][key]=newValue
        }
    })
}
function initData(vm){
    let data=vm.$options.data
    //将vm._options属性付给vm
    
    data= vm._options= typeof data==='function'?data.call(vm):data
    for(let key in data){
        proxy(vm,'_options',key)
    }
    observe(data)
}
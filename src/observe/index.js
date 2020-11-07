import { ArrayMethods } from "./array"

class Observer{
    constructor(value){
          // value.__ob__=this;//如果这样写会导致死循环
          Object.defineProperty(value,'__ob__',{
            value:this,
            enumerable:false,//不能被枚举表示不能被虚幻
            configurable:false,//不能删除此属性
        })
        //如果是一个数组
        if(Array.isArray(value)){
          
            // 改写数组的方法
            value.__proto__=ArrayMethods
           
            this.observeArray(value)
        }else{
            //分开每一步观测
            this.walk(value)
        }
        
    }
    observeArray(value){
        for(let i=0;i<value.length;i++){
            observe(value[i])
        }
    }
    walk(data){
        //观测是目的是劫持数据
        Object.keys(data).forEach(key=>{
            defineReactive(data,key,data[key])
        })
        
    }
}
export  function defineReactive(data,key,value){
    //如果是深层对象,value也有可能是对象
    observe(value)
    Object.defineProperty(data,key,{
        get(){
            return value;
        },
        set(newValue){
            if(value===newValue) return;
            //如果用户设置的是一个对象
            observe(newValue)
            value=newValue
        }
    })
}

export default function observe(data){
    //如果不是各对象直接不用观测
    if(typeof data!=='object' || data==null) return;
    if(data.__ob__) return;
    new Observer(data)
}
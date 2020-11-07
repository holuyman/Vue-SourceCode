let oldArrayMethods=Array.prototype;

export let ArrayMethods=Object.create(Array.prototype)
let methods=[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]
methods.forEach(method=>{
     ArrayMethods[method]=function(...args){
       let result=  oldArrayMethods[method].call(this,...args)
       //在这里重新为新的监听
       let inserted;
       switch(method){
           case 'push':
               case 'unshift':
                inserted=args
                break;
                case 'splice':
                    inserted=args.slice(2)
                    default:
                    break;
       }
       if(inserted){
           this.__ob__.observeArray(inserted)
       }
       return result
     }
})
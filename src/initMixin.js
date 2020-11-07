import initState from "./state"

export default function initMixin(Vue){
    Vue.prototype._init=function(options){
      const vm=this;
      vm.$options=options
      //初始化状态
      initState(vm)
      //el属性
      if(vm.$options.el){
        this.$mount(vm.$options.el)
      }
    }
    Vue.prototype.$mount=function(el){
      el=document.querySelector(el)
      const vm=this;
      const options=vm.$options;

      if(!options.render){
        let template=options.template;
        if(!template && el){
          template=el.outerHtml
        }
        const render =compileToFunction(template)
        vm.render=render
      }
    }
}


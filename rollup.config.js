import serve from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'

export default {
    input:'./src/index.js',
    output:{
        file:'dist/vue.js',
        name:'Vue',
        format:'umd',
        sourcemap:true,
    },
    plugins:[
        babel({
            exclude:'node_module/**'
        }),
        serve({
            open:true,
            openPage:'/public/index.html',
            port:4000,
            contentBase:''
        })
    ]
}
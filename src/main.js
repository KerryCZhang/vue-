import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios)

// Vue.config.devtools=true
//vue-socket.io的使用
//1.下载cnpm install vue-socket.io --save
//2.引入
import VueSocketIO from 'vue-socket.io'

//获取桌子号
import localstorage from "./model/localsession.js"

var uid=window.location.search.split("=")[1];
uid=uid&&localstorage.set("uid",uid)
Vue.use(new VueSocketIO({connection:'http://a.itying.com?roomid='+uid}))


//导入组件
import welcome from './components/1welcome_component'
import editWelcome from './components/1welcome_edit_component'
import home from './components/2index_component'
import detail from './components/3detail_component'
import hotSale from './components/4hotSale_component'
import search from './components/5search_component'
import orderDetail from './components/7orderDetail_components'
import cart from './components/6cart_component'
//1.定义路由
const router=new vueRouter({
  mode:'history',
  routes:[
    {path:'/welcome',component:welcome},
    {path:'/editWelcome', component:editWelcome},
    {path:"/home", component:home},
    {path:"/detail", component:detail},
    {path:"/hotSale", component:hotSale},
    {path:"/search", component:search},
    {path:"/orderDetail", component:orderDetail},
    {path:"/cart", component:cart},
    {path:"*", redirect:'/welcome'}
  ]
});
//2.挂载
new Vue({
  el: '#app',
  router,
  sockets:{
    connect(){
      console.log("socket connection");
    }
  },
  components:{App},
  template:`<App></App>`
})

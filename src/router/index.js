import VueRouter from 'vue-router';
import Vue from 'vue'

Vue.use(VueRouter)

//顶层router
export const routerMap = [
    { 
        //login
        path: '/login', 
        name:'login',
        components: require('../views/login.vue'),
        meta: {
            keepAlive:true
        },
        hidden:true
    },
    { 
        path: '/register', 
        name:'register',
        components: require('../views/register.vue'),
        meta: {
            keepAlive:true
        },
        hidden:true
    },
    { 
        path: '/', 
        name:'index',
        components: require('../components/HelloWorld.vue'),
        meta: {
            title:'123',
            keepAlive:true
        },
        hidden:true
    },
    { 
        path: '/gettime', 
        name:'time',
        components: require('../components/gettime.vue'),
        meta: {
            keepAlive:true
        },
        hidden:true
    },
    { 
        path: '/add', 
        name:'add',
        components: require('../components/add.vue'),
        meta: {
            keepAlive:true
        },
        hidden:true
    },
    { 
        path: '/user', 
        name:'user',
        components: require('../views/user.vue'),
        meta: {
            title:"个人信息",
            keepAlive:true
        },
        hidden:true
    },
    { 
        path: '/users', 
        name:'users',
        components: require('../views/users.vue'),
        meta: {
            title:"个人信息",
            keepAlive:true
        },
        hidden:true
    },
]

export default new VueRouter({
    mode: 'history',
    // scrollBehavior: () -> ({
    //     y:0
    // }),
    routes: routerMap
  })

  
  
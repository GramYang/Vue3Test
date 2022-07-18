import {createRouter,createWebHistory} from 'vue-router'

const route1=[
    {
        path:'/test1',
        component:()=>import('@/components/Test1'),
    },
    {
        path:'/slot_test1',
        component:()=>import('@/components/slot_test/s1')
    },
    {
        path:'/transition_test1',
        component:()=>import('@/components/transition_test/t1')
    },
    {
        path:'/loader_test1',
        component:()=>import('@/components/loader_test/l1')
    },
    {
        path:'/elementplus_test1',
        component:()=>import('@/components/elementplus_test/et1')
    },
    {
        path:'/composite_api_test1',
        component:()=>import('@/components/composite_api_test/c1')
    },
    {
        path:'/teleport_test1',
        component:()=>import('@/components/teleport_test/t1')
    },
    {
        path:'/vuex_test1',
        component:()=>import('@/components/vuex_test/t1')
    },
    {
        path:'/vuex_test2',
        component:()=>import('@/components/vuex_test/t2')
    },
    {
        path:'/router_test/:id/route/:name',
        component:()=>import('@/components/router_test/t1')
    },
    {
        path:'/router_test2',
        name:'RouterTest2',
        component:()=>import('@/components/router_test/t2'),
        // eslint-disable-next-line no-unused-vars
        beforeEnter:(to,from,next)=>{
            console.log('router_test2 beforeEnter')
            next()
        },
        //路由独享的守卫只有beforeEnter，对离开路由没有监控
    },
    {
        path:'/websocket_test1',
        name:'WebsocketTest1',
        component:()=>import('@/components/websocket_test/t1')
    },

]

//大坑，定义route1一定要写在上面
const router=createRouter({
    history:createWebHistory(),
    routes:route1
})

export default router


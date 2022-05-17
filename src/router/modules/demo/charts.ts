import Layout from '/src/App.vue';
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "demo__charts",
    path: "/charts",
    component: Layout,
    redirect: "/demo/charts/baidu-map",
    children: [{
        name: "demo__charts__baidu-map",
        path: "charts/baidu-map",
        component: () => {
            return import('/src/page/_Module_demo/_charts/_baidu-map/index.vue')
        },
        redirect: "",
        children: [],
        meta: {}
    }],
    meta: {}
}
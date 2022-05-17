import Layout from '/src/App.vue';
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "gowai",
    path: "/gowai",
    component: () => {
        return import('/src/page/_gowai/index.vue')
    },
    redirect: "",
    children: [],
    meta: {}
}
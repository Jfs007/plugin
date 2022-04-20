import RouterView from '/src/RouterView.vue';
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "demo__uer",
    path: "/uer",
    component: () => {
        return import('src/page/_Module_demo/_uer/index.vue')
    },
    redirect: "",
    children: [],
    meta: {}
}
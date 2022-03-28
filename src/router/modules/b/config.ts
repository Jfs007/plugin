//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "b__config",
    path: "b/config",
    redirect: "",
    component: () => {
        return import('src/router/modules/Module_b/config/index.vue')
    },
    children: [],
    meta: {}
}
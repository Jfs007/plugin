//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "a__v",
    path: "a/v",
    redirect: "",
    component: () => {
        return import('src/router/modules/Module_a/v/index.vue')
    },
    children: [],
    meta: {}
}
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "a__ldjif",
    path: "a/ldjif",
    redirect: "",
    component: () => {
        return import('src/router/modules/Module_a/ldjif/index.vue')
    },
    children: [],
    meta: {}
}
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "a__linke",
    path: "a/linke",
    redirect: "",
    component: () => {
        return import('src/router/modules/Module_a/linke/index.vue')
    },
    children: [],
    meta: {
        icon: 'mini'
    }
}
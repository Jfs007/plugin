import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "b__hom",
    path: "b/hom",
    redirect: "",
    component: () => {
        return import('src/router/modules/Module_b/hom/index.vue')
    },
    children: [],
    level: 2,
    meta: {}
}
import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
import RouterView from '/src/App.vue';
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "a__config",
    path: "a/config",
    redirect: "/a/config/form",
    component: () => {
        return import('src/router/modules/Module_a/config/index.vue')
    },
    children: [{
        name: "a__config__form",
        path: "config/form",
        redirect: "",
        component: () => {
            return import('src/router/modules/Module_a/config/form/index.vue')
        },
        children: [],
        level: 3,
        meta: {}
    }],
    level: 2,
    meta: {}
}
import RouterView from '/src/App.vue';
import vfly from '/src/page/Module_a';
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "demo__charts",
    path: "demo/charts",
    redirect: "/demo/charts/e-charts",
    component: RouterView,
    children: [{
        name: "demo__charts__baidu-map",
        path: "charts/baidu-map",
        redirect: "",
        component: () => {
            return import('src/page/Module_demo/charts/baidu-map/index.vue')
        },
        children: [],
        level: 3,
        meta: {}
    }, {
        name: "demo__charts__e-charts",
        path: "charts/e-charts",
        redirect: "/demo/charts/e-charts/map",
        component: () => {
            return import('src/page/Module_demo/charts/e-charts/index.vue')
        },
        children: [{
            name: "demo__charts__e-charts__map",
            path: "e-charts/map",
            redirect: "",
            component: () => {
                return import('src/page/Module_demo/charts/e-charts/map/index.vue')
            },
            children: [],
            level: 4,
            meta: {}
        }],
        level: 3,
        meta: {}
    }],
    level: 2,
    meta: {}
}
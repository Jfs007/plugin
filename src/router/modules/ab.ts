import RouterView from '/src/App.vue';
import vfly from '/src/page/Module_a';
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "ab",
    path: "/ab",
    redirect: "",
    component: RouterView,
    children: [],
    moduleName: "",
    meta: {}
}
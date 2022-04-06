import RouterView from '/src/App.vue';
import vfly from '/src/page/Module_a';
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "b__config",
    path: "b/config",
    redirect: "",
    component: RouterView,
    children: [],
    level: 2,
    meta: {},
    fragment: true
}
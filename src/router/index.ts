
import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';
import { createRouter, createWebHashHistory } from 'vue-router';
const modules = import.meta.globEager('./modules/**/**.ts');

let moduleRoutes = Object.keys(modules).map(path => {
    return modules[path].default || {};
});
// console.log(moduleRoutes, 'module');
let Router: AppRouteRecordRaw = [
    ...moduleRoutes
]

console.log(Router, 'Router')
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes: Router, // `routes: routes` 的缩写
});

export default router;
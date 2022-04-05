
import type { ConfigType  } from '../types';
import FileListenPlugin from '../component/file-listen-plugin';
import type { Plugin } from 'vite';
import { Word } from '../utils/word';
function Run(config?: ConfigType) : Plugin {
    let fileListenPlugin = new FileListenPlugin(config);
    let _word = new Word().analysis(`{
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
    }`);
    console.log((_word), 'word');
    return {
        name: 'file-listen',
        
        handleHotUpdate(hmrContext) {
            fileListenPlugin.listen({
                root: hmrContext?.server?.config?.root,
                path: hmrContext.file
            })
         
        }
    }
}


export default Run;







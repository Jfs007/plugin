import { ConfigType } from "../types";
import Router from "../component/router";

const util = require('util')
let isModule = (folder: string, config: ConfigType): boolean => {
    let { moduleTarget, moduleRouterTarget } = config;
    return <boolean>!!folder.match(moduleTarget) || <boolean>!!folder.match(moduleRouterTarget)
}
let routerFolder = (folder: string, config: ConfigType):string => {
   return folder.replace(config.moduleTarget, '');
}



export let createRouter = (files: Array<string>, srcDir: string, config: ConfigType) => {
    let routers = [];
    let filePathDir = `${srcDir}/${config.path}/`;
    files.map(file => {
        let folderArray: Array<string> = file.replace(`${srcDir}/${config.include}/`, '').split('/');
        let router: Router = new Router({});
        let tempVarRouters = routers;
        let routerFolders: Array<string> = [];
        folderArray.map((folder, level) => {
            routerFolders.push(routerFolder(folder, config));
            // 是否为模块
            if(isModule(folder, config)) {
                folder = routerFolder(folder, config);
                router.isModule = true;
            }else {
                router.isModule = false;
            }
            let rName = routerFolders.slice(0, level+1).join('__')
            let rPath = level > 0 ? routerFolders[level-1] + '/' + folder : '/' + folder;
            router.init({
                name: rName,
                path: rPath
            });
            router.filePath = filePathDir + routerFolders.join('/');
            router.chunkName = `${config.path}/${folderArray.slice(0, level+1).join('/')}/index.vue`;
            router.component = `$Function(() => {  return import('${router.chunkName}')  })`
            let visAvis = tempVarRouters.find(varRouter => varRouter.name == router.name);
            if (visAvis) {
                let nextFolder:string = folderArray[level+1] ? routerFolder(folderArray[level+1], config) : '';
                visAvis.redirect = '/' + routerFolders.join('/') + ( nextFolder ? '/' + nextFolder : '');
                visAvis.children = visAvis.children || [];
                tempVarRouters = visAvis.children;
            }
            
        });
        tempVarRouters.push(router);
    });
    return routers;


}
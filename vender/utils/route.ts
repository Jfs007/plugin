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
    let _blankRouter = new Router({
        name: '_blank'
    });
    let filePathDir = `${srcDir}/${config.path}/`;
    files.map(file => {
        let folderArray: Array<string> = file.replace(`${srcDir}/${config.include}/`, '').split('/');
        let router: Router = new Router({});
        let tempVarRouter = _blankRouter;
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
            let visAvis = tempVarRouter.search(router);
            if (visAvis) {
                let nextFolder:string = folderArray[level+1] ? routerFolder(folderArray[level+1], config) : '';
                visAvis.redirect = '/' + routerFolders.join('/') + ( nextFolder ? '/' + nextFolder : '');
                visAvis.children = visAvis.children || [];
                tempVarRouter = visAvis;
            } else {
                
            }
            
        });
        tempVarRouter.appendChild(router);
    });
    // console.log(util.inspect(_blankRouter.children, { showHidden: true, depth: null }))
    return _blankRouter.children;


}
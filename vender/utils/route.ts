import { ConfigType } from "../types";
import Router from "../component/router";
import { Word } from "./word";

const util = require('util');
let isRouteModule = (folder: string, config: ConfigType): boolean => { 
    let { moduleRouterTarget } = config;
    return <boolean>!!folder.match(moduleRouterTarget)
}
let isModule = (folder: string, config: ConfigType): boolean => {
    let { moduleTarget, moduleRouterTarget } = config;
    return <boolean>!!folder.match(moduleTarget) && <boolean>!!!folder.match(moduleRouterTarget)
}
let routerFolder = (folder: string, config: ConfigType):string => {
   return folder.replace(config.moduleTarget, '');
}

let getRouteNameGroup = (folderArray: Array<string>, level: number, config: ConfigType) => {
    let nameGroup = [];
    folderArray.slice(0, level+1).map(folder => {
        let _isModule = isModule(folder, config);
        // 模块只出现一次
        if(_isModule && level == 0) {
            nameGroup.push(routerFolder(folder, config));
        }
        if(!_isModule) {
            nameGroup.push(folder)
        }
    });
    return nameGroup;
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
                router.moduleName = folder;
            }else {
                router.isModule = false;
            }
            let routeNameGroup = getRouteNameGroup(folderArray, level, config);
            let rName = routerFolders.slice(0, level+1).join('__')
            let rPath =  (routeNameGroup.length == 1 ? '/' : '') + routeNameGroup.slice(-2).join('/');
            router.init({
               
                name: rName,
                path: rPath
            });
            router.filePath = filePathDir + routerFolders.join('/');
            router.chunkName = `${config.include}/${folderArray.slice(0, level+1).join('/')}/index.vue`;
            router.component = `() => {  return import('${router.chunkName}')  }:function`
            let visAvis = tempVarRouter.search((CRouter) => {
               return CRouter.name == router.name;
            });
            if (visAvis) {
                let nextFolder:string = folderArray[level+1] ? routerFolder(folderArray[level+1], config) : '';
                visAvis.redirect = '/' + routerFolders.join('/') + ( nextFolder ? '/' + nextFolder : '');
                visAvis.children = visAvis.children || [];
                tempVarRouter = visAvis;


                
            } else {
                // router.filePath = 
            }
           
            
        });
        tempVarRouter.appendChild(router);
    });
    // console.log(util.inspect(_blankRouter.children, { showHidden: true, depth: null }))
    return _blankRouter.children;


}
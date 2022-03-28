

let fs = require('fs');
import Router from "../component/router";
import jsBeautify from 'js-beautify';
import { promiseify } from "../utils/pify";
import { ConfigType } from '../types'
let readFile = promiseify(fs.readFile);
export default class FileBuilt {
    routes: Array<Router>;
    constructor(routes: Array<Router>, srcDir: string, config: ConfigType) {
        this.routes = routes;

        let moduleFolder = `${srcDir}/${config.path}`;
        
        if(!fs.existsSync(moduleFolder)) {
            fs.mkdirSync(moduleFolder);
        }
        this.built(this.routes, config);
    }
    babelCode(code:string):string {
        let newCode = code.replace(/(import|require)\(.*?\)/g, $ => $.toString());
        // console.log(newCode, code);
        return newCode;
    }

    moduleImportMerge(moduleLeft:string, modules:Array<string>):Array<string> {
        console.log(modules, moduleLeft, '---')
        modules = modules.filter(module => {
            let moduleName = (module.match(/from\s+['|"](.*?)['|"]/)?.[1]) || '';
            console.log(moduleName, 'pmoduleName', new RegExp(`import\s+.*from\s+['|"]${moduleName}['|"]`))
            return <boolean>(!!!(moduleLeft.match(new RegExp(`import\s+.*from\s+['|"]${moduleName}['|"]`))?.[0]))
        })
        
        return [...modules, moduleLeft];
    }
    


    built(routes, config) {
        let format = config.format;
        routes.map(async route => {
            route = config!.routeRewrite(route) || route;
            if (route.isModule) {
                if (!fs.existsSync(route.filePath)) {
                    fs.mkdirSync(route.filePath);
                }
            } else {
                let moduleLeft: string = '//文件为插件产生 原则上只允许修改路由参数   \n export default ';
                let routerVar: object | null = null;
                try {
                    if (fs.existsSync(route.filePath + '.' + format)) {
                        let fileValue = await readFile(route.filePath + '.' + format);
                        let originCode = fileValue.toString();
                        let leftReg = /([\w\W]*)export\sdefault/;
                        moduleLeft = <string>((originCode.match(leftReg))?.[0]) || moduleLeft;
                        let marginRight = originCode.replace(leftReg, '');
                        let __var = `return ${marginRight || '{}'}`;
                        routerVar = Function(this.babelCode(__var))();
                    }
                    routerVar = routerVar ? config!.routeRewrite(routerVar) : routerVar;
                    route.merge(routerVar || {});
                    moduleLeft = config?.fileLoad(moduleLeft) || moduleLeft;
                    let _mouduleImport = config.mouduleImport(route) || {};
                    moduleLeft = this.moduleImportMerge(moduleLeft, _mouduleImport).join('\n');
                    let code = jsBeautify.js(`${moduleLeft}${route.serialize()}`);
                    fs.writeFile(route.filePath + '.' + format, code, () => { });
                } catch (error) {
                    
                    return new Error(error)
                }
            }
            if (route.children.length) {
                this.built(route.children, config);
            }
        })

    }






}
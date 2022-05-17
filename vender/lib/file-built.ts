

let fs = require('fs');
import Router from "../component/router";
import jsBeautify from 'js-beautify';
import { promiseify } from "../utils/pify";
import { ConfigType } from '../types'
import { Word } from "../utils/word";
let readFile = promiseify(fs.readFile);
export default class FileBuilt {
    routes: Array<Router>;
    constructor(routes: Array<Router>, srcDir: string, config: ConfigType) {
        this.routes = routes;

        let moduleFolder = `${srcDir}/${config.path}`;

        if (!fs.existsSync(moduleFolder)) {
            fs.mkdirSync(moduleFolder);
        }
        this.built(this.routes, config);
    }

    moduleImportMerge(moduleLeft: string, modules: Array<string>): Array<string> {
        modules = modules.filter(module => {
            let moduleName = (module.match(/from\s+['|"](.*?)['|"]/)?.[1]) || '';
            return <boolean>(!!!(moduleLeft.match(new RegExp(`import\\s+.*from\\s+['|"]${moduleName}['|"]`))?.[0]))
        })

        return [...modules, moduleLeft];
    }



    built(routes: Array<Router>, config: ConfigType) {
        let format = config.format;

        routes.map(async route => {
            route = config!.routeRewrite(route) || route;
            if (route.isModule) {
                if (!fs.existsSync(route.filePath)) {
                    // 生成模块文件
                    fs.mkdirSync(route.filePath);




                }
                // 生成导出文件
                let importModules = [];
                (route.children || []).map(route => {
                    if (!route.isModule) {
                        let moduleName = route.name.split('__').slice(-1)[0];
                        importModules.push(moduleName);

                    }
                });

                // let importModulesString = importModules.map(_ => {
                //     return `import ${_} from './${_}.${format}'`;
                // }).join('\n');

                // let exportFile = `${importModulesString}\n // 该文件禁止修改  \n export default {   ${importModules.join(',').replace(/^["'](.*)["']$/, "$1")}  }`;
                // fs.writeFile(`${route.filePath}/index.ts`, exportFile, () => { });


                this.built(route.children, config);
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
                        routerVar = new Word(marginRight).js();
                    }
                    route.merge(routerVar || {}, (route, level) => {
                        return config!.routeRewrite(route, level) || route;
                    });
                    moduleLeft = config?.fileTopLoad(moduleLeft) || moduleLeft;
                    let _mouduleImport = config.mouduleImport(route) || {};
                    moduleLeft = this.moduleImportMerge(moduleLeft, _mouduleImport).join('\n');
                    let code = jsBeautify.js(`${moduleLeft}${route.serialize()}`);
                    fs.writeFile(route.filePath + '.' + format, code, () => { });
                } catch (error) {
                    console.log(error, 'error');
                    return new Error(error)
                }
            }

            // if ( route.children.length&&route.isModule) {
            //     this.built(route.children, config);
            // }
        })

    }






}
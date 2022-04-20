import Base from "../lib/base";
import { serialize } from "../utils/serialize";
import { Word } from '../utils/word';
let word = new Word('');
export type Meta = {
    icon?: string,
    cache?: boolean
}

export default class Router extends Base {
    name: string;
    path: string;
    redirect: string;
    component: Function | string | void;
    children: Array<Router>;
    isModule: boolean;
    moduleName: string;
    filePath: string;
    chunkName: string;
    level: number;
    meta: Meta;
    constructor(config) {
        super(config);
        this.name = '';
        this.path = '';
        this.level = 0;
        this.component = Function();
        this.redirect = '';
        this.filePath = '';
        this.children = [];
        this.chunkName = '';
        this.meta = <Meta>{};
        this.isModule = false;
        this.moduleName = '';
        super.init(config);
    }
    appendChild(Router: Router) {
        Router.level = this.level + 1;
        this.children.push(Router);
    }

    appendChilds(Routers: Array<Router>) {
        Routers.map(router => {
            this.appendChild(router)
        })

    }


    search(callback): null | Router {
        return this.children.find(Crouter => callback(Crouter));
    }


    get ingoreSerializeKeys() {
        return ['isModule', 'filePath', 'chunkName', 'level', 'moduleName'];
    }

    asType(value: unknown): string {
        if (typeof value == 'string') {
            let typeMatch = value.match(/:([^:]*?)$/);
            let type = typeMatch ? typeMatch[1] : 'string';
            return type;
        }
        return (typeof value).toLowerCase();
    }

    pureNoType(value:string):string {
        return value.replace(/(:[^:]*?)$/, '');
    }


    // get isRouter

    toSerializeValue(value, key?): any {




        return serialize(value, ({ key, value }) => {
            let type = this.asType(value);
            if (type == 'string') { value = `"${value.replace(/(:[^:]*?)$/, '')}"` } else {
                if(typeof value == 'string') {
                    value = value.replace(/(:[^:]*?)$/, '').replace(/^["'](.*)["']$/, "$1");
                }
                
            };
            return { key, value }
        });

    }

    

    diff(router: Router, refRouter) {


    }
    extend(refTarget, callback:Function, level:number): Router {
        refTarget = callback && callback(refTarget, level);
        if(!refTarget) return;
        for (let key in refTarget) {
            if (key == 'children') {
                let routerChildren = this[key] || [];
                // 文件源路由不存在 用户自己添加的
                if (!routerChildren.length) {
                    refTarget[key].map(refRouter => {
                        this.appendChild(new Router(refRouter));
                    });
                    routerChildren = this[key];
                }
                level++;
                refTarget[key].map(refRouter => {
                    
                    let matchRouter = routerChildren.find(router => this.pureNoType(router.name) == this.pureNoType(refRouter.name));
                   
                    if (matchRouter) {

                       
                        (<Router>matchRouter).extend(refRouter, callback, level);
                    } else {
                        this.appendChild(new Router(refRouter));
                    }
                })
            } else {
                this[key] = refTarget[key];
            }


        }
        return this;
    }
    merge(mergeRouter, callback?:Function) {

        let _merge = (router: Router, level: number) => {
            this.extend && this.extend(mergeRouter, callback, level);
        }
        _merge(this, 1);
    }

    serialize(): string {
        let _serialize = (router: Router): string => {
            let keyGroup = [];
            for (let key in router) {
                if (this.hasOwnProperty(key) && this.ingoreSerializeKeys.indexOf(key) < 0) {
                    let value = this[key];
                    if (key == 'children') {
                        let routerSerializeGroup: Array<string> = value.map(router => {
                            let serialize: string = '';

                            if(!router.serialize) {
                                router = new Router(router);
                            }
                            serialize = router.serialize()
                            
                            return serialize;
                        });
                        let childrenSerialize: string = `[${routerSerializeGroup.join(',')}]`;
                        keyGroup.push(`${key}:${childrenSerialize}`)

                    } else {
                        keyGroup.push(`${key}: ${this.toSerializeValue(value, key)}`);
                    }
                    ;
                }
            }

            return `{${keyGroup.join(',')}}`;
        }

        return _serialize(this);

    }

    inspect() {

    }



}
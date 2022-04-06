import Base from "../lib/base";
import { serialize } from "../utils/serialize";
import { Word } from '../utils/word';
let word = new Word('');
export type Meta = {
    icon?: string,
    cache?: boolean
}

export default class Router extends Base {
    _id: string;
    name: string;
    path: string;
    redirect: string;
    component: Function | string | void;
    children: Array<Router>;
    isModule: boolean;
    filePath: string;
    chunkName: string;
    level: number;
    meta: Meta;
    fragment: boolean;
    constructor(config) {
        super(config);
        this._id = '';
        this.name = '';
        this.path = '';
        this.level = 0;
        this.component = Function();
        this.redirect = '';
        this.filePath = '';
        this.children = [];
        this.fragment = true;
        this.chunkName = '';
        this.meta = <Meta>{};
        this.isModule = false;
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
        return ['isModule', 'filePath', 'chunkName', '_id'];
    }

    asType(value: unknown): string {
        if (typeof value == 'string') {
            let typeMatch = value.match(/:([^:]*?)$/);
            let type = typeMatch ? typeMatch[1] : 'string';
            return type;
        }
        return (typeof value).toLowerCase();
    }
    // get isRouter

    toSerializeValue(value, key): any {




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
    extend(refTarget): Router {
        for (let key in refTarget) {
            if (key == 'children') {
                let routerChildren = this[key] || [];
                // 源路由不存在
                if (!routerChildren.length) {
                    refTarget[key].map(refRouter => {
                        this.appendChild(new Router(refRouter));
                    });
                    routerChildren = this[key];
                }
                refTarget[key].map(refRouter => {
                    let matchRouter = routerChildren.find(router => router.name == refRouter.name);
                    if (matchRouter) {
                        (<Router>matchRouter).extend(refRouter);
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
    merge(mergeRouter) {
        let _merge = (router: Router) => {
            this.extend(mergeRouter);
        }
        _merge(this);
    }

    serialize(): string {
        let _serialize = (router: Router): string => {
            let keyGroup = [];
            for (let key in router) {
                if (this.hasOwnProperty(key) && this.ingoreSerializeKeys.indexOf(key) < 0) {
                    let value = this[key];
                    if (key == 'children') {
                        let routerSerializeGroup: Array<string> = value.map(router => {
                            let serialize: string = router.serialize();
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
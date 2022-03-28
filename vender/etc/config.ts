

import { ConfigType  as ConfigType} from '../types';
 
 let config: ConfigType = {
    path: 'src/router/modules',
    include: 'src/page',
    ignoreFilePrefix: '@',
    moduleTarget: 'Module_',
    moduleRouterTarget: 'Module_r_',
    format: 'ts',
    routeRewrite: router => router,
    fileLoad: file => file,
    mouduleImport: (router) => []

}

export default config;



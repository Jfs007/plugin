

import { ConfigType  as ConfigType} from '../types';
 
 let config: ConfigType = {
    path: 'src/router/modules',
    include: 'src/page',
    includeFilePrefix: '',
    ignoreFilePrefix: '@',
    moduleTarget: 'Module_',
    moduleRouterTarget: 'Module_r_',
    format: 'ts',
    routeRewrite: (router, level) => router,
    fileTopLoad: file => file,
    mouduleImport: (router) => []

}

export default config;



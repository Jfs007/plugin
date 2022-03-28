

import { ConfigType  as ConfigType} from '../types';
 
 let config: ConfigType = {
    // dirname: 'src',
    path: 'src/router/modules',
    include: 'src/page',
    ignoreFilePrefix: '@',
    moduleTarget: 'Module_',
    moduleRouterTarget: 'Module_r_',
    format: 'ts',
    routeRewrite: router => router,
    fileLoad: file => file,

}

export default config;



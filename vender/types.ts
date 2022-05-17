export type ConfigType = {
    // 路由文件目录
    path?: string,
    // 路由作用目录 该目录下的文件将被监听产生路由文件
    include?: string,
    // 忽略 文件名携带则将不产生路由
    ignoreFilePrefix?: string,
    // 模块标识，文件名携带则将产生为模块
    moduleTarget?: string,
     // 模块路由标识，文件名携带则将产生为路由模块 与moduleTarget不同的地方 moduleTarget只产生路由
    moduleRouterTarget?: string,
    // 构建文件前缀 只有文件名包含该前缀的才会产生文件，默认所有文件都能产生路由
    includeFilePrefix?: string,
    // 路由文件格式
    format?: string,
    // 路由重写
    routeRewrite?: Function,
    // 文件加载
    fileTopLoad?: Function
    // 模块导入
    mouduleImport?: Function
 }

 export type File = {
    path: string,
    root: string
    
}

export type watchOptions = {
    file: string;
  
}



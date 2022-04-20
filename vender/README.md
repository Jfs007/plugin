# vuerouter-build-vite-plugin
用于 根据指定文件目录自动生成路由文件
## 特征
只会将 `${config.include}**/index.vue`文件结构生成为路由文件

假设 `${config.include}` 的目录结构如下：
```bash
src/pages/
--| user/
-----| index.vue
--|@ignore/
-----| index.vue
--| index.vue
```
那么，plugin自动生成的路由文件如下：(@文件将忽略，见配置)
```
src/router/modules/
--| user.ts
```
user.ts 

```bash
//文件为插件产生 原则上只允许修改路由参数   
export default {
    name: "user",
    path: "/user",
    component:  import(`${config.include}/user/index.vue`),
    redirect: "",
    children: [],
    meta: {},
}
```

## 安装
**node version:** >=12.0.0
**vite version:** >=2.0.0
```bash
yarn add vuerouter-build-vite-plugin --dev
```
## 使用

- vite.config.ts 中的配置插件
```ts
import vuerouterBuildPlugin from 'vuerouter-build-vite-plugin';
export default defineConfig({
  plugins: [vuerouterBuildPlugin({ 
    includeFilePrefix: '_',
    routeRewrite(route, level) {
      // 第一层使用routerView
      if(level == 1) {
        route.component = `RouterView:var`
      }
      return route;
    },
    mouduleImport(route) {
      return ([
        `import RouterView from '/src/layout/RouterView.vue';`,
      ]);
    },
    fileTopLoad(left) {
      return left;
    }
  })]
})
```

### 配置说明

| 参数        | 类型                   | 默认值                | 说明                                                           |
| ----------- | ---------------------- | --------------------- | -------------------------------------------------------------- |
| path    | `string`             |    `src/router/modules/`                     | `需要生成路由文件的指定目录 `                               |
| include    | `string`               |    `src/page`   | `该目录下的文件变动会生成路由文件`                             |
| ignoreFilePrefix | `string`          |           `@`        |`该前缀的文件夹下的所有文件会被忽略生成路由文件` |
| includeFilePrefix(1.1.4新增) | `string`          |                   |`默认为空，设置该参数时只有包含该前缀的文件才会生成路由文件(为了减小插件入侵影响，建议设置该参数)` |
| moduleTarget      | `string`               | `Module_`           | `该前缀的文件夹下的文件将被单独产生一个文件夹作为路由模块，而不是单一的路由文件但是该文件夹不会作为路由对一部分`                        |
| moduleRouterTarget | `string`               | `Module_r_` | `该前缀的文件夹下的文件将被单独产生一个文件夹作为路由模块，而不是单一的路由文，与moduleTarget不同的是moduleRouterTarget将该文件夹也作为路由的一部分`                                          |
| format | `string`          |           `ts`        |`路由文件格式` |
| routeRewrite | `function`          |           `(router, level)=> router`        |`可重写路由对象` |
| fileTopLoad | `function`          |           `file => file`        |`路由文件重写，文件路由对象顶层部分将被重写` |
| mouduleImport | `function`          |           `router:Array<string> => router `        |`为路由文件导入模块，功能类似于fileLoad，但是fileLoad不仅限于导入模块` |
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuerouterBuildPlugin from './vender/index';

// https://vitejs.dev/config/
// ceshi
// gaidong

// nonoe
// dev2 content
export default defineConfig({
  plugins: [vue(), vuerouterBuildPlugin({ 
    includeFilePrefix: '_',
    routeRewrite(route, level) {
      // 第一层使用routerView
      if(level == 1) {
        // route.component = `{  template: '<router-view></router-view>' }:object`
      }
      return route;
    },
    mouduleImport(route) {
      return ([
        `import RouterView from '/src/RouterView.vue';`,
      ]);
    },
    fileTopLoad(left) {
      return left;
    }
  })]
})

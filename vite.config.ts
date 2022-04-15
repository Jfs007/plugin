import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import hotPlugin from './vender/bin/hot';
// https://vitejs.dev/config/
// ceshi
// gaidong

// nonoe
// dev2 content
export default defineConfig({
  plugins: [vue(), hotPlugin({ 
    routeRewrite(route, level) {
      // 第一层使用routerView
      if(level == 1) {
        route.component = `RouterView:var`
      }
      return route;
    },
    mouduleImport(router) {
      return ([
        `import RouterView from '/src/App.vue';`,
        `import vfly from '/src/page/Module_a';`
      ]);
    },
    fileLoad(left) {
      return left;
    }
  })]
})

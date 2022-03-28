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
    // routeRewrite(route) {
    //   // console.log(route, 'route');
    //   route.component = `$Function(() => import("/v"))`
    //   return route;
    // },
    mouduleImport(router) {
      if(router.level == 4) {
        return ([`import V from 'vite'`])
      }
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

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import hotPlugin from './vender/bin/hot';
// https://vitejs.dev/config/
// ceshi
// gaidong
export default defineConfig({
  plugins: [vue(), hotPlugin({ 
    // routeRewrite(route) {
    //   // console.log(route, 'route');
    //   route.component = `$Function(() => import("/v"))`
    //   return route;
    // },
    mouduleImport() {
      return [`import RouterView from '/src/App.vue';`];
    },
    fileLoad(left) {
      return left;
    }
  })]
})

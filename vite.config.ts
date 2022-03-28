import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import hotPlugin from './vender/bin/hot';
// https://vitejs.dev/config/
// ceshi
// gaidong

<<<<<<< HEAD


=======
// nonoe
// dev2 content
>>>>>>> 5741f245c68bf72c3ec64306b51b0495ae593f4c
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

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import hotPlugin from './vender/bin/hot';

// import vender from './src/vender/index.js';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), hotPlugin({}, {
    routeRewrite(route)  {
      console.log(route.name, 'rrr');
      route.component = `$Function(() => import("/v"))`
      return route;
    },
    load(left) {
      return left
    }
  })]
})

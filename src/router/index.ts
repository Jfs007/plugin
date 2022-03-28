
import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';
export  let Router: AppRouteRecordRaw = [
    {
        name: 'home',
        path: '/home',
        component: {
            template: `<router-view></router-view>`
        },
        children: [
            {
                name: 'room',
                path: 'room'
            }
        ]

    }
]
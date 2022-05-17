import { createApp, ref, reactive } from 'vue'
import App from './App.vue';
import router from './router/index';

// let originObj = { a: { b: 1 },  };
// let reactiveObj = reactive({});
// let count = ref(1);

// reactiveObj.count = count;

// console.log('count: ', count, 'originObj: ', reactiveObj, reactiveObj.count);
// let originObj = { a: 2000,  };
// let b = originObj;
// const count = ref()
// const obj = reactive(originObj)

// obj.count = count;

// obj.count = 2000;
// originObj.a = 1000;
// console.log(obj, originObj, originObj === obj, b === originObj) // 1

// interface Ref<T> {
//     value: T
//   }
// function ref<T>(v: T):Ref<T>{
//     return { value: v };
// }

// function useState<State extends string>(initial: State) {
//     const state = ref(initial) as Ref<State> // state.value -> State extends string
//     return state
//   }

// console.log('ref: ', ref(1));

// console.log('useState: ', useState('22'));





createApp(App).use(router).mount('#app')

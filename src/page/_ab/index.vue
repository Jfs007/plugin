<template>
    <div ref="root">
        <div>{{ a }}</div>
        <div>{{ b }}</div>
        <div>he {{ jia }}</div>
        <button @click="change">修改</button>
        <box ref="box"></box>

    </div>

</template>
<script lang="ts">
import { defineComponent, ref, reactive, ComputedRef, computed, SetupContext, onMounted } from 'vue';
import Box from './component/box.vue';
export default defineComponent({
    components: {
        Box
    },
    setup() {
        let root = ref(null);

        onMounted(() => {
            // DOM 元素将在初始渲染后分配给 ref
            console.log(root.value) // <div>This is a root element</div>
        })


        let v: any = {
            root,
            box: ref(null),
            a: ref(2),
            b: reactive({
                c: 1
            }),
            wulong: (() => {
                (v).a.value = 1000000;
            }),
            jia1: computed(() => {
                return v.a.value + v.b.c;
            })

        }
        return v;
    },
    computed: {
        jia() {
            return this.a + this.b.c;
        }
    },
    methods: {
        change() {
            this.a = 200;
            this.b.c = 100;
            this.wulong();
            this.box.change();
        }
    },
    mounted() {
        console.log(this.box, this.box, this.root);


    }


})
</script>

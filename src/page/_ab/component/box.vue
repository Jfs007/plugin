<template>
    <div>ge


        
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, h } from 'vue'

export default defineComponent({
    setup(props, { expose }) {
        const readersNumber = ref(0)
        const book = reactive({ title: 'Vue 3 Guide' });
        expose({
            change() {
                readersNumber.value++;
            }
        })
        // 请注意这里我们需要显式使用 ref 的 value
        return () => h('div', [readersNumber.value, book.title])
    },
    methods: {
        
    }
})
</script>

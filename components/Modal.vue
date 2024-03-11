<template>
    <div class="w-full h-screen fixed bg-slate-950/50 flex justify-center items-center">
        <div class="w-full mx-2 lg:w-1/2 h-2/3 bg-slate-400 rounded-xl">
            <div class="w-full flex justify-end p-2">
                <Icon @click="$emit('handleClick')" icon="tabler:x" class="w-8 h-8 text-white cursor-pointer hover:text-gray-300" />
            </div>

            <div class="h-full flex items-center justify-center">
                <Calculator v-if="props.app === 'Calculator'" />
                <Stopwatch v-else-if="props.app === 'Stopwatch'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineEmits(['handleClick']);

const props = defineProps(['app']);
</script>
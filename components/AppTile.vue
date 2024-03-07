<template>
    <div class="text-white flex flex-col justify-center items-center" @click="$emit('handleClick')">
        <Icon :icon="props.icon" class="h-16 w-16 p-1 text-white hover:text-gray-200 cursor-pointer" />
        <div>{{ props.name }}</div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineEmits(['handleClick']);
const props = defineProps(['icon', 'name']);
</script>
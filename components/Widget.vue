<template>
    <div class="w-full h-full break-inside-avoid mb-1.5">
        <div class="bg-slate-300/90 rounded-t h-10 flex justify-center items-center font-semibold">
            <h2>{{ props.title }}</h2>
        </div>
        <slot />
    </div>
</template>

<script setup>
const props = defineProps(['title']);
</script>
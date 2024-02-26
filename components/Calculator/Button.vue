<template>
    <div class="p-4 border border-slate-600/25 flex justify-center items-center cursor-pointer transition-colors hover:!bg-slate-600 ease-in-out duration-200 select-none"
    @click="$emit('handleClick')"
    :class="buttonStyles">
        {{ props.button }}
    </div>
</template>

<script setup>
const props = defineProps(['button', 'style']);

const buttonStyles = computed(() => {
    const symbols = ["CE", "C", "-", "←", "÷", "×", "+"];
    
    if(symbols.includes(props.button)){
        return '!bg-slate-500/75';
    } else if(props.button === '=') {
        return '!bg-blue-400/50';
    }
    return null;
});
</script>
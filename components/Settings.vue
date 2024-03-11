<template>
    <div class="w-full h-screen fixed top-0 flex justify-end">
        <div class="h-full bg-slate-700 w-[90vw] lg:w-[35vw] flex flex-col text-white">
            <div class="flex items-center justify-end w-full px-2 lg:px-10 h-16">
                <Icon @click="$emit('handleClick')" icon="tabler:x" class="w-8 h-8 text-white cursor-pointer" />
            </div>

            <div class="flex flex-col justify-center w-full px-8">
                <div>
                    <h2>Name</h2>
                    <input v-model="userName" type="text" class="text-black w-full">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

defineEmits(['handleClick']);

const userName = useUserName();

onMounted(() => {
    // const userNameFromLS = localStorage.getItem('userName');

    // if (userNameFromLS) userName.value = userNameFromLS;
});

watch(userName, (newUserName) => {
    localStorage.setItem('userName', newUserName);
})
</script>
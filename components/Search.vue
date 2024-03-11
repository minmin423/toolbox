<template>
    <div class="flex items-center rounded-xl w-full bg-gray-800 h-12">
        <input v-model="searchText" @keypress.enter="handleKeyPress" type="text" placeholder="Search Google..." class="pl-2 w-full h-full rounded-l-xl bg-white/0 focus:border-0 outline-none text-white">

        <div v-if="searchText !== ''" class="h-2/3 w-1 rounded-full bg-white/10"></div>

        <Icon v-if="searchText !== ''" @click="handleSearch()" icon="tabler:search" class="w-8 h-8 mx-2 text-gray-100 cursor-pointer" />

    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const searchText = ref('');

function handleSearch() {
    if(process.client) {
        window.location.href = `https://www.google.com/search?q=${searchText.value}`;
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
}
</script>
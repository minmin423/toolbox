<template>
    <div class="min-h-screen w-full bg-[#445469] font-roboto flex flex-col justify-between overflow-hidden">
        <div>
            <nav class="text-white font-semibold flex justify-between items-center px-2 lg:px-10">
                <Greeting />
                
                <div class="flex items-center gap-2">
                    <Weather />
                    <div @click="showSettings = true" class="p-1 cursor-pointer hover:rotate-45 ease-in-out duration-300 transition-transform">
                        <Icon icon="ph:gear" class="h-6 w-6" />
                    </div>
                </div>
            </nav>

            <main class="w-full h-full">
                <div class="flex flex-col gap-10 items-center justify-center">
                    <Time />

                    <div class="w-full lg:w-2/3 px-2">
                        <Search />
                    </div>
                </div>
            </main>
        </div>

        <div class="h-full">
            <div class="flex justify-center items-start h-full">
                <Icon @click="showApps = !showApps" icon="mingcute:up-fill" class="h-16 w-16 text-white hover:text-gray-200 cursor-pointer" />
            </div>

            <Transition name="slide-fade-b">
                <div v-if="showApps" class="flex justify-around bg-slate-500/50">
                    <AppTile @handleClick="handleAppOpen('Calculator')" icon="material-symbols:calculate" name="Calculator" />
                    <AppTile @handleClick="handleAppOpen('Stopwatch')" icon="mingcute:stopwatch-fill" name="Stopwatch" />
                </div>
            </Transition>
        </div>

        <Transition name="slide-fade">
            <Settings v-if="showSettings" @handleClick="showSettings = false" />
        </Transition>

        <Transition>
            <Modal v-if="showModal" @handleClick="showModal = false" :app="modalApp" />
        </Transition>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';

const userName = useUserName();
const showSettings = ref(false);
const showApps = ref(false);
const showModal = ref(false);
const modalApp = ref('');

onMounted(() => {
    const userNameFromLS = localStorage.getItem('userName');
    if (userNameFromLS) userName.value = userNameFromLS;
});

function handleAppOpen(app) {
    modalApp.value = app;
    showModal.value = true;
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-b-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-b-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-b-enter-from,
.slide-fade-b-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
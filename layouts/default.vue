<template>
    <div class="container1 min-h-screen w-full relative bg-black/45 pt-3 pb-6">
        <!-- <nav class="flex justify-between items-center px-10 bg-slate-200">
            <div class="h-16 flex justify-center items-center">LOGO</div>

            <ul class="flex gap-4">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="about">About</NuxtLink>
            </ul>
        </nav> -->

        <main class="w-full h-full">
            <slot></slot>
        </main>
    </div>
</template>

<style scoped>
.container1::before{
    content:"";
    background-image: url('/images/girlTrain.jpg');
    background-size: auto 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    inset: 0;
    z-index:-3;
}
</style>
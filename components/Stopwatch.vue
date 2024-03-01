<template>
    <Widget title="Stopwatch">
      <div class="w-full bg-gray-100/75 flex h-[25vh]">
        <div class="px-5 text-center text-5xl font-semibold flex flex-col gap-4 justify-center items-center w-full h-full">
          <div>
            <h2>{{ formattedTime }}</h2>
          </div>
  
          <div @click="toggleStopwatch" class="rounded-full bg-sky-600 p-2 cursor-pointer">
            <Icon :icon="isPlaying ? 'ph:pause-fill' : 'ph:play-fill'" class="h-10 w-10 text-black dark:text-white" />
          </div>
        </div>
      </div>
    </Widget>
  </template>
  
  <script setup>
  import { Icon } from '@iconify/vue';
  import { ref, computed } from 'vue';
  
  const hour = ref('00');
  const min = ref('00');
  const sec = ref('00');
  const centi = ref('00');
  const isPlaying = ref(false);
  let intervalId;
  
  const formattedTime = computed(() => {
    if (hour.value !== '00') return `${hour.value}:${min.value}:${sec.value}:${centi.value}`;
    if (min.value !== '00') return `${min.value}:${sec.value}:${centi.value}`;
    return `${sec.value}:${centi.value}`;
  });
  
  function toggleStopwatch() {
    isPlaying.value = !isPlaying.value;
  
    if (isPlaying.value) intervalId = setInterval(updateTime, 10);
    else clearInterval(intervalId);
  }
  
  function updateTime() {
    let centiseconds = parseInt(centi.value) + 1;
  
    if (centiseconds === 100) {
      centi.value = '00';
      let seconds = parseInt(sec.value) + 1;
  
      if (seconds === 60) {
        sec.value = '00';
        let minutes = parseInt(min.value) + 1;
        min.value = appendZero(minutes);
  
        if (minutes === 60) {
          min.value = '00';
          let hours = parseInt(hour.value) + 1;
          hour.value = appendZero(hours);
        } else {
          min.value = appendZero(minutes);
        }
      } else {
        sec.value = appendZero(seconds);
      }
    } else {
      centi.value = appendZero(centiseconds);
    }
  }
  
  function appendZero(num) {
    return num > 9 ? num : `0${num}`;
  }
  </script>
  
<template>
    <div class="flex flex-col justify-center items-center text-white">
        <div class="w-fit flex flex-col justify-center items-center">
            <h1 class="text-6xl lg:text-[100px] font-light">{{ time }}</h1> 
            <h2 class="text-base">{{ `${getDayOfWeek()}, ${getFormattedDate()}` }}</h2>
        </div>
    </div>
</template>

<script setup>
const currentDate = new Date();
const time = ref('');
// const timeFix = ref('am');

onMounted(() => {
    updateTime();
    setInterval(updateTime, 1000);
});


function getDayOfWeek() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = currentDate.getDay();
    return daysOfWeek[dayIndex];
}

// function getFormattedDate() {
//     const options = { month: 'numeric', day: 'numeric' };
//     return currentDate.toLocaleDateString('en-US', options);
// }

function getFormattedDate() {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${month}/${day}`;
}

function updateTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    // const seconds = currentTime.getSeconds();

    // const amPm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    time.value = `${displayHours}:${minutes < 10 ? '0' + minutes : minutes}`;
    // timeFix.value = amPm;
}


</script>

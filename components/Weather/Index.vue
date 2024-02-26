<template>
    <Widget>
        <div class="w-full bg-gray-100/75 flex h-[20vh] py-2">
            <Icon :icon="weather.icon" class="w-1/3 h-full" />
            <div class="h-full w-0.5 bg-gray-400/50"></div>
            <div class="w-2/3 flex flex-col gap-4 font-semibold px-4 leading-5 text-slate-700">
                <div class="flex flex-col justify-center text-sm">
                    <h2>Manila, Philippines</h2>
                    <h2>{{ getFormattedDate() }}</h2>
                    <h2 class="font-bold text-slate-900">{{ getDayOfWeek() }}</h2>
                </div>

                <h1 class="text-center text-5xl font-bold">{{ time }}</h1>
            </div>
        </div>
    </Widget>
</template>

<script setup>
import axios from 'axios';
import { Icon } from '@iconify/vue';

const weather = ref({}); 
const currentDate = new Date();
const time = ref('');

onMounted(() => {
    updateTime();
    setInterval(updateTime, 1000);

    const lastFetchTime = localStorage.getItem('lastFetchTime');
    const currentTime = new Date().getTime();

    if (!lastFetchTime || currentTime - lastFetchTime > 3600000) {
        axios.get(`https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842&current=is_day,weather_code&timezone=Asia/Manila`)
            .then(response => {
                const weatherData = {
                    code: response.data.current.weather_code,
                    is_day: response.data.current.is_day
                };
                weather.value = weatherData;
                weather.value.icon = getIcon(weather.value.code, weather.value.is_day);
                localStorage.setItem('weather', JSON.stringify(weatherData));
                localStorage.setItem('lastFetchTime', currentTime);
            })
            .catch((e) => {
                console.error(e);
            });
    } else {
        weather.value = JSON.parse(localStorage.getItem('weather'));
        if(!weather.value.icon) {
            console.log("No weather icon detected. Getting icon now.");
            weather.value.icon = getIcon(weather.value.code, weather.value.is_day);
        }
    }
})

function getIcon(code, is_day) {
    switch(code) {
        case 0:
        case 1:
            return is_day ? "meteocons:clear-day-fill" : "meteocons:clear-night-fill";
        case 2:
            return is_day ? "meteocons:partly-cloudy-day-fill" : "meteocons:partly-cloudy-night-fill";
        case 3:
            return is_day ? "meteocons:overcast-day-fill" : "meteocons:overcast-night-fill";
        case 45:
        case 48:
            return is_day ? "meteocons:fog-day-fill" : "meteocons:fog-night-fill";
        case 51:
        case 53:
        case 56:
        case 57:
            return is_day ? "meteocons:partly-cloudy-day-drizzle-fill" : "meteocons:partly-cloudy-night-drizzle-fill";
        case 55:
            return is_day ? "meteocons:extreme-day-drizzle-fill" : "meteocons:extreme-night-drizzle-fill";
        case 61:
        case 63:
        case 66:
        case 80:
        case 81:
            return "meteocons:rain-fill";
        case 65:
        case 67:
        case 82:
            return "meteocons:extreme-rain-fill";
        case 71:
        case 73:
        case 77:
        case 85:
            return "meteocons:snow-fill";
        case 75:
        case 86:
            return "meteocons:extreme-snow-fill";
        case 95:
        case 96:
        case 99:
            return "meteocons:thunderstorms-fill";
        default:
            return "Unknown code";
    }
}

function getDayOfWeek() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = currentDate.getDay();
    return daysOfWeek[dayIndex];
}

function getFormattedDate() {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return currentDate.toLocaleDateString('en-US', options);
}

function updateTime() {
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    time.value = `${displayHours}:${minutes < 10 ? '0' + minutes : minutes} ${amPm}`;
}


</script>

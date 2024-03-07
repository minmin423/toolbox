<template>
    <div>
        <div class="font-normal flex items-center justify-center gap-2">
            <Icon :icon="weather.icon" class="w-8 h-8" />
            <h2 class="">{{ `${getWeatherDescription(weather.code)}.` }}</h2>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { Icon } from '@iconify/vue';

const weather = ref({}); 

onMounted(() => {
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

function getWeatherDescription(weatherCode) {
    switch (weatherCode) {
        case 0:
            return "Clear sky";
        case 1:
        case 2:
        case 3:
            return "Mainly clear";
        case 45:
        case 48:
            return "Fog and depositing rime fog";
        case 51:
        case 53:
        case 55:
            return "Drizzle: Light, moderate, and dense intensity";
        case 56:
        case 57:
            return "Freezing Drizzle: Light and dense intensity";
        case 61:
        case 63:
        case 65:
            return "Rain: Slight, moderate and heavy intensity";
        case 66:
        case 67:
            return "Freezing Rain: Light and heavy intensity";
        case 71:
        case 73:
        case 75:
            return "Snow fall: Slight, moderate, and heavy intensity";
        case 77:
            return "Snow grains";
        case 80:
        case 81:
        case 82:
            return "Rain showers: Slight, moderate, and violent";
        case 85:
        case 86:
            return "Snow showers slight and heavy";
        case 95:
            return "Thunderstorm: Slight or moderate";
        case 96:
        case 99:
            return "Thunderstorm with slight and heavy hail";
        default:
            return "Unknown weather code";
    }
}
</script>

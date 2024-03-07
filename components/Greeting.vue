<template>
    <div class="h-16 flex justify-center items-center">
        {{ `${greetings}` }}
        <span v-if="userName">{{ `, ${userName}` }}</span>
    </div>
</template>

<script setup>
const greetings = ref('');
const dateTime = useDateTime();
const userName = useUserName();

onMounted(() => {   
    // userName.value = localStorage.getItem('userName');
    handleGreeting();
});

function handleGreeting() {
    const hours = dateTime.value.getHours();
    let period;

    if( hours >= 6 && hours <= 11 ) period = "Morning";
    else if( hours >= 12 && hours <= 17 ) period = "Afternoon";
    else if( hours >= 18 && hours <= 20 ) period = "Evening";
    else period = "Night";

    // const userName = localStorage.getItem('userName');

    // if( userName.value ) return greetings.value = `Good ${period}, ${userName.value}`;

    return greetings.value = `Good ${period}`;
}
</script>
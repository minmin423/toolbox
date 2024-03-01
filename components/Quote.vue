<template>
    <Widget title="Quote">
        <div class="w-full bg-gray-100/75 flex h-[25vh]">
            <div class="px-5 text-center font-serif flex justify-center items-center md:text-xl w-full">
                <p>{{ randomQuote.text }} <span class="font-semibold">{{ randomQuote.source }}</span></p>
            </div>
        </div>
    </Widget>
</template>

<script setup>
const quotes = ref([
    {   text: 'The only way to do great work is to love what you do.', source: '- Steve Jobs' },
    {   text: 'Success is not final, failure is not fatal: It is the courage to continue that counts.', source: '- Winston Churchill' },
    {   text: 'Believe you can and you\'re halfway there.', source: '- Theodore Roosevelt' },
    {   text: 'Your time is limited, don\'t waste it living someone else\'s life.', source: '- Steve Jobs' },
    {   text: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.', source: '- Thomas A. Edison' },
    {   text: 'The only limit to our realization of tomorrow will be our doubts of today.', source: '- Franklin D. Roosevelt' },
    {   text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', source: '- Nelson Mandela' },
    {   text: 'The way to get started is to quit talking and begin doing.', source: '- Walt Disney' },
    {   text: 'Life is what happens when you\'re busy making other plans.', source: '- John Lennon' }
]);
const randomQuote = ref('');

onMounted(() => {
    randomQuote.value = getQuote();
})

function getQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.value.length);
    return quotes.value[randomIndex];
};
</script>

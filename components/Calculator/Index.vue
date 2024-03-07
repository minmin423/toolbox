<template>
    <div class="p-2 font-semibold text-white w-full h-full">
        <div class="text-end py-8 px-4 border border-slate-500/25 w-full h-fit">
            <div class="text-5xl w-full overflow-x-auto overflow-y-hidden">{{ mainDisplay }}</div>
            <div class="text-xl text-gray-200 h-6 flex items-center justify-end">{{ subDisplay }}</div>
        </div>

        <div class="grid grid-cols-4 grid-rows-5 text-3xl h-2/3">
            <CalcButton v-for="button in allButtons" :key="button" @handleClick="handleButtonClick(button)" :button="button"></CalcButton>
        </div>
    </div>
</template>

<script setup>
import CalcButton from '~/components/Calculator/Button.vue';

const mainDisplay = ref("0");
const subDisplay = ref("");
const allButtons = ['CE', 'C', '←', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '', '0', '.', '='];

function handleButtonClick(button) {
    if(button === 'C' || button === 'CE') {
        subDisplay.value = '';
        mainDisplay.value = '0';
    } else if(button === '←') {
        if(mainDisplay.value.slice(0, -1)) 
        mainDisplay.value = mainDisplay.value.slice(0, -1);
    } else if(button === '=') {
        mainDisplay.value = subDisplay.value.slice(2);
        subDisplay.value = '';
    } else {
        if(mainDisplay.value === '0') {
            mainDisplay.value = button;
        } else {
            mainDisplay.value = mainDisplay.value + button;
        }

        const result = solveEquation(mainDisplay.value);
        subDisplay.value = '= ' + result;
    }
    return;  
};

function solveEquation(toBeSolved) {
    const numList = toBeSolved.split(/[+\-÷×]/).map(parseFloat);
    const operations = toBeSolved.match(/[+\-÷×]/g);

    if (!operations) return '';

    function performOperation(operation, index) {
        const num1 = numList[index];
        const num2 = numList[index + 1];

        if(!num2 && num2 !== 0) return num1;
        
        switch (operation) {
            case '×':
                return num1 * num2;
            case '÷':
                return num1 / num2;
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            default:
                return 0;
        }
    }

    while (operations.length > 0) {
        const multiplyIndex = operations.indexOf('×');
        const divisionIndex = operations.indexOf('÷');
        const addIndex = operations.indexOf('+');
        const subtractIndex = operations.indexOf('-');

        let operationIndex;

        if ((multiplyIndex >= 0 && divisionIndex >= 0 && multiplyIndex < divisionIndex) || (multiplyIndex >= 0 && divisionIndex === -1)) {
            operationIndex = multiplyIndex;
        } else if ((divisionIndex >= 0 && multiplyIndex >= 0 && divisionIndex < multiplyIndex) || (divisionIndex >= 0 && multiplyIndex === -1)) {
            operationIndex = divisionIndex;
        } else if ((addIndex >= 0 && subtractIndex >= 0 && addIndex < subtractIndex) || (addIndex >= 0 && subtractIndex === -1)) {
            operationIndex = addIndex;
        } else {
            operationIndex = subtractIndex;
        }

        numList[operationIndex] = performOperation(operations[operationIndex], operationIndex);
        numList.splice(operationIndex + 1, 1);
        operations.splice(operationIndex, 1);
    }

    return numList[0];
}
</script>
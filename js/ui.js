// js/ui.js
const calculator = new Calculator();
const input = document.getElementById('input');
const result = document.getElementById('result');

function calculate(operation) {
    calculator.parseInput(input.value);
    let calculationResult;

    switch (operation) {
        case 'mean':
            calculationResult = calculator.mean();
            break;
        case 'median':
            calculationResult = calculator.median();
            break;
        case 'mode':
            calculationResult = calculator.mode().join(', ');
            break;
        case 'variance':
            calculationResult = calculator.variance();
            break;
        case 'stdDev':
            calculationResult = calculator.stdDev();
            break;
    }

    result.textContent = `${operation.charAt(0).toUpperCase() + operation.slice(1)}: ${calculationResult}`;
}

function clearInput() {
    input.value = '';
    result.textContent = '';
}